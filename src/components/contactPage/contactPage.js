import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import anime from 'animejs';
import './contactPage.css';
import { fetchOneClient, setClient } from '../../actions/client'

// import { saveClientId, loadClientId, clearClientId } from '../../local-storage'


// const { twilio } = window;
export class ContactPage extends React.Component {
	componentDidMount() {
		console.log('clientid in componentdidmount', this.props.clientId)
		// if (!this.props.clientId) {
		// 	this.props.dispatch(fetchOneClient(loadClientId()))
		// }
		// else {
		this.props.dispatch(fetchOneClient(this.props.clientId))
		// 		saveClientId(this.props.clientId)
		// 	}
	}


	onClickExample(e) {
		const element = document.getElementsByClassName('fixedPokePhone')[0];
		element.style.visibility = "visible";
		anime({
			targets: '.fixedPokePhone',
			opacity: 1,
			duration: 4500,
		});
	}

	onExitExample(e) {
		const element = document.getElementsByClassName('fixedPokePhone')[0];
		anime({
			targets: '.fixedPokePhone',
			opacity: 0,
			duration: 1000,
			complete: function () {
				element.style.visibility = 'hidden'
			}
		});
	}



	render() {



		let invoicesHTML
		const client = this.props.client
		if (client.invoice) {
			if (client.invoice.length) {
				invoicesHTML = client.invoice.map(invoice => {
					return (<div className="individualInvoice">
						<h4 className="invoiceStatus stackedElements">Status (coming)</h4>
						<h2 className="stackedElements">{invoice.month + ' ' + invoice.year} Invoice ${invoice.amount}</h2>
						<p className="stackedElements">Sent {invoice.sentDate + ' - ' + (invoice.paid ? 'Paid ' + invoice.paidDate : 'Unpaid')}</p>
					</div>)
				})
			}
		}


		if (this.props.loading) {
			return <div>loading...</div>
		}
		return (
			<div className="contactPage">
				<div className="contactPageContainer">
					<div className="contactTopHeader">
						<div className="contactPageHeader">
							<div className="contactHeaderLeft">
								<h3>{client.firstName + ' ' + client.lastName}</h3>
							</div>
							<div className="contactHeaderRight">
								<h3 className="contactTitle">Client</h3>
								<button onClick={e => this.onClickExample(e)} className="contactActionButton">Actions</button>
							</div>
						</div>
					</div>
					<p className="bestFriend">{client.company}</p>
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
								<img alt='main' className="contactBodyInfoImage" src={client.photo}></img>
							</div>
							<div className="contactBodyInfoBottomSectionCotainer">
								<p className="contactBodyTags">Tags:</p>
								<div className="contactBodyInfoContainer">
									<div className="contactBodyTagSection">
										<p className="contactBodyInfoDetails">Full Name:</p>
									</div>
									<div className="contactBodyInfoSection">
										<p>{client.firstName + ' ' + client.lastName}</p>
									</div>
								</div>
								<div className="contactBodyInfoContainer">
									<div className="contactBodyTagSection">
										<p className="contactBodyInfoDetails">Company:</p>
									</div>
									<div className="contactBodyInfoSection">
										{client.company}
									</div>
								</div>
								<div className="contactBodyInfoContainer">
									<div className="contactBodyTagSection">
										<p className="contactBodyInfoDetails">Email:</p>
									</div>
									<div className="contactBodyInfoSection">
										{client.email}
									</div>
								</div>
								<div className="contactBodyInfoContainer">
									<div className="contactBodyTagSection">
										<p className="contactBodyInfoDetails">Phone:</p>
									</div>
									<div className="contactBodyInfoSection">
										{client.phoneNumber}
									</div>
								</div>
								<div style={{ border: "none" }} className="contactBodyInfoContainer">
									<div className="contactBodyTagSection">
										<p className="contactBodyInfoDetails">Address:</p>
									</div>
									<div className="contactBodyInfoSection">
										{client.address ? client.address.streetOne + ' ' + client.address.streetTwo + ' '
											+ client.address.city + ' ' + client.address.state + ' ' + client.address.zip : ""}

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
								{invoicesHTML ? invoicesHTML : ''}
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
		loggedIn: state.auth.currentUser !== null,
		client: state.client.data,
		clientId: state.client.clientId,
		loading: state.client.loading
	});
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(ContactPage));
