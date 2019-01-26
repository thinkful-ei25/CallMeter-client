import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import requiresLogin from '../requires-login';
import loginImg from '../forms/loginImg.jpg';
import '../forms/forms.css';
import PhoneSetup from './PhoneSetup';
import PersonalSetup from './PersonalSetup';
import OrganizationSetup from './OrganizationSetup';

export class SetupModal extends React.Component {
  render() {
    const imgStyle = {
      backgroundImage: 'url(' + loginImg + ')'
    };
    return (
      <div>
        <div className="form-container">
          <div className="login-signup-img" style={imgStyle} />
          <div className="login-signup-form-wrapper pad-50">
            <Route path="/setup/personal" component={PersonalSetup} />
            <Route path="/setup/phone" component={PhoneSetup} />
            <Route path="/setup/organization" component={OrganizationSetup} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default requiresLogin()(connect(mapStateToProps)(SetupModal));
