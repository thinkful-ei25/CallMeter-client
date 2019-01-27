'use strict';

import React from 'react';
import { Device } from "twilio-client";
import { connect } from 'react-redux';
import './dialer.css'; 

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
    const phoneNumber = this.props.outboundClient.phoneNumber; 
    Device.connect({number: phoneNumber});
  }

  endCall = () => {
    console.log('#### ENDING CALL ####'); 
    Device.disconnectAll();
    // Device.disconnect(); 
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
    if (this.props.outboundClient !== null) { 
      console.log('hello')
      this.handleCallButtonClick(); 
      return (
        <div className='callBox'>
        
        </div>
      );
    }
    return (
      <div></div>
    )
  }
}

const mapStateToProps = state => {
	return {
    outboundClient : state.dialer.outboundClient
	};
};

export default connect(mapStateToProps)(Dialer);