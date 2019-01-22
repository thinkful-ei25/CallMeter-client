import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuthToken } from '../../../local-storage'
import { clearAuth } from '../../../actions/auth'
import './Navbar.css'

export class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemonArray: []
		}
	}

	logOut() {
		console.log(this.props)
		this.props.dispatch(clearAuth())
		clearAuthToken()
	}

	render() {
		return (
			<div>
				<div className="dashboard topnavContainer">
					<div className="dashboard-username topnav">
						<Link to="/dashboard/stats">Stats</Link>
					</div>
					<div className="dashboard-name topnav"><Link to="/dashboard/invoices">Invoices</Link></div>
					<div className="dashboard-protected-data topnav">
						<Link to="/dashboard/call">Make Calls</Link>
					</div>
					<div className="dashboard-protected-data topnav">
						<Link to="/dashboard/clients">Clients</Link>
					</div>
					<div className="topnav">
						<button className="logOutButton" onClick={() => this.logOut()}>Log Out</button>
					</div>

				</div>
			</div>
		)

	}
}
const mapStateToProps = state => {
	const { currentUser } = state.auth;
	return {
		//username: state.auth.currentUser.username,
		//name: `${currentUser.firstName} ${currentUser.lastName}`,
		// protectedData: state.protectedData.data
	};
};

export default connect(mapStateToProps)(Navbar);