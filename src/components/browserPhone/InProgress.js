import React from 'react';
import '../../styles/Answerer.css'; 

export default class InProgress extends React.Component {

  render() {
    return (
      <div className="phone">
        <div className="fixed-phone">
          <div className="phone-left">
            <p>{this.props.callStatus}</p> 
          </div>
          <div className="phone-middle">
            <p>
              <br />
              {this.props.fullname}
            </p>
          </div>
          <div className="phone-right">
             <div onClick={e => this.props.hangup()} className="call-accept">Hangup</div>
          </div>
        </div>
      </div>
    )
  }
}

