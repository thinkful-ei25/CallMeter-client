import React from 'react';
import { UserSettings } from '../components/forms/index.forms';
import { settings } from '../images/forms/index.forms'

export default class Settings extends React.Component {
  render() {
    let imgStyle = {
      backgroundImage: 'url(' + settings + ')'
    };
    return (
      <div className="form-container">
      <div className="img-sized" style={imgStyle} />
      <div className="form-wrapper pad-50">
        <div className="app-container">
          <div className="title-bar">
            <header className="app-page-header" role="presentation">
              <div className="app-header-inner" role="banner">
                <div className="app-header-title">
                  <h1 className="app-heading">Your Settings</h1>
                </div>
              </div>
            </header>
          </div>
          <section className="contacts" id="settings">
            <div className="section-container">
              <UserSettings />
            </div>
          </section>
        </div>
      </div>
      </div>
    );
  }

}