import React from 'react';
import { connect } from 'react-redux';
import { RequiresLogin } from '../components/_utils/index._utils';
import { Tips } from '../_utils/index.utils';
import { API_BASE_URL} from '../config'; 

import ReactTable from "react-table";
import '../styles/Dashboard.css'; 
import 'react-table/react-table.css'

export class Invoices extends React.Component {
  constructor(props){ 
    super(props); 
    this.state = { 
      invoices : null
    }
  }

  componentDidMount() {
    fetch(`${API_BASE_URL}/invoices`, 
      { 
        method: 'GET',
        headers: {
          // Provide our auth token as credentials
          Authorization: `Bearer ${this.props.authToken}`
      }
    })
    .then(res => { 
      return res.json(); 
    })
    .then(invoices => { 
      invoices.forEach(invoice => {
        invoice.invoiceAmount = invoice.invoiceAmount.toFixed(2); 
      });

      this.setState({invoices}); 
    })
    .catch(err => { 
      console.log('err', err); 
    }); 
  }

  render() {
    if (this.state.invoices){ 
      return (
        <div className="invoicesTable">
          <h1>Invoices</h1>
          <ReactTable
            data={this.state.invoices}
            columns={[
              {
                Header: "Company",
                accessor: "company"
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
                accessor: "calls"
              },
              {
                Header: "Seconds",
                accessor: "seconds"
              },
              {
                Header: "Total Billed",
                accessor: "invoiceAmount",
              },
  
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
          <Tips />
        </div>
       );
    }
    else { 
      return ( 
        <div>Loading...</div>
      ); 
    }
  }
}

const mapStateToProps = state => {
  return {
    authToken : state.auth.authToken
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Invoices));
