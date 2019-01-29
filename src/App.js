import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import FormContainer from './forms/FormContainer';
import DashboardRoutes from './appRouter';
import Setup from './forms/FormContainer';
import { refreshAuthToken } from '../actions/auth';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
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
    if (!this.refreshInterval) return;
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={FormContainer} />
        <Route exact path="/register" component={FormContainer} />
        <Route exact path="/setup" component={Setup} />
        <Route exact path="/" component={LandingPage} />
        {DashboardRoutes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('test');
  console.log('appstate', state);
  return {
    capabilityToken: state.auth.capabilityToken,
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
  };
};

export default withRouter(connect(mapStateToProps)(App));
