import React from 'react';
import { Device } from 'twilio-client';
import './BrowserCall.css'; 
import { connect } from 'react-redux';
import Answerer from './Answerer'; 
import { fetchCallerFromContact } from '../../actions/dialer.action';  


export class DialerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRinging: 'false', 
      token: '',
      deviceState: '',
      deviceErrorCode: '',
      deviceErrorMessage: '', 
      connection: {}
    };
  }

  handleAppStateChange = state => {

    Device.on(state, obj => {
      this.setState({deviceState: state});
      // console.log('state', state);

      if (state === 'error'){ 
        this.setState({
          deviceErrorCode: obj.code,
          deviceErrorMessage: obj.message
        }); 
      }
      else if (state === 'incoming'){ 
        this.setState({isRinging: true, connection: obj}); 
        const callerNumber = obj.parameters.From; 
        this.props.dispatch(fetchCallerFromContact(callerNumber)); 
      }
      else if (state === 'cancel') { 
        this.setState({isRinging: false}); 
      }
      else if (state === 'connect' || state === 'disconnect'){ 
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
    
    Device.setup(capabilityToken, {
      debug: true, 
      enableRingingState: true, 
      allowIncomingWhileBusy: true
    });  
  }

  //TODO: hook this up to notify user's of errors
  handleNotifcationDismiss = () => {
    this.setState({
      deviceErrorCode: '',
      deviceErrorMessage: ''
    });
  };

  render() {
    if (this.state.isRinging === true && this.props.caller !== null) { 
      return (
        <div>
          <Answerer
            callerImage={this.props.caller.photo} 
            fullname={this.props.caller.firstName + ' ' + this.props.caller.lastName} 
            onAnswer={() => this.answerCall()} 
            onHangup={() => this.hangupCall()}/> 
        </div>
      );
    } 
    return (
      <div></div>
    ); 
  }
}

const mapStateToProps = state => {
	return {
    caller: state.dialer.caller, 
    loading: state.dialer.loading, 
    error: state.dialer.error
	};
};

export default connect(mapStateToProps)(DialerApp);