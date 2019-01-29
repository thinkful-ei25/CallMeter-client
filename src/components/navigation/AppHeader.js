import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mainLogo from '../resources/logo.png';

export class AppHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <header className="app-header" role="banner">
        <Link to="/">
          <div className="logo">
            <img className="logo-larger" src={mainLogo} alt="ContactMEter" />
          </div>
        </Link>

        <div className="header-profile">
          <Link to="/">
            <span className="header-profile-user">Howdy {this.props.name}</span>
          </Link>
        </div>
      </header>
    );
    }
  }

const mapStateToProps = (state) => {
  return {
    organizationName: state.auth.currentUser ? state.auth.currentUser.organizationName : null
  };
};

export default (connect(mapStateToProps)(AppHeader));