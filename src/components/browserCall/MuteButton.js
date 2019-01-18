import React from 'react';
import './dialer.css';

export default class MuteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false
    };
  }

  render() {
    return (
      <button className="btn btn-circle btn-default" onClick={this.props.handleOnClick}>
        <i className={'fa fa-fw fa-microphone ' + (this.props.muted ? 'fa-microphone-slash' : 'fa-microphone')}></i>
      </button>
    );
  }
}
