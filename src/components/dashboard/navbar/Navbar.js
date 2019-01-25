import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter, Redirect } from 'react-router-dom';
import anime from 'animejs'
import './Navbar.css';

const { twilio } = window;
export class navBar extends React.Component {


	async startAnimation(e) {
		const buttons = document.getElementsByClassName('aniButton');
		const currentButton = e.currentTarget;
		if (buttons[0].style.visibility === 'visible') {
			currentButton.src = "https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png";
			for (let i = 0; i < buttons.length; i++) {
				await anime({
					targets: buttons[i],
					translateY: 50 * (i + 1),
					duration: 300,
					complete: function () {
						buttons[i].style.visibility = 'hidden';
					}
				})
			}
		}
		else {
			currentButton.src = require("../../../resources/X.png");
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].style.visibility = "visible";
				anime({
					targets: buttons[i],
					translateY: -50 * (i + 1),
					duration: 2000
				})
			}
		}
	}

	render() {
		return (
			<div class="buttonContainer">
				<div class="fixed">
					<Link to=""><img className="aniButton" src={require("../../../resources/envelope.png")}></img></Link>
					<Link to="/dashboard/clients"><img className="aniButton" src={require("../../../resources/icon.png")}></img></Link>
					<Link to="/dashboard/stats"><img className="aniButton" src="https://gallery.kissclipart.com/20180929/jqq/kissclipart-chart-black-and-white-clipart-bar-chart-clip-art-18a3aa13f1fdd7ed.png"></img></Link>
					<Link to=""><img className="aniButton" src={require("../../../resources/hashTag.png")}></img></Link>
					<Link to=""><img className="aniButton" src={require("../../../resources/volumePhone.png")}></img></Link>
					<img className="dots" src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png" onClick={e => this.startAnimation(e)}></img>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
  });
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(navBar));
