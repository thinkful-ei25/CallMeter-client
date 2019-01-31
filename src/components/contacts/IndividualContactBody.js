import React from 'react';
import RecentCalls from './RecentCalls';
import {defaultProfile} from '../../images/contact/index.contact';

export default function IndividualContactBody(props) {
  return (
    <section id="individal-contact-body">
      <div className="row margin-bottom-80">
        <div className="col-md-8">
          <div className="contact-info card">
            <div className="contact-avatar">
              <img alt="contact" src={props.client.photo || defaultProfile} />
            </div>
            <div className="contact-details">
              <h2 className="contact-name">
                {props.client.firstName + ' ' + props.client.lastName}
              </h2>
              <p>{props.client.company}</p>
            </div>
            <div className="contact-info-actions" />
          </div>
          <div className="contact-info-details card">
            <div className="contact-info-block">
              <div className="info-description">
                <h3 className="contact-name">Contact Info</h3>
                <p className="des-details">
                  View your contact's personal details here. To edit, please use
                  the drop down in the top right corner.
                </p>
              </div>
              <div className="details-list">
                <ul className="contact-info-list">
                  <li>
                    <p className="details-wrap">
                      <span className="details">Email Address: </span>{' '}
                      {props.client.email}
                    </p>
                    <p className="details-wrap">
                      <span className="details">Phone Number: </span>{' '}
                      {props.client.phoneNumber}
                    </p>
                    <p className="details-wrap">
                      <span className="details">Phone Number: </span>{' '}
                      {props.client.phoneNumber}
                    </p>
                    <p className="details-wrap">
                      <span className="details">Street Address: </span>{' '}
                      {props.client.address
                        ? props.client.address.streetOne +
                          ' ' +
                          props.client.address.streetTwo
                        : ''}
                    </p>
                    <p className="details-wrap">
                      <span className="details">City: </span>{' '}
                      {props.client.address ? props.client.address.city : ''}
                    </p>
                    <p className="details-wrap">
                      <span className="details">State: </span>{' '}
                      {props.client.address ? props.client.address.state : ''}
                    </p>
                    <p className="details-wrap">
                      <span className="details">State: </span>{' '}
                      {props.client.address ? props.client.address.zip : ''}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-info card">
            <div className="details-list">
              <div className="card-title">
                <h3>Contact's Invoices</h3>
                <p className="des-details">
                  <span>1 of 2</span> Invoices Completed
                </p>
              </div>
            </div>
            <div className="invoice-list">
              {props.invoicesHTML ? props.invoicesHTML : ''}
            </div>
            <div className="invoice-button">
              <button onClick={() => props.setBody('invoices')}>
                View All Invoices
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row margin-bottom-80">
        <div className="col-md-12">
          <div className="contact-info card">
            <div className="row calls-list">
              <div className="contact-info-calls-title">
                <h3>Recent Calls</h3>
                <p className="des-details">
                  Your 5 most recent calls with {props.client.firstName}
                </p>
              </div>
              <div className="contact-info-call-actions">
                <button onClick={() => props.setBody('calls')}>
                  All Calls
                </button>
              </div>
              <div className="line">{''} </div>
            </div>
            <div className="calls-tables">
              <RecentCalls calls={props.calls} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
