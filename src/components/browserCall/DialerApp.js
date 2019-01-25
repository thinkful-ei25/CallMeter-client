import React from 'react';
import Dialer from './Dialer';
// import TempLogin from './TempLogin';
import { Device } from 'twilio-client';
import Answerer from './Answerer'; 
import './BrowserCall.css'; 

export default class DialerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      deviceState: '',
      deviceErrorCode: '',
      deviceErrorMessage: '', 
      connection: {}
    };
  }

  handleAppStateChange = state => {
    this.setState({deviceState: state});

    Device.on(state, obj => {
      if (state === 'error'){ 
        this.setState({
          deviceErrorCode: obj.code,
          deviceErrorMessage: obj.message
        }); 
      }
      else if (state === 'incoming'){ 
        this.incoming(obj); 
      }
      else if (state=== 'ringing'){ 
        this.ringing(obj); 
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
    this.state.connection.reject(); 
  }
  
  componentDidMount(){
    console.log('hello')
    console.log('capabilityToken', this.props.capabilityToken); 
    // this.setUpDevice(this.props.capabilityToken); 
    const twilioDeviceStates = ['cancel', 'connect', 'disconnect', 'ringing', 'error', 'incoming', 'offline', 'ready']; 
    twilioDeviceStates.forEach(twilioDeviceState => { 
      this.handleAppStateChange(twilioDeviceState);  
    }); 
  }

  setUpDevice = (capabilityToken) => { 

    console.log('capabilityToken', capabilityToken); 
    this.setState({ token: capabilityToken });
    let device = Device.setup(capabilityToken, {
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
    return (
      <div className="browser-dialer-container">
        <section>
          <div>
            <h1>Dial Away</h1>
            <p>Make calls now</p>
          </div>
        </section>
        <section>
          {(this.state.deviceErrorCode || this.state.deviceErrorMessage) && (
            <div>
              <button onClick={this.handleNotifcationDismiss} />
              Device Error {this.state.deviceErrorCode}:{' '}
              {this.state.deviceErrorMessage}
            </div>
          )}
          <div>
            <div>
              <div>
                <Dialer deviceState={this.state.deviceState} />
                <Answerer answer={this.answerCall} hangup={this.hangupCall}></Answerer>
              </div>
            </div>
          </div>
        </section>

        {/* <TempLogin visible={this.isLoginModalVisible()} deviceState={this.state.deviceState} onLogin={this.handleLogin} /> */}
      </div>
    );
  }
}
