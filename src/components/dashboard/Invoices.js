import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData } from '../../actions/protected-data';
import './dashboard.css'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { makeData, Logo, Tips } from "./Utils";


export class Invoices extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }


     //         contactName: namor.generate({ words: 1, numbers: 0 }),
    // firstName: namor.generate({words: 1, numbers: 0 }),
    // lastName: namor.generate({ words: 1, numbers: 0 }),
    // numCalls: Math.floor(Math.random() * 30),
    // numMinutes: Math.floor(Math.random() * 50),
    // lastCall: Math.floor(Math.random() * 100),
    // totalBilled: Math.floor(Math.random() * 100),
    // totalUnpaid: Math.floor(Math.random() * 20)

    render() {
        const data =          
        [{ contactName: "Cardly",
            firstName: "John",
        lastName: "Card",
        numCalls: 5,
        numMinutes: 10,
        lastCall: String(new Date()),
        totalBilled: 500,
        totalUnpaid: 500}]
        return (
            <div className="invoicesTable">
                <h1>Invoices</h1>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: "Contact Name",
                            accessor: "contactName"
                        },
                        {
                            Header: "First Name",
                            accessor: "firstName"
                        },
                        {
                            Header: "Last Name",
                            id: "lastName",
                            accessor: "lastName"
                        },
                        {
                            Header: "Calls",
                            accessor: "numCalls"
                        },
                        {
                            Header: "Minutes",
                            accessor: "numMinutes"
                        },
                        {
                            Header: "Last Call",
                            accessor: "lastCall",
                            sortMethod: (a, b) => {
                                return new Date(b) - new Date(a)
                            }
                        },
                        {
                            Header: "Total Billed",
                            accessor: "totalBilled",
                            sortMethod: (a, b) => {
                                if (a.length === b.length) {
                                  return a > b ? 1 : -1;
                                }
                                return a.length > b.length ? 1 : -1;
                              }
                        },
                        {
                            Header: "Total Unpaid",
                            accessor: "totalUnpaid"
                        }
                  
        ]}
              defaultPageSize={10}
                className="-striped -highlight"
              />
            <br />
                <Tips />
                {/* <Logo /> */}
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        // username: state.auth.currentUser.username,
        // name: `${currentUser.firstName} ${currentUser.lastName}`,
        // protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Invoices));

// export default connect(mapStateToProps)(Invoices);