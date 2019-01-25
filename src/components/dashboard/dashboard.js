import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import './dashboard.css'
import { makeData, Logo, Tips } from "./Utils";
import ReactTable from "react-table";


const pokemon = require('./pokedex.json');


export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemonArray: []
		}
	}
	componentDidMount() {
		if (1) {
			this.populatePokemon();
			document.getElementsByClassName("overlay")[0].style.visibility = "visible";
			document.getElementsByClassName("welcomeNewUser")[0].style.visibility = "visible";
		}
		// this.props.dispatch(fetchProtectedData());
	}

	populatePokemon() {
		let array = new Array(100);
		for (let i = 0; i < 100; i++) {
			array[i] = pokemon[Math.floor(Math.random() * pokemon.length)];
		}
		this.setState({
			pokemonArray: array
		})
		console.log(array);
	}

	skipTutorial() {
		this.setState({
			pokemonArray: []
		})
		document.getElementsByClassName("overlay")[0].style.visibility = "hidden";
		document.getElementsByClassName("welcomeNewUser")[0].style.visibility = "hidden";
	}

	continueTutorial() {
		document.getElementsByClassName("welcomeNewUser")[0].style.visibility = "hidden";
	}

	render() {
		return (
			<div>
				<div className="overlay">
				</div>
				<div className="welcomeNewUser">
					<div className="newUserLeft">
						<img className="oakLogo" src={require("../../resources/professorOak.png")}></img>
					</div>
					<div className="newUserRight">
						<div className="newUserRightHeader">
							<h3 style={{ fontSize: "2em" }}>Welcome to the world of Billable!</h3>
						</div>
						<div className="newUserRightDescription">
							<p>This world is inhabited far and wide by creatures called Twilio Numbers!</p>
							<p>For some people, Twilio Numbers are for personal use. Others use them for business and statistics.</p>
							<p>(UsernameGoesHere)! Your very own Twilio legend is about to unfold. A world of dreams and adventure with Twilio Numbers awaits!</p>
							<p>Let's Go!</p>
							<div className="newUserButtonContainer">
								<button className="tip" onClick={e => this.skipTutorial(e)}>Skip Tutorial<div></div></button>
								<button onClick={e => this.continueTutorial(e)}>Continue</button>
							</div>
						</div>
					</div>
				</div>
				<div className="tableContainer">
					<div className="dashButtonContainer">
						<button className="dashTableButton">Add new Item</button>
					</div>

					<ReactTable
						data={this.state.pokemonArray}
						columns={[
							{
								Header: "Phone Name",
								accessor: "name.english"
							},
							{
								Header: "Phone Number",
								accessor: "name.japanese"
							},
							{
								Header: "Caller ID",
								accessor: "name.chinese"
							},
							{
								Header: "Date Created",
								accessor: "type[0]"
							},
							{
								Header: "Last Used",
								accessor: "type[1]"
							},
						]}
						style={{ height: "600px" }}
						className="-striped -highlight"
						showPagination={false}
						defaultPageSize={-1}
					/>
					{/* <Logo /> */}

				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('dashboard state', state)
	const { currentUser } = state.auth;
	return {
		//username: state.auth.currentUser.username,
		//name: `${currentUser.firstName} ${currentUser.lastName}`,
		// protectedData: state.protectedData.data
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

// export default connect(mapStateToProps)(Dashboard);
