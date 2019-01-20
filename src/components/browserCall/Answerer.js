import React from 'react'; 

export default class Answerer extends React.Component{ 

  constructor(props){ 
    super(props); 
    this.state = { 
      callStatus : ''
    }
  }

  answerCall() { 
    //TODO CONNECT TO CONNECT.ACCEPT CALLBACK
    // connection.accept(); 

  }

  render() { 
    return ( 
      // <p>{this.state.callStatus}</p>
      <section>
        <br></br>
        <button onClick={this.answerCall()}>
          Answer 
        </button> 
        <button onClick={() => console.log('hangup button')}>
          Hangup
        </button>
      </section>
    ); 
  }
}