import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import Dashboard from './dashboard/dashboard';
import {refreshAuthToken} from '../actions/auth';
import LandingPage from '../components/landingPage/LandingPage';
import RegistrationPage from '../components/registration/Registration'
import SetupPhone from '../components/setupPhone/SetupPhone';
import Login from '../components/logIn/LogIn'
import Stats from './dashboard/Stats'
import MakeCall from './dashboard/MakeCall'
import Invoices from './dashboard/Invoices'
import navBar from '../components/dashboard/navbar/Navbar'
import Clients from './dashboard/Clients/Clients'
import ContactPage from './contactPage/contactPage'
import DialerApp from './browserCall/DialerApp';

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
                <Route path="/dashboard" component={navBar} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/setupPhone" component={SetupPhone} />
                <Route exact path="/login" component={Login} />
                <Route exact path ="/dashboard/stats" component={Stats} />
                <Route exact path="/dashboard/call" component={MakeCall} />
                <Route exact path="/dashboard/invoices" component={Invoices} />
                <Route exact path="/dashboard/clients" component={Clients} />
                <Route exact path="/dashboard/contacts" component={ContactPage} />
                {/* <Route exact path="/dashboard/dialer" component={DialerApp} /> */}
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
