import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { Route, Redirect } from 'react-router-dom';
import FormContainer from '../forms/FormContainer';
import Stats from './Stats';
import Invoices from './Invoices';
import Clients from './Clients/Clients';
import NavBar from './navbar/Navbar';
import ContactPage from '../contactPage/contactPage'

import './dashboard.css';

export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	
		};
	}
	render () {

  return (
    <div>
      <Route path="/setup" component={FormContainer} />
      <Route exact path="/dashboard" component={Stats} />
      <Route exact path="/invoices" component={Invoices} />
      <Route exact path="/clients" component={Clients} />
      <Route exact path="/clients/:clientId" component={ContactPage} />
      <NavBar />
    </div>
	);
	}
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
		name: `${currentUser.firstName} ${currentUser.lastName}`,
		  loggedIn: state.auth.currentUser !== null
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
