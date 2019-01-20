import React from 'react'; 
import { Device } from "twilio-client";

export default class Answerer extends React.Component{ 

  constructor(props){ 
    super(props); 
    this.state = { 
      callStatus : ''
    }
  }

  answerCall() { 
    //TODO CONNECT TO CONNECT.ACCEPT CALLBACK
    Device.incoming(this.answered); 
    // connection.accept(); 

  }

  answered(connection){ 
    connection.accept();
  }

  hangup() { 
    Device.disconnect(); 
  }

  render() { 
    return ( 
      // <p>{this.state.callStatus}</p>
      <section>
        <br></br>
        <button onClick={this.answerCall()}>
          Answer 
        </button> 
        <button onClick={this.hangup}>
          Hangup
        </button>
      </section>
    ); 
  }
}