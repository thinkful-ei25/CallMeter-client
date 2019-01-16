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

    render() {
        const data = makeData();
        return (
          <div>
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "Company Name",
                  columns: [
                    {
                      Header: "Contact Name",
                      accessor: "firstName"
                    },
                    {
                      Header: "Last Name",
                      id: "lastName",
                      accessor: d => d.lastName
                    }
                  ]
                },
                {
                  Header: "Info",
                  columns: [
                    {
                      Header: "Calls",
                      accessor: "age"
                    },
                    {
                      Header: "Minutes",
                      accessor: "status"
                    }
                  ]
                },
                {
                  Header: 'Stats',
                  columns: [
                    {
                      Header: "Visits",
                      accessor: "visits"
                    }
                  ]
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
            <br />
            <Tips />
            <Logo />
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

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));

export default connect(mapStateToProps)(Invoices);