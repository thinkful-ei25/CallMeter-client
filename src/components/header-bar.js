import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { Link } from 'react-router-dom';
// import mainLogo from '../assets/logo.png';
// import './header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let buttonMenu;
    if (true) {
      buttonMenu = (
        <div className="login header-item-login">
          <a href="/" className="login-link" onClick={() => this.logOut()}>
            LOGOUT
          </a>
        </div>
        // <div className="button-position">
        //   <button className="login-signup-button" onClick={() => this.logOut()}>
        //     Log out
        //   </button>
        // </div>
      );
    } else {
      buttonMenu = (
        <Fragment>
          <div className="login header-item-login">
            <Link to="/login">
              <strong>
                <a className="login-link">Login</a>
              </strong>
            </Link>
          </div>
          <div className="header-item" id="signup">
            <Link to="/sign-up">
              <p className="button sign-up-button">Register</p>
            </Link>
          </div>
        </Fragment>
      );
    }
    return (
      <header role="banner" id="header">
        <div className="header-main">
          <div className="header-left">
            <div className="logo header-item">
              <Link to="/">
                <div className="logo-img">
                  {/* <img className="logo-larger"
                src={mainLogo} alt="SQL Learning Labs Logo" /> */}
                </div>
              </Link>
            </div>
          </div>
          <div className="header-right">{buttonMenu}</div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);