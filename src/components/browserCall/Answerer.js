import React from 'react'; 

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
        <button onClick={() => console.log('answer button clicked')}>
          Answer 
        </button> 
        <button onClick={() => console.log('hangup button')}>
          Hangup
        </button>
      </section>
    ); 
  }
}