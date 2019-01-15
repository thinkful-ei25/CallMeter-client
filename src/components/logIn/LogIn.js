import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import './LogIn.css';

export class LogIn extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }
    render() {
        return (


            <div className="background">
                <div className="nav-links">
                    <Link className="nav-link" to="/login">Log In</Link>
                    <Link className="nav-link" to="/registration-page">Sign Up</Link>
                </div>
                <div className="centerTitle" >
                    <h1 className="title" >Billable</h1>
                </div>
                <div className="descriptionBox">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="centerTitle">
                <Link to="/registration-page">Sign Up</Link>
                </div>
                <div className="centerTitle">
                    <h3 className="title">Billable</h3>
                </div>
                <div className="descriptionBox">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                       Nullam tortor nulla, rhoncus at laoreet quis, pretium at
                       elit. Nunc posuere vel metus a feugiat. Etiam dignissim erat
                        ut neque accumsan, mattis vestibulum ex auctor. Nam accumsan
                        sollicitudin odio id mollis. Nunc mi diam, convallis a nisi et,
                  molestie ultricies urna. Etiam sodales ut est ut tincidunt.</p>
                </div>
                <div className="featureContainer">
                    <div className="featureBox">
                        <img className="featureImages" src={require("../../resources/Pikachu.jpg")}></img>
                        <h3>Feature</h3>
                        <div className="featureText">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Nullam tortor nulla, rhoncus at laoreet quis,</p>
                        </div>
                    </div>
                    <div className="featureBox">
                        <img className="featureImages" src={require("../../resources/Pikachu.jpg")}></img>
                        <h3>Feature</h3>
                        <div className="featureText">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Nullam tortor nulla, rhoncus at laoreet quis,</p>
                        </div>
                    </div>
                    <div className="featureBox">
                        <img className="featureImages" src={require("../../resources/Pikachu.jpg")}></img>
                        <h3>Feature</h3>
                        <div className="featureText">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Nullam tortor nulla, rhoncus at laoreet quis,</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(LogIn));
