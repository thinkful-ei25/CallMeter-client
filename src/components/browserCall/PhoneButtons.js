import React from 'react';
import {Digits} from "./Digits";

export default class PhoneButtons extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <div >
            <Digits digit='1' onClick={this.props.onChange} />
          </div>
          <div>
            <Digits digit='2' onClick={this.props.onChange} />
          </div>
          <div>
            <Digits digit='3' onClick={this.props.onChange} />
          </div>
        </div>

        <div>
          <div >
            <Digits digit='4' onClick={this.props.onChange} />
          </div>
          <div>
            <Digits digit='5' onClick={this.props.onChange} />
          </div>
          <div>
            <Digits digit='6' onClick={this.props.onChange} />
          </div>
        </div>

        <div>
          <div >
            <Digits digit='7' onClick={this.props.onChange} />
          </div>
          <div>
            <Digits digit='8' onClick={this.props.onChange} />
          </div>
          <div>
            <Digits digit='9' onClick={this.props.onChange} />
          </div>
        </div>

        <div>
          <div >
            <Digits digit='*' onClick={this.props.onChange} />
          </div>
          <div>
            <Digits digit='0' onClick={this.props.onChange} />
          </div>
          <div>
            <Digits digit='#' onClick={this.props.onChange} />
          </div>
        </div>
      </div>
    )
  }
}