import React from 'react';
import './dialer.css';
import './flags/flags.css';
import CallButton from './CallButton';
import CountrySelectBox from './CountrySelectBox';
import DTMFTone from './DTMFTone';
import LogBox from './LogBox';
import MuteButton from './MuteButton';
import $ from 'jquery';

export default class DialerApp extends React.Component {
  getInitialState() {
    return {
      muted: false,
      log: 'Connecting...',
      onPhone: false,
      countryCode: '1',
      currentNumber: '',
      isValidNumber: false,
      countries: [
        { name: 'United States', cc: '1', code: 'us' },
        { name: 'Great Britain', cc: '44', code: 'gb' },
        { name: 'Colombia', cc: '57', code: 'co' },
        { name: 'Ecuador', cc: '593', code: 'ec' },
        { name: 'Estonia', cc: '372', code: 'ee' },
        { name: 'Germany', cc: '49', code: 'de' },
        { name: 'Hong Kong', cc: '852', code: 'hk' },
        { name: 'Ireland', cc: '353', code: 'ie' },
        { name: 'Singapore', cc: '65', code: 'sg' },
        { name: 'Spain', cc: '34', code: 'es' },
        { name: 'Brazil', cc: '55', code: 'br' }
      ]
    };
  }

  componentDidMount() {
    var self = this;

    // Fetch Twilio capability token from our Node.js server
    $.getJSON('https://83eb5ba7.ngrok.io/api/call/token')
      .done(function(data) {
        console.log(data);
        Twilio.Device.setup(data.token);
      })
      .fail(function(err) {
        console.log(err);
        self.setState({ log: 'Could not fetch token, see console.log' });
      });

    Twilio.Device.disconnect(function() {
      self.setState({
        onPhone: false,
        log: 'Call ended.'
      });
    });

    Twilio.Device.ready(function() {
      self.log = 'Connected';
    });
  }

  handleChangeCountryCode(countryCode) {
    this.setState({ countryCode: countryCode });
  }

  handleToggleMute() {
    var muted = !this.state.muted;

    this.setState({ muted: muted });
    Twilio.Device.activeConnection().mute(muted);
  }

  handleToggleCall() {
    if (!this.state.onPhone) {
      this.setState({
        muted: false,
        onPhone: true
      });
      // make outbound call with current number
      var n =
        '+' +
        this.state.countryCode +
        this.state.currentNumber.replace(/\D/g, '');
      Twilio.Device.connect({ number: n });
      this.setState({ log: 'Calling ' + n });
    } else {
      // hang up call in progress
      Twilio.Device.disconnectAll();
    }
  }

  handleChangeNumber(e) {
    this.setState({
      currentNumber: e.target.value,
      isValidNumber: /^([0-9]|#|\*)+$/.test(
        e.target.value.replace(/[-()\s]/g, '')
      )
    });
  }

  render() {
    var self = this;
    return (
      <div id="dialer">
        <div id="dial-form" className="input-group input-group-sm">
          <CountrySelectBox
            countries={this.state.countries}
            countryCode={this.state.countryCode}
            handleOnChange={this.handleChangeCountryCode}
          />

          <NumberInputText
            currentNumber={this.state.currentNumber}
            handleOnChange={this.handleChangeNumber}
          />
        </div>

        <div className="controls">
          <CallButton
            handleOnClick={this.handleToggleCall}
            disabled={!this.state.isValidNumber}
            onPhone={this.state.onPhone}
          />

          {this.state.onPhone ? (
            <MuteButton
              handleOnClick={this.handleToggleMute}
              muted={this.state.muted}
            />
          ) : null}
        </div>

        {this.state.onPhone ? <DTMFTone /> : null}

        <LogBox text={this.state.log} />
      </div>
    );
  }
}
