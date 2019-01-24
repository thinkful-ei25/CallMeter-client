import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter, Redirect } from 'react-router-dom';
import anime from 'animejs'



import './contactPage.css';


const {twilio} = window;
export class ContactPage extends React.Component {
    render() {
        return (
            <div className="contactPage">
                <div className="contactPageContainer">
                    <div className="contactTopHeader">
                        <div className="contactPageHeader">
                            <div className="contactHeaderLeft">
                                <h3>Steven Carey</h3>
                            </div>
                            <div className="contactHeaderRight">
                                <h3 className="contactTitle">Client</h3>
                                <button className="contactActionButton">Actions</button>
                            </div>
                        </div>
                    </div>
                    <p className="bestFriend">Best Friend</p>
                    <div className="contactSections">
                        <p className="contactLinks">Details</p>
                        <p className="contactLinks">Calls</p>
                        <p className="contactLinks">Invoices</p>
                        <p className="contactLinks">Notes</p>
                    </div>
                </div>
                <body className="contactBody">
                    <div className="contactBodyTopBoxes">

                        <div className="contactBodyInfo">
                            <div className="contactBodyInfoImageContainer">
                                <img className="contactBodyInfoImage" src={require("../../resources/mainImage.png")}></img>
                            </div>
                            <div className="contactBodyInfoBottomSectionCotainer">
                                    <p>Tags:</p>
                                <div className="contactBodyInfoContainer">
                                    <div className="contactBodyInfoSection">
                                        <p>Full Name:</p>
                                    </div>
                                </div>
                                <div className="contactBodyInfoContainer">
                                    <div className="contactBodyInfoSection">
                                        <p>Company:</p>
                                    </div>  
                                </div>
                                <div className="contactBodyInfoContainer">
                                    <div className="contactBodyInfoSection">
                                        <p>Email:</p>
                                    </div>
                                </div>
                                <div className="contactBodyInfoContainer">
                                    <div className="contactBodyInfoSection">
                                        <p>Phone:</p>
                                    </div>
                                </div>
                                <div className="contactBodyInfoContainer">
                                    <div className="contactBodyInfoSection">
                                        <p>Address:</p>
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
                                <div className="individualInvoice">
                                    <h4 className="invoiceStatus stackedElements">One Week Late</h4>
                                    <h2 className="stackedElements">March 2018 Invoice</h2>
                                    <p clasName="stackedElements">Sent March 1, 2018 - Unpaid</p>
                                </div>
                                <div className="individualInvoice">
                                    <h4 className="invoiceStatus stackedElements">One Week Late</h4>
                                    <h2 className="stackedElements">March 2018 Invoice</h2>
                                    <p clasName="stackedElements">Sent March 1, 2018 - Unpaid</p>
                                </div>
                            </div>
                            <button className="invoicesBottomButton">
                                All Invoices
                            </button>
                        </div>
                    </div>
                </body>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('landing page state', state);
    return ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(ContactPage));
