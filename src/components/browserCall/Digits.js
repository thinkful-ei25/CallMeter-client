import React from 'react';

export class Digits extends React.Component {
  render() {
    return (
      <button
        onClick={() => this.props.onClick(this.props.digit)}
        value={this.props.digit}
      >
        <div>{this.props.digit}</div>
      </button>
    );
  }
}
