import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { Route } from 'react-router-dom';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';
import FormContainer from '../forms/FormContainer';
import Stats from './Stats';
import Invoices from './Invoices';
import Clients from './Clients/Clients';
import NavBar from './navbar/Navbar';
import DialerApp from '../browserCall/DialerApp';

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
        <Route path="/setup" component={FormContainer} />
        <Route path="/dashboard" component={Stats} />
        <Route exact path="/invoices" component={Invoices} />
        <Route exact path="/clients" component={Clients} />
        {/* <DialerApp capabilityToken={this.props.capabilityToken} /> */}
        <NavBar />
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
