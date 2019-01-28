import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import DialerApp from './browserCall/DialerApp';
import { refreshAuthToken, clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import LandingPage  from './landingPage/LandingPage';
import { FormContainer } from './forms/FormContainer';
import { Dashboard } from './dashboard/dashboard';

export class App extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    if (this.props.loggedIn && this.props.capabilityToken !== null) {
      return (
        <div>
          <button onClick={() => this.logOut()}>LOG OUT</button>
          <Redirect to="/dashboard" />
          <Dashboard />
          {/* TODO: Move inside of AppRoute @sean */}
          <DialerApp capabilityToken={this.props.capabilityToken} />
        </div>
      );
    } 
    else {
      return (
        <div>
          <Redirect to="/" />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/" component={FormContainer} />
            <Route path="*" component={LandingPage} />
          </Switch>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log('appstate', state);
  return {
    capabilityToken: state.auth.capabilityToken,
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
  };
};

export default withRouter(connect(mapStateToProps)(App));
