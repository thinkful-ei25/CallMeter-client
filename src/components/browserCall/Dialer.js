'use strict';

import React from 'react';
import PhoneButtons from './PhoneButtons';
import Answerer from './Answerer'; 
import { Device } from "twilio-client";
const countryCode = '+1';

export default class Dialer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      number: ''
    };
  }

  handlePhoneNumberInput = (event) => {
    const phoneNumber = event.target.value;
    this.setState({number: phoneNumber});
  };

  handleButtonPress = (buttonPressed) => {
    this.setState((state) => ({
      number: state.number + buttonPressed
    }));
    console.log('#### Keypad press ' + this.state.number + '  ####')
  };


  handleCallButtonClick = () => {
   this.makeCall();
  }

  makeCall = () => {
    const phoneNumber = countryCode + this.state.number.replace(/^0/,'')
    console.log('#### Making Call to' + phoneNumber + '  ####')
    Device.connect({number: phoneNumber});
  }

  endCall = () => {
    console.log('#### ENDING CALL ####')
    Device.disconnectAll();
  };

  callStatus = () => {
    switch(this.props.deviceState) {
      case 'ready': return 'Call when ready';
      case 'connect': return 'Call Connected';
      case 'disconnect': return 'Call Disconnected';
      case 'error': return 'Call Error';
      default: return '';
    }
  }

  // callIsActive = () => this.props.deviceState = 'connect';

  render () {
    return (
      <div>
        <div id="phoneNumberField">
          <div>
            <span id="countryCode">{countryCode}</span>
          </div>
          <div>
            <input type="text" value={this.state.number} onChange={this.handleButtonPress} />
          </div>

          <div>
            <PhoneButtons onChange={this.handleButtonPress} />
          </div>

          <div id="callButtonField">
            <button onClick={this.handleCallButtonClick}>
            <span>Call Now</span>
            </button>
          </div>
          <Answerer></Answerer>
          <p>{this.callStatus()}</p>
        </div>
      </div>
    );
  }


}