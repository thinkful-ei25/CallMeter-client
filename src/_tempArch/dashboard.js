import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';
import FormContainer from '../forms/FormContainer';
import Stats from './Stats';
import Invoices from './Invoices';
import Clients from './Clients/Clients';
import NavBar from './navbar/Navbar';
import DialerApp from '../browserCall/DialerApp';
import AppHeader from '../AppHeader';
import {Route} from 'react-router-dom';
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
        <AppHeader name={this.props.organizationName} />
        {/* TODO: CREATE COMPONENT FOR SUBNAV */}
        <div className="app-container">
          <section id="sub-nav">
            <div className="sub-nav">
              <div className="sub-nav-row">
                <div className="contact-search">
                  <span>⌕</span>
                  <input
                    className="search"
                    type="search"
                    name="searchBox"
                    value={this.state.searchTerm}
                    onChange={e =>
                      this.setState({ searchTerm: e.target.value })
                    }
                    placeholder="Search by name"
                  />
                </div>
                <div className="add-contact">
                  <button
                    className="add-contact-button"
                    onClick={() => this.toggleAddClientForm()}
                  >
                    + Add Contact{' '}
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="contacts">
            <div className="section-container">
              <Route path="/setup" component={FormContainer} />
              <Route path="/dashboard" component={Stats} />
              <Route exact path="/invoices" component={Invoices} />
              <Route exact path="/clients" component={Clients} />
              {/* <DialerApp capabilityToken={this.props.capabilityToken} /> */}
              <button onClick={() => this.logOut()}>LOG OUT</button>
              <NavBar />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { currentUser } = state.auth;
  return {
    organizationName: state.auth.currentUser.organizationName,
    capabilityToken: state.auth.capabilityToken,
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    loggedIn: state.auth.currentUser !== null
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
