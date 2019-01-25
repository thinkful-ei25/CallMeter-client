import React from 'react';
import Dialer from './Dialer';
import { Device } from 'twilio-client';
import './BrowserCall.css'; 
import Answerer from './Answerer'; 

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
    return (
      <div>
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
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
         <Answerer /> 
        </div>
      </div>
     
    );
  }
}
