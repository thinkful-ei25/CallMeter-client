import React from 'react';
import Dialer from './Dialer';
import TempLogin from './TempLogin';
import { Device } from 'twilio-client';

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
    Device.on(state, obj => {
      state === 'error'
        ? this.setState({
            deviceState: 'error',
            deviceErrorCode: obj.code,
            deviceErrorMessage: obj.message
          })
        : this.setState({ deviceState: state });
    });
  };

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
    Device.setup(capabilityToken);
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
              </div>
            </div>
          </div>
        </section>
        <TempLogin visible={this.isLoginModalVisible()} deviceState={this.state.deviceState} onLogin={this.handleLogin} />
      </div>
    );
  }
}
