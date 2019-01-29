import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import { productShot } from '../images/landing/index.landing';
import { LandingHeader } from '../components/navigation/LandingHeader';

export default class LandingPage extends React.Component {

  render() {
    return (
      <div>
        <LandingHeader />
        <div className="body-container">
          <div className="hero-wrapper">
            <div className="general-container">
              <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                  <div className="hero-left">
                    <h1>Elimate the Tracking Billable Calls</h1>
                    <p className="hero-sub-head">
                      Our simple solution is simple and makes life simple so you
                      can live that simple life and just be simple. It's that
                      simple.{' '}
                    </p>
                    <Link to="/register">
                      <p className="btn-blue">Sign-up!</p>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <img
                    className="hero-img"
                    src={productShot}
                    alt="Simple billing"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End of hero */}
          <div className="features-main">
            <div className="general-container">
              <div className="row section-padding first-feature">
                <div className="col-md-6">
                  <h3>Feature One</h3>
                  <p className="feature-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="col-md-6">
                  <img
                    className="feature-one-img"
                    src={productShot}
                    alt="Simple billing"
                  />
                </div>
              </div>
              <div className="row section-padding second-feature">
                <div className="col-md-6">
                  <img
                    className="feature-one-img"
                    src={productShot}
                    alt="Simple billing"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Feature One</h3>
                  <p className="feature-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* End of Features */}
          <div className="cta-row">
            <div className="general-container">
              <div className="row">
                <div className="col-md-6">
                  <div className="cta-text">
                    <h2> Sign-up for<br /> CallMEter Today!</h2>
                    <p className="cta-copy">
                      Our simple solution is simple and makes life simple so you
                          can live that simple life and just be simple. It's that
                          simple.
							</p>
                    <Link to="/register">
                      <p className="btn-blue">Sign-up!</p>
                    </Link>
                  </div>

                </div>
                <div className="col-md-6">
                  <img
                    className="cta-img"
                    src={productShot}
                    alt="Simple billing"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    );
  }
}
