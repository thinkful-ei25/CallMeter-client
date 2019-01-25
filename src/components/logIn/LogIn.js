import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import loginImg from './loginImg.jpg';
import LoginForm from './LoginForm'

export function Login(props) {
	// If we are logged in (which happens automatically when registration
	// is successful) redirect to the user's dashboard
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />;
	}
	const imgStyle = {
		backgroundImage: 'url(' + loginImg + ')'
	}
	return (
	<div>
		<div className="login-container">
			<div className="login-img" style={imgStyle}></div>
			<div className="login-form-wrapper pad-50">
				<LoginForm />
			</div>
		</div>
	</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Login);
