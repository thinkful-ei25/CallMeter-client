import React from 'react'
import RecentCalls from './RecentCalls'

export default function IndividualContactBody(props) {
  return(
    <body className="contactBody">
            <div className="contactBodyTopBoxes">

              <div className="contactBodyInfo">
                <div className="contactBodyInfoImageContainer">
                  <img alt='main' className="contactBodyInfoImage" src={props.client.photo}></img>
                </div>
                <div className="contactBodyInfoBottomSectionCotainer">
                  <p className="contactBodyTags">Tags:</p>
                  <div className="contactBodyInfoContainer">
                    <div className="contactBodyTagSection">
                      <p className="contactBodyInfoDetails">Full Name:</p>
                    </div>
                    <div className="contactBodyInfoSection">
                      <p className="contactBodyInfoDetails">{props.client.firstName + ' ' + props.client.lastName}</p>
                    </div>
                  </div>
                  <div className="contactBodyInfoContainer">
                    <div className="contactBodyTagSection">
                      <p className="contactBodyInfoDetails">Company:</p>
                    </div>
                    <div className="contactBodyInfoSection">
                    <p className="contactBodyInfoDetails">{props.client.company}</p>
                    </div>
                  </div>
                  <div className="contactBodyInfoContainer">
                    <div className="contactBodyTagSection">
                      <p className="contactBodyInfoDetails">Email:</p>
                    </div>
                    <div className="contactBodyInfoSection">
                    <p className="contactBodyInfoDetails">{props.client.email}</p>
                    </div>
                  </div>
                  <div className="contactBodyInfoContainer">
                    <div className="contactBodyTagSection">
                      <p className="contactBodyInfoDetails">Phone:</p>
                    </div>
                    <div className="contactBodyInfoSection">
                    <p className="contactBodyInfoDetails">{props.client.phoneNumber}</p>
                    </div>
                  </div>
                  <div style={{ border: "none" }} className="contactBodyInfoContainer">
                    <div className="contactBodyTagSection">
                      <p className="contactBodyInfoDetails">Address:</p>
                    </div>
                    <div className="contactBodyInfoSection">
                    <p className="contactBodyInfoDetails">{props.client.address ? props.client.address.streetOne + ' ' + props.client.address.streetTwo + ' '
                        + props.client.address.city + ' ' + props.client.address.state + ' ' + props.client.address.zip : ""}</p>

                    </div>
                  </div>
                </div>
              </div>

              <div className="contactBodyInvoices">
                <div className="contactBodyInvoicesTop">
                  <div className="invoicesTitle verticalCenter">
                    <div>
                      <h3 className="stackedElements">Invoices</h3>
                      <p className="stackedElements">1 of 2 Invoices Completed</p>
                    </div>
                  </div>
                </div>
                <div className="contactBodyInvoicesBottom">
                  {props.invoicesHTML ? props.invoicesHTML : ''}
                </div>
                <button onClick={() => props.setBody("invoices")} className="invoicesBottomButton">
                  All Invoices
                            </button>
              </div>
              <div className="recentCallsContainer">
                <div className="recentCallsHeader">
                  <div className="recentCallsHeaderLeft">
                    <h1 className="recentCallsHeaderTitle">Recent Calls</h1>
                  </div>
                  <div className="recentCallsHeaderRight">
                    <button onClick={() => props.setBody("calls")}className="recentCallsHeaderButton">All Calls</button>
                  </div>
                </div>
              <RecentCalls calls={props.calls} />
              </div>
            </div>
            
          </body>
  )
}


