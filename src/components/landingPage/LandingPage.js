import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter, Redirect } from 'react-router-dom';
import './LandingPage.css';

export class LandingPage extends React.Component {
    
    
    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }
        return (

            <div className="background">
                <div className="navBar">
                    <div className="navBarLeft">
                        <img className="logo" src={require("../../resources/logo.jpg")}></img>
                    </div>
                    <div className="navBarMiddle">
                    </div>
                    <div className="navBarRight">
                        <Link style={{marginRight:"10%", textDecoration:"none"}} className="nav-link" to="/login">Log In</Link>
                        <Link className="nav-link" to="/register"><button className="smallSignUp">Sign-Up</button></Link>
                    </div>
                </div>


                <div className="centerTitle" >
                    <h1 className="title" >Billable</h1>
                </div>
                <div className="descriptionBox">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="center">
                    <Link to="/register"><button className="mediumSignUp">Sign-Up</button></Link>
                </div>
                <div className="centerMainImageContainer">
                    <img src={require("../../resources/mainImage.png")}></img>
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
                  molestie ultricies urna. Etiam sodales ut est ut</p>
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
                <div className="center">
                    <Link to="/register"><button className="largeSignUp">Sign-Up</button></Link>
                </div>
                <div className="footer">

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
export default withRouter(connect(mapStateToProps)(LandingPage));
