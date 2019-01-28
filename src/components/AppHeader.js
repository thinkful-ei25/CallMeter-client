import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../resources/logo.png';

export default function AppHeader(props) {
  console.log(props);
    return (
      <header className="app-header" role="banner">
        <Link to="/">
          <div className="logo">
            <img className="logo-larger" src={mainLogo} alt="ContactMEter" />
          </div>
        </Link>

        <div className="header-profile">
          <Link to="/">
            <span className="header-profile-user">Howdy {props.name}</span>
          </Link>
        </div>
      </header>
    );
  }
