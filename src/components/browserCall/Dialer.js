// 'use strict';

import React from 'react';
import PhoneButtons from './PhoneButtons';
import { Device } from "twilio-client";
import { connect } from 'react-redux';

const countryCode = '+1';
export  class Dialer extends React.Component {
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
    console.log('client', this.props.outboundClient.phoneNumber); 
    const phoneNumber = this.props.outboundClient.phoneNumber; 
    console.log('#### Making Call to' + phoneNumber + '  ####')
    Device.connect({number: phoneNumber});
  }

  endCall = () => {
    console.log('#### ENDING CALL ####')
    Device.disconnectAll();
  };

  handleCallButtonClick = () => {
    if (this.props.outboundClient != null) { 
      this.makeCall(this.props.outboundClient, this.state.token);
    }
  }

  callStatus = () => {
    switch(this.props.deviceState) {
      case 'ready': return 'Call when ready';
      case 'connect': return 'Call Connected';
      case 'disconnect': return 'Call Disconnected';
      case 'error': return 'Call Error';
      default: return '';
    }
  }

  callIsActive = () => this.props.deviceState = 'connect';

  render () {
    // console.log('outbound client', this.state.outboundClient); 
    if (this.state.outboundClient !== null) { 
      console.log('hello')
      this.handleCallButtonClick(); 
    }
    return (
      <div>
        {/* <div id="phoneNumberField">
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
          <p>{this.callStatus()}</p>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
	return {
    outboundClient : state.dialer.outboundClient
	};
};

export default connect(mapStateToProps)(Dialer);