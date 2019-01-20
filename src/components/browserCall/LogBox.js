import React from 'react';
import './dialer.css';
import './flags/flags.css';

export default class LogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false
    };
  }

  render() {
    return (
      <div>
        <div className="log">{this.props.text}</div>
        <p>{this.props.smallText}</p>
      </div>
    );
  }
}
