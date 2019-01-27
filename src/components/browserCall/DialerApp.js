import React from 'react';
import { Device } from 'twilio-client';
import Dialer from './Dialer'; 
import Answerer from './Answerer'; 
import './BrowserCall.css'; 
import { connect } from 'react-redux';
import { fetchCallerFromContact, hangupClient } from '../../actions/dialer.action';  


export class DialerApp extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      isRinging: 'false', 
      token: '',
      deviceState: '',
      deviceErrorCode: '',
      deviceErrorMessage: '', 
      connection: {}, 
      device: ''
    };
  }

  handleAppStateChange = state => {

    Device.on(state, obj => {
      this.setState({deviceState: state, connection: obj});
      console.log('connection', this.state.connection)
      if (state === 'error'){ 
        this.setState({
          deviceErrorCode: obj.code,
          deviceErrorMessage: obj.message
        }); 
      }
      else if (state === 'incoming'){ 
        this.setState({isRinging: true}); 
        const callerNumber = obj.parameters.From; 
        this.props.dispatch(fetchCallerFromContact(callerNumber)); 
      }
      else if (state === 'connect' || state === 'disconnect' || state === 'cancel' ){ 
        this.setState({isRinging: false});  
      }
    });
  }; 



  /**
   * Callback from Answerer components answer button
   */
  answerCall = () => { 
    this.state.connection.accept(); 
  }

  /**
   * Callback from Answerer components hangup button
   */
  hangupCall = () => { 
    this.setState({isRinging: false}); 
    this.state.connection.reject(); 
  }
  
  componentDidMount(){
    const twilioDeviceStates = ['cancel', 'connect', 'disconnect', 'ringing', 'error', 'incoming', 'offline', 'ready']; 
    twilioDeviceStates.forEach(twilioDeviceState => { 
      this.handleAppStateChange(twilioDeviceState);  
    }); 

    this.setUpDevice(this.props.capabilityToken); 
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

  render() {
    
    if (this.state.isRinging === true && this.props.caller !== null) { 
      return (
        <div>
          {(this.state.deviceErrorCode || this.state.deviceErrorMessage) && (
            <div>
              <button onClick={this.handleNotifcationDismiss} />
              Device Error {this.state.deviceErrorCode}:{' '}
              {this.state.deviceErrorMessage}
            </div>
          )}
          <Answerer
            callerImage={this.props.caller.photo} 
            fullname={this.props.caller.firstName + ' ' + this.props.caller.lastName} 
            onAnswer={() => this.answerCall()} 
            onHangup={() => this.hangupCall()}/> 
    
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
          <Dialer /> 
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
	};
};

export default connect(mapStateToProps)(DialerApp);