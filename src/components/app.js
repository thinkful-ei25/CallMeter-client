import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import Dashboard from './dashboard';
import {refreshAuthToken} from '../actions/auth';
import LandingPage from '../components/landingPage/LandingPage';
import RegistrationPage from '../components/registration/Registration'
import SetupPhone from '../components/setupPhone/SetupPhone';
import Login from '../components/logIn/LogIn'

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
            <div className="app">
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/setupPhone" component={SetupPhone} />
                <Route exact path="/login" component={Login} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
