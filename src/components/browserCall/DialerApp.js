import React from 'react';
import Dialer from './Dialer';
import TempLogin from './TempLogin';
import { Device } from 'twilio-client';
import Answerer from './Answerer'; 

export default class DialerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      deviceState: '',
      deviceErrorCode: '',
      deviceErrorMessage: '', 
      connection: null
    };
  }

  handleAppStateChange = state => {
    console.log('STATE', state); 
    console.log(state); 
    this.setState({deviceState: state});

    Device.on(state, obj => {
      if (state === 'error'){ 
        this.setState({
          // deviceState: 'error',
          deviceErrorCode: obj.code,
          deviceErrorMessage: obj.message
        }); 
      }
      else if (state === 'incoming'){ 
        this.incoming(obj); 
        // this.setState({ deviceState : state}, this.incoming); 
        console.log('blurges'); 
      }
    });
  
  }; 

  /**
 * Sets the incoming connection
 * @returns {connection}
 */
  incoming(conn){ 
    this.setState({connection:conn})
  }

  answerCall(){ 
    console.log('answer the call'); 
    this.state.connection.accept(); 
  }

  hangupCall(){ 
    console.log('hanging up the call'); 
    this.state.connection.reject(); 
  
  }

  componentDidMount() {
    this.handleAppStateChange('cancel');
    this.handleAppStateChange('connect');
    this.handleAppStateChange('disconnect');
    this.handleAppStateChange('error');
    this.handleAppStateChange('incoming');
    this.handleAppStateChange('offline');
    this.handleAppStateChange('ready');
  }

  handleNotifcationDismiss = () => {
    this.setState({
      deviceErrorCode: '',
      deviceErrorMessage: ''
    });
  };

  handleLogin = (capabilityToken) => {
    this.setState({ token: capabilityToken });
    let device = Device.setup(capabilityToken, {debug: true, allowIncomingWhileBusy: true});
    console.log('deviceroni', device); 
  };

  /**
 * Show login modal if user has not logged in properly.
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
        <TempLogin visible={this.isLoginModalVisible()} deviceState={this.state.deviceState} onLogin={this.handleLogin} />
      </div>
    );
  }
}
