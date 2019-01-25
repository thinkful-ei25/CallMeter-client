import React from 'react';
// import Dialer from './Dialer';
import { Device } from 'twilio-client';
import './BrowserCall.css'; 
import Answerer from './Answerer'; 

export default class DialerApp extends React.Component {
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
      console.log('state', state);
      if (state === 'error'){ 
        this.setState({
          deviceErrorCode: obj.code,
          deviceErrorMessage: obj.message
        }); 
      }
      else if (state === 'incoming'){ 
        this.setState({isRinging: true, connection: obj})
      }
      else if (state === 'cancel') { 
        this.setState({isRinging: false}); 
      }
      else if (state=== 'ringing'){ 
        this.ringing(obj); 
      }
      else if (state === 'connect' || state === 'disconnect'){ 
        this.setState({isRinging: false});  
      }

    });
  }; 

  ringing(connection){ 
    console.log('ringinging', connection); 
  }
  /**
  * Sets the incoming connection
  * @returns {connection}
  */
  incoming(connection){ 
    console.log('connectionz', connection); 
    this.setState({connection}); 
  }

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

  handleNotifcationDismiss = () => {
    this.setState({
      deviceErrorCode: '',
      deviceErrorMessage: ''
    });
  };


  /**
 * Shows login modal if user has not logged in properly.
 * Incorrect login credentials result in a valid login token being returned
 * but the device will fail to initialize and show offline status.
 *
 * @returns {boolean}
 */

  isLoginModalVisible = () => {
    return !this.state.token || this.state.deviceState === 'offline';
  };
  

  render() {
    //      <div className="browser-dialer-container">
    if (this.state.isRinging === true) { 
      return (
        <div>
          <Answerer onAnswer={() => this.answerCall()} onHangup={() => this.hangupCall()}/> 
        </div>
      );
    } 
    return (
     <div></div>
    ); 
  }
}
