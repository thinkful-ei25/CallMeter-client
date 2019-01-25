import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from '../../requires-login';
import { fetchClients, deleteClient, setClient } from '../../../actions/client';
import '../dashboard.css'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import AddClient from './AddClient';
import EditClient from './EditClient';
import './clients.css'

export class Clients extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			adding: false,
			editing: false,
			editingClient: null,
			searchTerm: '',
			view: 'clients'
		}
	}

	componentDidMount() {
		this.props.dispatch(fetchClients());
	}

	toggleAddClientForm() {
		this.setState({ adding: !this.state.adding })
	}

	toggleEditClientForm() {
		this.setState({ editing: !this.state.editing })
		console.log(this.state)
	}

	toggleView(e) {
		this.setState({ view: e.target.value })
		console.log(this.state)
	}

	setClient(id) {
		console.log('id in setClient', id)
		this.props.dispatch(setClient(id))
	}



	render() {

		if (this.props.loading) {
            return <div>loading...</div>
        }

		if (Array.isArray(this.props.client) && !this.state.adding && !this.state.editing && this.state.view === 'clients') {
			let clients = this.props.client
			console.log('clients:', clients)
			clients.forEach(row => {
				let fullName = row.firstName + ' ' + row.lastName
				row.fullName = <Link to="/dashboard/contacts" onClick={(e) => this.setClient(row.id) }>{fullName}</Link>
			})
			if (this.state.searchTerm) {
				clients = clients.filter(row => {
					return row.firstName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || row.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || row.company.toLowerCase().includes(this.state.searchTerm.toLowerCase())
						|| row.phoneNumber.includes(this.state.searchTerm)
				})
			}

			return (
				<div className="invoicesTable">
					<div className="headerContainer">
						<h1>Contacts</h1>
						<div className="searchBoxContainer">
							<label className="searchLabel" htmlFor="searchBox">⌕</label>
							<input className="searchBox" name="searchBox" value={this.state.searchTerm}
								onChange={e => this.setState({ searchTerm: e.target.value })}></input>
						</div>
						<p> <select value={this.state.view} onChange={e => this.toggleView(e)} className="addClientButton">
							<option value="clients">Contacts</option>
							<option value="stats">Stats</option>
						</select>
							<button className="addClientButton" onClick={() => this.toggleAddClientForm()}>+ Add Contact </button></p>
					</div>
					<ReactTable
						data={clients}
						getTdProps={() => ({
							style: {
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center'

							}
						})}
						columns={[
							{
								Header: "Contact",
								accessor: "photo",
								sortable: false,
								Cell: row => (<img className="contactImage" alt='contactImage' src={row.value}/>)
								
							},
							{
								Header: "Name",
								accessor: "fullName",

							},

							{
								Header: "Company",
								accessor: "company"
							},
							{
								Header: "Phone Number",
								id: "phoneNumber",
								accessor: "phoneNumber"
							},
							{
								Header: "Category",
								accessor: "category"
							},
							{
								Header: "Actions",
								accessor: "id",
								sortable: false,
								Cell: row => (
									<div>
										<button className="navButton editButton" onClick={() => {
											this.setState({
												editingClient: this.props.client.filter(client => row.value === client.id)[0]
											})

											this.toggleEditClientForm();

										}}>✎</button>
                    
										<button className="navButton" onClick={() => {
											this.props.dispatch(deleteClient(row.value))
												.then(this.props.dispatch(fetchClients()))
										}}><span aria-label='x' role='img'>❌</span></button>

										<button className="navButton" onClick={() => {

										}}><span>☎</span></button>
									</div>
								)
							},



						]}
						defaultPageSize={10}
						className="-striped -highlight"
					/>
					<br />

					{/* <Logo /> */}
				</div>
			);
		}
		else if (this.state.adding) {
			return (
				<div className="topFormContainer noLine">
					<AddClient toggle={() => this.toggleAddClientForm()} />
				</div>
			)
		}

		else if (this.state.editing) {
			return (
				<div className="topFormContainer noLine">
					<EditClient initialValues={this.state.editingClient} toggle={() => this.toggleEditClientForm()} />
				</div>
			)
		}
		else if (this.state.view === 'stats') {
			return (<div>
				<select className="select addClientButton" value={this.state.view} onChange={e => this.toggleView(e)} >
					<option value="clients">Contacts</option>
					<option value="stats">Stats</option>
				</select>
			</div>)
		}
		else {
			return null
		}
	}
}


const mapStateToProps = state => {
	console.log('client', state)
	// const { currentUser } = state.auth;
	return {
		// username: state.auth.currentUser.username,
		// name: `${currentUser.firstName} ${currentUser.lastName}`,
		client: state.client.data,
		// protectedData: state.protectedData.data
		

	};
};

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));

export default requiresLogin()(connect(mapStateToProps)(Clients));