import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logo, mobileLogo } from '../../images/header/index.header'; 
import '../../styles/LandingHeader.css';

export class LandingHeader extends React.Component {
  render() {
    return (
      <header role="banner" id="header">
        <div className="header-main">
          <div className="header-left">
            <div className="logo header-item">
              <Link to="/">
                <div className="logo-img">
                  <img
                    className="logo-larger"
                    src={logo}
                    alt="ContactMEter"
                  />
                  <img
                    className="logo-mobile"
                    src={mobileLogo}
                    alt="ContactMEter"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="header-right">
            <div className="login header-item-login">
              <Link to="/login">
                <strong>
                  <span className="login-link">Login</span>
                </strong>
              </Link>
            </div>
            <div className="header-item" id="signup">
              <Link to="/register">
                <p className="button sign-up-button">Register</p>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(LandingHeader);
