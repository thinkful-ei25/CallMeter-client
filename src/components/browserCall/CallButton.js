import React from 'react';
import './dialer.css';
import './flags/flags.css';

export default class CallButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false
    };
  }

  render() {
    return (
      <button className={'btn btn-circle btn-success ' + (this.props.onPhone ? 'btn-danger' : 'btn-success')}
        onClick={this.props.handleOnClick} disabled={this.props.disabled}>
        <i className={'fa fa-fw fa-phone ' + (this.props.onPhone ? 'fa-close' : 'fa-phone')}></i>
      </button>
    );
  }
}
