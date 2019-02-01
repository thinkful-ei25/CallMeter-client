import React from 'react';
import '../../styles/Answerer.css';

export default class Phone extends React.Component {
  render() {
    return (
      <div className="phone">
        <div className="fixed-phone">
          <div className="phone-left">
            <img
              alt="call-answerer"
              className="phone-img"
              src={this.props.callerImage}
            />
          </div>
          <div className="phone-middle">
            <p>
              <span className="call-from">Call from:</span>
              <br />
              <span className="caller-name">{this.props.fullname}</span>
            </p>
          </div>
          <div className="phone-right">
            <div onClick={e => this.props.onAnswer()} className="call-accept">
              Accept
            </div>
            <div onClick={e => this.props.onReject()} className="call-decline">
              Decline
            </div>
          </div>
        </div>
      </div>
    );
  }
}
