import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './forms.css';
import {login, register, phone, account, contacts} from './images';
import {LoginForm, RegisterForm, PhoneSetup, AccountInfoForm } from './'
import { Route } from 'react-router-dom';

export function FormContainer(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  const images = {
    '/setup/account': account,
    '/setup/phone': phone,
    '/setup/contacts': contacts,
    '/login': login,
    '/register': register
  }

  let imgStyle = {
    backgroundImage: 'url(' + images[props.location.pathname] + ')'
  }

  return (
    <div>
      <div className="form-container">
        <div className="img" style={imgStyle} />
        <div className="form-wrapper pad-50">
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/setup/account" component={AccountInfoForm} />
          <Route path="/setup/phone" component={PhoneSetup} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(FormContainer);
