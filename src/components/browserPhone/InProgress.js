import React from 'react';
import '../../styles/Answerer.css'; 

export default class InProgress extends React.Component {

  render() {
    return (
      <div className="Phone">
        <div className="fixedPhone">
          <div className="PhoneLeft">
            <img alt="call-in-progress" className="PhoneImage" src={this.props.callerImage}></img>
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

