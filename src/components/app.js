import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppRouter from './appRouter'; 
import DialerApp from './browserCall/DialerApp';
import {refreshAuthToken, clearAuth} from '../actions/auth';
import { clearAuthToken } from '../local-storage';
// import Phone from './contactPage/phone';
import { LandingPage } from './landingPage/LandingPage';

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
              <AppRouter />
              {/* <Phone/> */}
              {/* //Pass capality token as a prop to the DialerApp */}
              <DialerApp capabilityToken={this.props.capabilityToken} /> 
            </div>
          ); 
        }
        else { 
          return ( 
            <div> 
              <AppRouter /> 
            </div> 
          ); 
        }
    }
}

const mapStateToProps = state => ({
  capabilityToken: state.auth.capabilityToken, 
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
