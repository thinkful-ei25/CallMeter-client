import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter, Redirect } from 'react-router-dom';
import './LandingPage.css';

export class LandingPage extends React.Component {
	handleClick(e) {
		const footer = document.getElementsByClassName('footer')[0].offsetTop;
		const sideBar = document.getElementsByClassName('sideBar')[0];
		const leftover = document.getElementsByClassName('leftover')[0];
		if (sideBar.clientWidth > 0) {
			sideBar.style.height = '0px';
			sideBar.style.width = '0px';
			leftover.style.width = '100%';
		}
		else {
			sideBar.style.height = `${footer - 60}px`;
			sideBar.style.width = '15%';
			leftover.style.width = '85%';
		}
	}
	render() {
		if (this.props.loggedIn) {
			return <Redirect to="/dashboard" />;
		}
		return (

			<div className="background">
				<div className="navBar">
					<div className="navBarLeft">
						<img className="logo" src={require("../../resources/logo.jpg")}></img>
					</div>
					<div className="navBarMiddle">
					</div>
					<div className="navBarRight">
						<Link className="nav-link" to="/login"><button className="smallSignUp">Log In</button></Link>
						<Link className="nav-link" to="/register"><button className="smallSignUp">Sign-Up</button></Link>
					</div>
				</div>
				<div className="centerTitle" >
					<h1 className="title" >Billable</h1>
				</div>
				<div className="descriptionBox">
					<p>Billable simplifies your billing process by allowing you to make and receive calls from your browser, track calls and clients, and generate invoices. To get started all you need to do is add your contact info, create a phone number, and add a client! </p>
				</div>
				<div className="center">
					<Link to="/register"><button className="mediumSignUp">Sign-Up</button></Link>
				</div>
				<div className="centerMainImageContainer">
					<img src={require("../../resources/mainImage.png")}></img>
				</div>

				<div className="centerTitle">
					<h3 className="title">Billable</h3>
				</div>
				<div className="descriptionBox">
					<p>Billable has three main features! And there are so many more to come!! Get pumped!!!</p>
				</div>
				<div className="featureContainer">
					<div className="featureBox">
						<img className="featureImages" src='https://openclipart.org/image/2400px/svg_to_png/399/molumen-phone-icon.png'></img>
						<h3>Track Calls</h3>
						<div className="featureText">
							<p>Track outbound and inbound business calls by the minute via browser or phone.</p>
						</div>
					</div>
					<div className="featureBox">
						<img className="featureImages" src='https://cdn2.iconfinder.com/data/icons/transports-2/200/Untitled-4-512.png'></img>
						<h3>Automating Invoicing</h3>
						<div className="featureText">
							<p>Creates programmatic invoices to the client with the option of billing the client automatically for each call.  </p>
						</div>
					</div>
					<div className="featureBox">
						<img className="featureImages" src='https://cdn0.iconfinder.com/data/icons/business-and-finance-vol-2-1/48/101-512.png'></img>
						<h3>Contact Management</h3>
						<div className="featureText">
							<p>Call, create, edit, and track clients from our in-app client management dashboard.</p>
						</div>
					</div>
				</div>
				<div className="center">
					<Link to="/register"><button className="largeSignUp">Sign-Up</button></Link>
				</div>
				<div className="footer">

				</div>
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
export default withRouter(connect(mapStateToProps)(LandingPage));
