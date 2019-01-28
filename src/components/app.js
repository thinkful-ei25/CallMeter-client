import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import FormContainer from './forms/FormContainer';
import Dashboard from './dashboard/dashboard';
import { refreshAuthToken } from '../actions/auth';

export class App extends React.Component {
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
    return (
      <div>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={FormContainer} />
        <Route exact path="/register" component={FormContainer} />
        <Route exact path="/" component={LandingPage} />
      </div>
    );
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
