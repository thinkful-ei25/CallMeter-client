import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';

import './dashboard.css';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }
  render() {
    return (
      <div>
        <button onClick={() => this.logOut()}>LOG OUT</button>
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

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
