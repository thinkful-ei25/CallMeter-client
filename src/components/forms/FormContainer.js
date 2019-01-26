import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './forms.css';
import loginImg from './loginImg.jpg';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Route } from 'react-router-dom';

export function Registration(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  const imgStyle = {
    backgroundImage: 'url(' + loginImg + ')'
  };

  return (
    <div>
      <div className="form-container">
        <div className="login-signup-img" style={imgStyle} />
        <div className="login-signup-form-wrapper pad-50">
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Registration);
