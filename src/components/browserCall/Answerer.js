import React from 'react'; 
import { Device } from "twilio-client";

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
        <button onClick={console.log('')}>
          Answer 
        </button> 
        <button onClick={console.log('')}>
          Hangup
        </button>
      </section>
    ); 
  }
}