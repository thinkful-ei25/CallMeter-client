import React from 'react';
import './Answerer.css'

export default class InProgress extends React.Component {
  constructor(props){ 
    super(props); 
  }
  render() {
    console.log("loading phone")
    return (
      <div className="Phone">
        <div className="fixedPhone">
          <div className="PhoneLeft">
            <img className="PhoneImage" src={this.props.callerImage}></img>
          </div>
          <div className="PhoneMiddle">
            <p>
              <br />
              {this.props.fullname}
            </p>
          </div>
          <div className="PhoneRight">
             <div onClick={e => this.props.hangup()} className="callAccept">Hangup</div>
          </div>
        </div>
      </div>
    )
  }
}

