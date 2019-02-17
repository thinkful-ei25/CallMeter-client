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
      isOutgoingCallConnected: false
    };
  }

  componentDidMount() {
    //POSSIBLE TWILIO DEVICE STATES
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
            warning: false, 
            debug: false, 
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
      else if (state === 'ringing' ) { 
        // console.log('ringing'); 
      }
      else if (state === 'connect') { 
        if (this.state.isOutgoingCallOnGoing) { 
          this.setState({isOutgoingCallConnected : true}); 
        } 
      }
    });
  }; 

  deviceCancelCallHandler(){ 
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
    this.props.dispatch(hangupClient()); 
    this.setState({ isOutgoingCallOnGoing: false,  isOutgoingCallConnected: false, isIncomingCallOnGoing: false, device: null}, () => { 
      this.endCall(); 
    });  
  }

  incomingCallHandler(conn) { 
    this.setState({ isIncomingCallOnGoing: true, isIncomingCallConnected: false}, () => { 
      this.props.dispatch(fetchCallerFromContact(conn.parameters.From)); 
    }); 
  }
  /**
   * INBOUND
   * Callback from Answerer components answer button
   */
  answerCall = () => { 
    this.setState({ isIncomingCallOnGoing: true, isIncomingCallConnected: true}, () => { 
      this.state.connection.accept(); 
    }); 
  }

  /**
   * INBOUND
   * Callback from Answerer components hangup button
   */
  rejectCall = () => { 
    this.setState({ isIncomingCallOnGoing: false, isIncomingCallConnected: false}, () => { 
      this.state.connection.reject(); 
    }); 
  }

  /**
   * INBOUND
   */
  hangupCall = () => { 
    this.setState({ isIncomingCallOnGoing: false, isIncomingCallConnected: false}, () => { 
      Device.disconnectAll(); 
    }); 
  }

  componentDidUpdate(){ 
    //OUTGOING
    //WE RECEIVED AN OUTBOUND CLIENT AND THE CALL IS NOT ONGOING
    if (this.props.outboundClient !== null && !this.state.isOutgoingCallOnGoing) { 
      // console.log('ABOUT TO MAKE PHONE CALL'); 
      this.makeCall();  
    }
  }

  /**
   * OUTBOUND 
   * DISCONNECT THE DEVICE BEFORE USE
   */
  makeCall = () => {
    if (this.props.outboundClient != null) { 
      this.setState({ isOutgoingCallOnGoing: true}, () => { 
        const phoneNumber = this.props.outboundClient.phoneNumber.slice(2); 
        Device.connect({number: phoneNumber}); 
      }); 
    }
  }

  /**
   * OUTBOUND
   */
  endCall = () => {
    this.props.dispatch(hangupClient()); 
    this.setState({ isOutgoingCallOnGoing : false, isOutgoingCallConnected : false}, () => { 
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
        <InProgress callStatus='connected' hangup={() => this.hangupCall() } /> 
    }

    //OUTGOING
    if (this.state.isOutgoingCallOnGoing) { 
      return (
        <div> 
          <InProgress callStatus={(this.state.isOutgoingCallConnected) ? 'Connected' : 'Ringing'} hangup={ () => this.endCall() } /> 
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