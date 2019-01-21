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
      deviceErrorMessage: ''
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
        this.incoming(); 
        // this.setState({ deviceState : state}, this.incoming); 
        console.log('blurges'); 
      }
    });
  
  }; 

  incoming(){ 

    console.log('incoming here'); 
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


  // answerCall() { 
  //   //TODO CONNECT TO CONNECT.ACCEPT CALLBACK
  //   Device.incoming(this.answered); 
  //   // connection.accept(); 

  // }

  // answered(connection){ 
  //   connection.accept();
  // }

  // hangup() { 
  //   Device.disconnect(); 
  // }


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
                <Answerer></Answerer>
              </div>
            </div>
          </div>
        </section>
        <TempLogin visible={this.isLoginModalVisible()} deviceState={this.state.deviceState} onLogin={this.handleLogin} />
      </div>
    );
  }
}
