// 'use strict';
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MakeCall from './dashboard/MakeCall';
import Invoices from './dashboard/Invoices';
import NavBar from '../components/dashboard/navbar/Navbar';
import Clients from './dashboard/Clients/Clients';
import Stats from './dashboard/Stats';
import Contacts from './contactPage/contactPage';
import FormContainer from '../components/forms/FormContainer';
import DialerApp from './browserCall/DialerApp'
import requiresLogin from './requires-login';
export class DashboardRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Route exact path="/dashboard" component={Stats} />
        <Route exact path="/dashboard/setup" component={FormContainer} />  
        <Route exact path="/dashboard/stats" component={Stats} />
        <Route exact path="/dashboard/call" component={MakeCall} />
        <Route exact path="/dashboard/invoices" component={Invoices} />
        <Route exact path="/dashboard/clients" component={Clients} />
        <Route exact path="/dashboard/contacts" component={Contacts} /> 
        {(this.props.capabilityToken) ? <DialerApp capabilityToken={this.props.capabilityToken}/> : ''}
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

export default requiresLogin()(connect(mapStateToProps)(DashboardRouter));
