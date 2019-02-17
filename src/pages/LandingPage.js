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
          <div className="darker">
          <div className="hero-wrapper">
            <div className="general-container">
              <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                  <div className="hero-left">
                    <h1>FORGET TO SEND INVOICES</h1>
                    <p className="hero-sub-head">
                    CallMeter automates the tedious task of tracking billable time on the 
                    phone by creating invoices for clients by automatically tracking minutes 
                    spent and programmatically generating invoices unique to each of your clients. {' '}
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
          </div>
          {/* End of hero */}
          <div className="features-main">
            <div className="general-container">
              <div className="row section-padding first-feature">
                <div className="col-md-6">
                  <h3>MULTI-PLATFORM CALLING SERVICES </h3>
                  <p className="feature-text">
                    We know that you may not always be making business calls in your office. 
                    That's why you can make and receive business calls through your browser via
                    CallMeter while online and through your personal phone while offline 👍. 
                    Each call is individually tracked and overall call related statistics viewable on 
                    the stats page.  
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
                  <h3>INVOICES</h3>
                  <p className="feature-text">
                  With one simple button, you can send an invoice to your client. 
                  No hassle, no scrawling to see who you just made a phone call to on a soggy 
                  piece of paper on the subway. No DIY math, no time wasted, and no spreadsheets.
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
                    We understand you may be dubious of this incredible technology, 
                    that's why we offer a free trial.
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