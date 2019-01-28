import React from 'react';
import { connect } from 'react-redux';
import DialerApp from '../browserCall/DialerApp'
import requiresLogin from '../requires-login';

export class GlobalDialer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {(this.props.capabilityToken) ? <DialerApp capabilityToken={this.props.capabilityToken}/> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    capabilityToken: state.auth.capabilityToken,
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    loggedIn: state.auth.currentUser !== null
  };
};

export default requiresLogin()(connect(mapStateToProps)(GlobalDialer));
