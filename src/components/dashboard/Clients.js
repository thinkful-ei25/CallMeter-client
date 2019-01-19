import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchClients, deleteClient } from '../../actions/client';
import './dashboard.css'
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
            editingClient: null
        }
    }

    componentDidMount() {

        this.props.dispatch(fetchClients());

    }


    toggleAddClientForm() {
        this.setState({ adding: !this.state.adding })
        this.props.dispatch(fetchClients())
    }

    toggleEditClientForm() {
        this.setState({ editing: !this.state.editing })
        this.props.dispatch(fetchClients())
        console.log(this.state)
    }



    render() {



        if (this.props.client && !this.state.adding && !this.state.editing) {
            return (
                <div className="invoicesTable">

                    <h1>Clients</h1>
                    <h2><button className="addClientButton" onClick={() => this.toggleAddClientForm()}>Add Client ➕</button></h2>
                    
                    <ReactTable
                        data={this.props.client}
                        columns={[
                            {
                                Header: "First Name",
                                accessor: "firstName"
                            },
                            {
                                Header: "Last Name",
                                accessor: "lastName"
                            },
                            {
                                Header: "Company Name",
                                accessor: "company"
                            },
                            {
                                Header: "Phone Number",
                                id: "phoneNumber",
                                accessor: "phoneNumber"
                            },

                            {
                                Header: "Hourly Rate",
                                accessor: "hourlyRate"
                            },
                            {
                                Header: "Edit",
                                accessor: "id",
                                Cell: row => (
                                    <button className="navButton" onClick={() => {
                                        this.setState({
                                            editingClient: this.props.client.filter(client => row.value === client.id)[0]
                                        })

                                        this.toggleEditClientForm();

                                    }}>✎</button>
                                )
                            },
                            {
                                Header: "Delete",
                                accessor: "id",
                                Cell: row => (
                                    <button className="navButton" onClick={() => {
                                        this.props.dispatch(deleteClient(row.value))
                                            .then(this.props.dispatch(fetchClients()))
                                    }}>❌</button>
                                )
                            }


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
                <AddClient toggle={() => this.toggleAddClientForm()} />
            )
        }

        else if (this.state.editing) {
            return (

                <EditClient initialValues={this.state.editingClient} toggle={() => this.toggleEditClientForm()} />
            )
        }
        else {
            return null
        }
    }
}


const mapStateToProps = state => {
    console.log('client', state)
    const { currentUser } = state.auth;
    return {
        // username: state.auth.currentUser.username,
        // name: `${currentUser.firstName} ${currentUser.lastName}`,
        client: state.client.data,
        // protectedData: state.protectedData.data
        newClient: state.client.data.newCompany

    };
};

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));

export default requiresLogin()(connect(mapStateToProps)(Clients));