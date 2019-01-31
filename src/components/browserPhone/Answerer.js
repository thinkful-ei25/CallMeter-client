import React from 'react';
import '../../styles/Answerer.css'; 

export default class Phone extends React.Component {

  render() {
    return (
      <div className="Phone">
        <div className="fixedPhone">
          <div className="PhoneLeft">
            <img alt="call-answerer" className="PhoneImage" src={this.props.callerImage}></img>
          </div>
          <div className="PhoneMiddle">
            <p>
              Call from<br />
              {this.props.fullname}
                  </p>
          </div>
          <div className="PhoneRight">
             <div onClick={e => this.props.onAnswer()} className="callAccept">Accept</div>
             <div onClick={e => this.props.onReject()} className="callDecline">Decline</div> 
          </div>
        </div>
      </div>
    )
  }
}

