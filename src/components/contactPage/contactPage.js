import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter, Redirect } from 'react-router-dom';
import anime from 'animejs';
import './contactPage.css';
const {twilio} = window;
export class ContactPage extends React.Component {
    onClickExample(e){
        const element = document.getElementsByClassName('fixedPokePhone')[0];
        element.style.visibility = "visible";
        anime({
            targets: '.fixedPokePhone',
            opacity: 1,
            duration: 4500,
          });
    }

    onExitExample(e){
        const element = document.getElementsByClassName('fixedPokePhone')[0];
        anime({
            targets: '.fixedPokePhone',
            opacity: 0,
            duration: 1000,
            complete: function(){
                element.style.visibility = 'hidden'
            }
          });
    }

    render() {
        return (
            <div className="contactPage">
                <div className="pokePhone">
                    <div className="fixedPokePhone">
                        <div className="pokePhoneLeft">
                            <img className="pokePhoneImage" src={require("../../resources/mainImage.png")}></img>
                        </div>
                        <div className="pokePhoneMiddle">
                            <p>
                                Call from<br/>
                                Steven Carey
                            </p>
                        </div>
                        <div className="pokePhoneRight">
                            <div onClick={e => this.onExitExample(e)} className="callAccept">Accept</div>
                            <div onClick={e => this.onExitExample(e)} className="callDecline">Decline</div>
                        </div>
                    </div>
                </div>
                <div className="contactPageContainer">
                    <div className="contactTopHeader">
                        <div className="contactPageHeader">
                            <div className="contactHeaderLeft">
                                <h3>Steven Carey</h3>
                            </div>
                            <div className="contactHeaderRight">
                                <h3 className="contactTitle">Client</h3>
                                <button onClick={e => this.onClickExample(e)} className="contactActionButton">Actions</button>
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
                            <p className="contactBodyTags">Tags:</p>
                                <div className="contactBodyInfoContainer">
                                    <div className="contactBodyTagSection">
                                        <p className="contactBodyInfoDetails">Full Name:</p>
                                    </div>
                                    <div className="contactBodyInfoSection">
                                        <p>Ash Ketchum</p>
                                    </div>
                                </div>
                                <div className="contactBodyInfoContainer">
                                    <div className="contactBodyTagSection">
                                        <p className="contactBodyInfoDetails">Company:</p>
                                    </div>  
                                    <div className="contactBodyInfoSection">
                                        Pokemon League Champion
                                    </div>
                                </div>
                                <div className="contactBodyInfoContainer">
                                    <div className="contactBodyTagSection">
                                        <p className="contactBodyInfoDetails">Email:</p>
                                    </div>
                                    <div className="contactBodyInfoSection">
                                        PikachuDaBest@PikaPika.com
                                    </div>
                                </div>
                                <div className="contactBodyInfoContainer">
                                    <div className="contactBodyTagSection">
                                        <p className="contactBodyInfoDetails">Phone:</p>
                                    </div>
                                    <div className="contactBodyInfoSection">
                                        MissingNo(mber)
                                    </div>
                                </div>
                                <div style={{border:"none"}} className="contactBodyInfoContainer">
                                    <div className="contactBodyTagSection">
                                        <p className="contactBodyInfoDetails">Address:</p>
                                    </div>
                                    <div className="contactBodyInfoSection">
                                        1580 Indigo Platue 130 Kanto 38331
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
                        <div className="recentCallsContainer">
                            <div className="recentCallsHeader">
                                <div className="recentCallsHeaderLeft">
                                    <h1 className="recentCallsHeaderTitle">Recent Calls</h1>
                                </div>
                                <div className="recentCallsHeaderRight">
                                    <button className="recentCallsHeaderButton">All Calls</button>
                                </div>
                            </div>
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
