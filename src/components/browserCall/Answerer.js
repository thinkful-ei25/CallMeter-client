import React from 'react'; 
// import { Device } from "twilio-client";

export default class Answerer extends React.Component{ 

  constructor(props){ 
    super(props); 
    this.state = { 
      callStatus : ''
    }
  }

  render() { 
    return ( 
      // <p>{this.state.callStatus}</p>
      <section>
        <br></br>
        <button onClick={this.props.answer}>
          Answer 
        </button> 
        <button onClick={this.props.hangup}>
          Hangup
        </button>
      </section>
    ); 
  }
}