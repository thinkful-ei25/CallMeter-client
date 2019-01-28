import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from '../../requires-login';
import { fetchClients, deleteClient, setClient } from '../../../actions/client';
import mainLogo from '../../../resources/logo.png';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddClient from './AddClient';
import EditClient from './EditClient';
import './clients.css';
import { dialClient } from '../../../actions/dialer.action';
export class Clients extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			adding: false,
			editing: false,
			editingClient: null,
			searchTerm: '',
			view: 'clients'
		};
	}

	componentDidMount() {
		this.props.dispatch(fetchClients());
	}

	toggleAddClientForm() {
		this.setState({ adding: !this.state.adding });
	}

	toggleEditClientForm() {
		this.setState({ editing: !this.state.editing });
		console.log(this.state);
	}

	toggleView(e) {
		this.setState({ view: e.target.value });
		console.log(this.state);
	}

	setClient(id) {
		console.log('id in setClient', id);
		this.props.dispatch(setClient(id));
	}

	render() {
		if (this.props.loading) {
			return <div>loading...</div>;
		}

		if (
			Array.isArray(this.props.client) &&
			!this.state.adding &&
			!this.state.editing
		) {
			let clients = this.props.client;
			console.log('clients:', clients);
			clients.forEach(row => {
				let fullName = row.firstName + ' ' + row.lastName;
				row.fullName = (
					<Link to={`/clients/${row.id}`} onClick={e => this.setClient(row.id)}>
						{fullName}
					</Link>
				);
			});
			if (this.state.searchTerm) {
				clients = clients.filter(row => {
					return (
						row.firstName
							.toLowerCase()
							.includes(this.state.searchTerm.toLowerCase()) ||
						row.lastName
							.toLowerCase()
							.includes(this.state.searchTerm.toLowerCase()) ||
						row.company
							.toLowerCase()
							.includes(this.state.searchTerm.toLowerCase()) ||
						row.phoneNumber.includes(this.state.searchTerm)
					);
				});
			}

			const clientColumns = {
				clients: [
					{
						Header: '',
						accessor: 'photo',
						sortable: false,
						Cell: props => (
							<span className="avatar">
								<img
									className="table-cell-photo"
									alt="contactImage"
									src={props.value}
								/>
							</span>
						),
						width: 60,
						resizable: false
					},
					{
						Header: 'Name',
						accessor: 'fullName',
						resizable: false
					},
					{
						Header: 'Company',
						accessor: 'company',
						resizable: false
					},
					{
						Header: 'Phone Number',
						id: 'phoneNumber',
						accessor: 'phoneNumber',
						resizable: false
					},
					{
						Header: 'Category',
						accessor: 'category',
						resizable: false
					},
					{
						Header: 'Actions',
						accessor: 'id',
						sortable: false,
						resizable: false,
						Cell: row => (
							<div>
							

								<button
									className="contact-button call"
									onClick={() => {
										this.props.dispatch(dialClient(this.props.client[row.index]));
									}}
								>
									<span>Call</span>
								</button>
							</div>
						)
					},
				],
				stats: [
					{
						Header: '',
						accessor: 'photo',
						sortable: false,
						Cell: props => (
							<span className="avatar">
								<img
									className="table-cell-photo"
									alt="contactImage"
									src={props.value}
								/>
							</span>
						),
						width: 60,
						resizable: false
					},

					{
						Header: "Name",
						accessor: "fullName",
						resizable: false

					},

					{
						Header: "Company",
						accessor: "company",
						resizable: false
					},
					{
						Header: "Phone Number",
						id: "phoneNumber",
						accessor: "phoneNumber",
						resizable: false
					},

					{
						Header: "Billed",
						accessor: "billed",
						resizable: false
					},
					{
						Header: "Unpaid",
						accessor: "unpaid",
						resizable: false
					}

				]
			}



			return (
				<div>
					<header className="app-header" role="banner">
						<Link to="/">
							<div className="logo">
								<img
									className="logo-larger"
									src={mainLogo}
									alt="ContactMEter"
								/>
							</div>
						</Link>

						<div className="header-profile">
							<Link to="/">
								<span className="header-profile-user">Howdy</span>
							</Link>
						</div>
					</header>
					<div className="app-container">
						<section id="sub-nav">
							<div className="sub-nav">
								<div className="sub-nav-row">
									<div className="contact-search">
										<span>⌕</span>
										<input
											className="search"
											type="search"
											name="searchBox"
											value={this.state.searchTerm}
											onChange={e =>
												this.setState({ searchTerm: e.target.value })
											}
											placeholder="Search by name"
										/>
									</div>
									<div className="add-contact">
										
										<button
											className="add-contact-button"
											onClick={() => this.toggleAddClientForm()}
										>
											+ Add Contact{' '}
										</button>
									</div>
								</div>
							</div>
						</section>

						<section className="contacts">
							<div className="section-heading-container">
							<span className="section-heading">Your Clients</span>
							<select value={this.state.view} onChange={e => this.toggleView(e)} className="contacts-dropdown">
											<option value="clients">Contacts</option>
											<option value="stats">Stats</option>
										</select>
										
										</div>
							<div className="section-container">
								<ReactTable
									data={clients}
									columns={clientColumns[this.state.view]}
									defaultSorted={[{ id: 'fullName', desc: false }]}
									getTdProps={() => ({
										style: {
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											borderTop: '0px solid gainsboro',
											borderRight: '0px solid rgba(0,0,0,0) !important'
										}
									})}
									getTrProps={() => ({
										className: 'default-table-row'
									})}
									getTheadProps={() => ({
										className: 'default-table-header'
									})}
									getTheadThProps={() => ({
										className: 'default-table-headers'
									})}
									getTrGroupProps={() => ({
										className: 'default-table-rows'
									})}
									defaultPageSize={100}
									showPageSizeOptions={true}
									showPagination={false}
									className="default-table"
									pageSizeOptions={[5, 10, 20, 25, 50, 100]}
									minRows={0}
								/>
							</div>
						</section>
					</div>
				</div>
			);
		} else if (this.state.adding) {
			return (
				<div className="topFormContainer noLine">
					<AddClient toggle={() => this.toggleAddClientForm()} />
				</div>
			);
		} else if (this.state.editing) {
			return (
				<div className="topFormContainer noLine">
					<EditClient
						initialValues={this.state.editingClient}
						toggle={() => this.toggleEditClientForm()}
					/>
				</div>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = state => {

	// const { currentUser } = state.auth;
	return {
		// username: state.auth.currentUser.username,
		// name: `${currentUser.firstName} ${currentUser.lastName}`,
		client: state.client.data,
		// protectedData: state.protectedData.data
		loading: state.client.loading


	};
};

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));

export default requiresLogin()(connect(mapStateToProps)(Clients));
