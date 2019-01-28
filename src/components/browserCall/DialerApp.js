import React from 'react';
import { Device } from 'twilio-client';
import Answerer from './Answerer'; 
import './BrowserCall.css'; 
import { connect } from 'react-redux';
import InProgress from './InProgress'; 
import { fetchCallerFromContact, hangupClient } from '../../actions/dialer.action';  

export class DialerApp extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      isCallOnGoing: false, 
      token: '',
      deviceState: '',
      deviceErrorCode: '',
      deviceErrorMessage: '', 
      connection: {}, 
      device: '', 
      isConnected: false, 
      progress: false
    };
  }

  setUpDevice = (capabilityToken) => { 
    this.setState({ token: capabilityToken });

    this.setState({ 
      device: 
        Device.setup(
          capabilityToken, {
            debug: true, 
            enableRingingState: true, 
            allowIncomingWhileBusy: true
           }
        )
    });  
  }
  
  handleAppStateChange = state => {

    Device.on(state, obj => {
      this.setState({deviceState: state, connection: obj});
      if (state === 'error'){ 
        this.setState({
          deviceErrorCode: obj.code,
          deviceErrorMessage: obj.message
        }); 
      }
      else if (state === 'incoming'){ 
        this.setState({isCallOnGoing: true, isConnected: true}); 
        const callerNumber = obj.parameters.From; 
        this.props.dispatch(fetchCallerFromContact(callerNumber)); 
      }
      else if ( state === 'disconnect' || state === 'cancel' ){ 
        console.log('disconnect or cancel'); 
        this.setState({isCallOnGoing: false, isConnected: false});  
      }
      else if (state === 'disconnect') { 
        console.log('closing and reopening'); 
        this.setUpDevice(this.props.capabilityToken); 
      }
    });
  }; 

  /**
   * INBOUND
   * Callback from Answerer components answer button
   */
  answerCall = () => { 
    this.setState({isConnected: false}); 
    this.state.connection.accept(); 
  }

  /**
   * INBOUND
   * Callback from Answerer components hangup button
   */
  rejectCall = () => { 
    this.state.connection.reject(); 
    console.log('reject')
    this.setState({isConnected: false, isCallOnGoing: false}); 
  }

  /**
   * INBOUND
   */
  hangupCall = () => { 
    console.log('hangupCall'); 
    Device.disconnectAll(); 
    this.setState({isConnected: true, isCallOnGoing: false}); 
  }

  /**
   * OUTBOUND 
   */
  makeCall = () => {
    const phoneNumber = this.props.outboundClient.phoneNumber; 
    Device.connect({number: phoneNumber}); 
  }

  /**
   * OUTBOUND
   */
  endCall = () => {
    console.log('#### ENDING CALL ####'); 
    this.props.dispatch(hangupClient()); 
    this.endProgress(); 
    Device.disconnectAll(); 
  };
  
  componentDidMount() {
    const twilioDeviceStates = ['cancel', 'connect', 'disconnect', 'ringing', 'error', 'incoming', 'offline', 'ready']; 
    twilioDeviceStates.forEach(twilioDeviceState => { 
      this.handleAppStateChange(twilioDeviceState);  
    }); 

    this.setUpDevice(this.props.capabilityToken); 
  }

 
  handleCallButtonClick = () => {
    if (this.props.outboundClient != null) { 
      Device.disconnectAll(); 
      this.makeCall();    
    }
  }

  startProgress = () => { 
    this.setState({progress: true})
  }
  endProgress = () => { 
    this.setState({progress: false})
  }



  //INBOUND: I HUNG UP, HANGUP WON'T GO AWAY

  render() {
   
    if (this.state.isCallOnGoing === true && this.props.caller !== null) { 
      console.log('isConnected', this.state.isConnected); 
      const topRightCallInfo = (this.state.isConnected) ?  
        <Answerer
          callerImage={this.props.caller.photo} 
          fullname={this.props.caller.firstName + ' ' + this.props.caller.lastName} 
          onAnswer={() => this.answerCall()} 
          onReject={() => this.rejectCall()}/>
        : 
        <InProgress hangup={() => this.hangupCall() } /> 
        console.log('jsx', topRightCallInfo)
      return (
        <div>
          {(this.state.deviceErrorCode || this.state.deviceErrorMessage) && (
            <div>
              <button onClick={this.handleNotifcationDismiss} />
              Device Error {this.state.deviceErrorCode}:{' '}
              {this.state.deviceErrorMessage}
            </div>
          )}
          {topRightCallInfo}    
        </div>
      );
    } 
    //outbound call start
    if (this.props.outboundClient !== null && this.state.progress === false) { 
      this.startProgress(); 
      this.handleCallButtonClick(); 
    }

    if (this.state.progress) { 
      console.log('call in progress'); 
      return (
        <div> 
          <InProgress hangup={() => { 
            console.log('hangingup in pogress'); 
            this.endCall();          
          }
        } /> 
        </div>  
      );
    }

    return (
      <div>
      
         <section>
          {(this.state.deviceErrorCode || this.state.deviceErrorMessage) && (
            <div>
              <button onClick={this.handleNotifcationDismiss} />
              Device Error {this.state.deviceErrorCode}:{' '}
              {this.state.deviceErrorMessage}
            </div>
          )}
          </section> 
      </div>
    ); 
  }
}

const mapStateToProps = state => {
	return {
    caller: state.dialer.caller, 
    loading: state.dialer.loading, 
    error: state.dialer.error, 
    outboundClient : state.dialer.outboundClient
	};
};

export default connect(mapStateToProps)(DialerApp);