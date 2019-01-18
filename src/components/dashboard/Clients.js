import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchClients } from '../../actions/client';
import './dashboard.css'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import AddClient from './AddClient'




export class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adding: false
        }
    }

    componentDidMount() {

        this.props.dispatch(fetchClients());

    }


    toggleAddClientForm() {
        this.setState({ adding: !this.state.adding })
        this.props.dispatch(fetchClients())
    }



    render() {



        if (this.props.client && !this.state.adding) {
            return (
                <div className="invoicesTable">
                    <h1>Clients</h1>
                    <button onClick={() => this.toggleAddClientForm()}>Add Client</button>
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
                <AddClient toggle={() => this.toggleAddClientForm()}/>
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

export default connect(mapStateToProps)(Clients);