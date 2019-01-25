import React from 'react';
import './phone.css'

export default class Phone extends React.Component {
  render() {
    console.log("loading phone")
    return (
      <div className="Phone">
        <div className="fixedPhone">
          <div className="PhoneLeft">
            <img className="PhoneImage" src={require("../../resources/mainImage.png")}></img>
          </div>
          <div className="PhoneMiddle">
            <p>
              Call from<br />
              Steven Carey
                  </p>
          </div>
          <div className="PhoneRight">
             <div onClick={e => this.onExitExample(e)} className="callAccept">Accept</div>
             <div onClick={e => this.onExitExample(e)} className="callDecline">Decline</div> 
          </div>
        </div>
      </div>
    )
  }
}

