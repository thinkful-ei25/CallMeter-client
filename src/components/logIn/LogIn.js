import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// import './Registration.css';
import LoginForm from './LoginForm'

export function Login(props) {
<<<<<<< HEAD
	// If we are logged in (which happens automatically when registration
	// is successful) redirect to the user's dashboard
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<div>
			<div className="vhHeader">

			</div>
			<div className="fullPage">
				<div className="registrationPageContainer shadow">
					<div className="topFormContainer">



						<div className="registrationDescription">
							<h1 className="title" >Billable</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
=======
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div>
            <div className="vhHeader">

            </div>
            <div className="fullPage">
                <div className="registrationPageContainer shadow">
                    <div className="topFormContainer">
                        <div className="registrationDescription">
                            <h1 className="title" >Billable</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
>>>>>>> broswerCall
                laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
					</div>
					<div className="topFormContainer noLine">
						<LoginForm />
					</div>
				</div>
			</div>
			<div className="vhFooter">
			</div>
		</div>

	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Login);
