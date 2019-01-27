'use strict';

import React from 'react';
import { Device } from "twilio-client";
import { connect } from 'react-redux';
import InProgress from './InProgress'; 
import './dialer.css'; 

const countryCode = '+1';
export  class Dialer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      number: '', 
      inProgress: true
    };
  }

  handlePhoneNumberInput = (event) => {
    const phoneNumber = event.target.value;
    this.setState({number: phoneNumber});
  };

  handleButtonPress = (buttonPressed) => {
    this.setState(state => ({
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
  };

  handleCallButtonClick = () => {
    if (this.props.outboundClient != null) { 
      this.makeCall(this.props.outboundClient, this.state.token);
    }
  }

  startProgress = () => { 
    this.setState({progress: true})
  }
  endProgress = () => { 
    this.setState({progress: false})
    console.log('hi');
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
    if (this.props.outboundClient !== null) { 
      console.log('hello')
      this.handleCallButtonClick(); 
        return (
          <div> 
            <InProgress hangup={() => { 
              console.log('hangingup inpogress'); 
              this.endCall();          
            }
          } /> 
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