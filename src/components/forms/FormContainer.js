import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import './forms.css';
import { login, register, phone, account, contacts } from './images';
import { LoginForm, RegisterForm, PhoneSetup, AccountInfoForm } from './';

export function FormContainer(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
console.log('PROPS', props)
  const images = {
    '/setup/account': account,
    '/setup/phone': phone,
    '/setup/contacts': contacts,
    '/login': login,
    '/register': register
  };

  let imgStyle = {
    backgroundImage: 'url(' + images[props.location.pathname] + ')'
  };

  return (
    <div>
      <div className="form-container">
        <div className="img" style={imgStyle} />
        <div className="form-wrapper pad-50">
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/register" render={() => <RegisterForm />} />
          <Route path="/setup/account" render={() => <AccountInfoForm />} />
          <Route path="/setup/phone" render={() => <PhoneSetup/>} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log('STATE ',state);
  return ({
    loggedIn: state.auth.currentUser !== null
  })
};

export default withRouter(connect(mapStateToProps)(FormContainer));
