import React from 'react';
import { Device } from 'twilio-client';
import Answerer from './Answerer'; 
import { connect } from 'react-redux';
import InProgress from './InProgress'; 
import { fetchCallerFromContact, hangupClient } from '../../actions/index.actions';  

export class DialerApp extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      token: '',
      deviceState: '',
      deviceErrorCode: '',
      deviceErrorMessage: '', 
      connection: {}, 
      device: null, 
      isIncomingCallOnGoing: false, 
      isIncomingCallConnected: false, 
      isOutgoingCallOnGoing: false, 
    };
  }

  componentDidMount() {
    //POSSIBLE TWILIO DEVICE STATES
    console.log('YOOOOOOO'); 
    const twilioDeviceStates = 
      ['cancel', 'connect', 'disconnect', 'ringing', 'error', 'incoming', 'offline', 'ready']; 
    
    //SETS TWILIO DEVICE STATE HANDLERS
    twilioDeviceStates.forEach(twilioDeviceState => { 
      this.handleAppStateChange(twilioDeviceState);  
    }); 

    //SETS UP DEVICE
    this.setUpDevice(this.props.capabilityToken); 
  }

  setUpDevice = (capabilityToken) => { 
    this.setState({ token: capabilityToken });

    this.setState({ 
      device: 
        Device.setup(
          capabilityToken, {
            debug: true, 
            enableRingingState: true, 
            allowIncomingWhileBusy: true
           }
        )
    });  
  }

  /**
   * THIS IS CALLED WHEN THE TWILIO DEVICE STATE IS CHANGED
   * state : is the twilio device state
   * obj : is the twilio connection object
   */
  handleAppStateChange = state => {

    Device.on(state, obj => {

      this.setState({deviceState: state, connection: obj});
      if (state === 'error'){ 
        this.setState({
          deviceErrorCode: obj.code,
          deviceErrorMessage: obj.message
        }); 
      }
      else if (state === 'incoming'){ 
        this.incomingCallHandler(obj); 
      }
      else if (state === 'cancel' ){ 
        this.deviceCancelCallHandler(); 
      }
      else if (state === 'disconnect') { 
        this.deviceDisconnectedHandler(); 
      }
    });
  }; 

  deviceCancelCallHandler(){ 
    console.log('##CANCEL HANDLER##'); 
    this.setState({    
      isIncomingCallOnGoing: false, 
      isIncomingCallConnected: false, 
      isOutgoingCallOnGoing: false, 
    }); 
  }

  /**
   * THE DEVICE HAS BEEN DISCONNECTED
   * SET A NEW DEVICE
   */
  deviceDisconnectedHandler() { 
    console.log('##DISCONNECT HANDLER##'); 
    this.props.dispatch(hangupClient()); 
    this.setState({isCallOnGoing: false, isConnected: false, device: null}, () => { 
      this.endCall(); 
      // this.setUpDevice(this.props.capabilityToken); 
    });  
  }

  incomingCallHandler(conn) { 
    console.log('##INCOMING CALL HANDLER##'); 
    this.setState({ isIncomingCallOnGoing: true, isIncomingCallConnected: false}, () => { 
      this.props.dispatch(fetchCallerFromContact(conn.parameters.From)); 
    }); 
  }
  /**
   * INBOUND
   * Callback from Answerer components answer button
   */
  answerCall = () => { 
    console.log('##ANSWERING INBOUND CALL##'); 
    this.setState({ isIncomingCallOnGoing: true, isIncomingCallConnected: true}, () => { 
      this.state.connection.accept(); 
    }); 
  }

  /**
   * INBOUND
   * Callback from Answerer components hangup button
   */
  rejectCall = () => { 
    console.log('##REJECTING INBOUND CALL##'); 
    this.setState({ isIncomingCallOnGoing: false, isIncomingCallConnected: false}, () => { 
      this.state.connection.reject(); 
    }); 
  }

  /**
   * INBOUND
   */
  hangupCall = () => { 
    console.log('##HANGUP INBOUND CALL##'); 
    this.setState({ isIncomingCallOnGoing: false, isIncomingCallConnected: false}, () => { 
      Device.disconnectAll(); 
    }); 
  }

  componentDidUpdate(){ 
    console.log('COMPONENT DID UPDATED'); 
    //OUTGOING
    //WE RECEIVED AN OUTBOUND CLIENT AND THE CALL IS NOT ONGOING
    if (this.props.outboundClient !== null && !this.state.isOutgoingCallOnGoing) { 
      console.log('ABOUT TO MAKE PHONE CALL'); 
      this.makeCall();  
    }
  }

  /**
   * OUTBOUND 
   * DISCONNECT THE DEVICE BEFORE USE
   */
  makeCall = () => {
    console.log('##MAKE OUTBOUND CALL##')
    if (this.props.outboundClient != null) { 
      this.setState({ isOutgoingCallOnGoing: true}, () => { 
        // console.log('outboundclient', this.props.outboundClient);   
        const phoneNumber = this.props.outboundClient.phoneNumber.slice(2); 
        console.log(phoneNumber); 
        // Device.disconnectAll(); 
        Device.connect({number: phoneNumber}); 
        // Device.connect({phone: number}); 
      }); 
    }
  }

  /**
   * OUTBOUND
   */
  endCall = () => {
    console.log('##END OUTBOUND CALL##')
    this.props.dispatch(hangupClient()); 
    this.setState({ isOutgoingCallOnGoing : false}, () => { 
      Device.disconnectAll(); 
    })
  };
   
  render() {
    //INCOMING CALLS
    //RETURN EITHER ANSWERER OR INPROGRESS
    
    if (this.state.isIncomingCallOnGoing && this.props.caller) { 
      return (!this.state.isIncomingCallConnected) ?  
        <Answerer
          callerImage={this.props.caller.photo} 
          fullname={this.props.caller.firstName + ' ' + this.props.caller.lastName} 
          onAnswer={() => this.answerCall()} 
          onReject={() => this.rejectCall()}/>
        : 
        <InProgress hangup={() => this.hangupCall() } /> 
    }

 

    if (this.state.isOutgoingCallOnGoing) { 
      return (
        <div> 
          <InProgress hangup={ () => this.endCall() } /> 
        </div>  
      );
    }

    //IF ALL ELSE FAILS RETURN AN EMPTY DIV
    return (
      <div>
      </div>
    ); 
  }
}

const mapStateToProps = state => {
	return {
    caller: state.dialer.caller, 
    loading: state.dialer.loading, 
    error: state.dialer.error, 
    outboundClient : state.dialer.outboundClient
	};
};

export default connect(mapStateToProps)(DialerApp);