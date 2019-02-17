import React from 'react';
import { connect } from 'react-redux';
import { RequiresLogin } from '../components/_utils/index._utils';
import { Tips } from '../_utils/index.utils';
import { API_BASE_URL } from '../config';
import ReactTable from 'react-table';
import '../styles/Dashboard.css';
import 'react-table/react-table.css';
import { graphMoney } from '../images/illustrations/index.illustrations';
import { SubNav } from '../components/navigation/index.navigation';
import GettingStarted from '../components/GettingStarted';

export class Invoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: null
    };
  }

  sendInvoice(invoice){
    // console.log('invoice', invoice); 

    fetch(`${API_BASE_URL}/invoices/email`, {
      method: 'POST',
      body: JSON.stringify({
        'calls': invoice.calls, 
        'invoiceAmount' : invoice.invoiceAmount, 
        'company': invoice.company,
        'firstName': invoice.firstName,
        'lastName': invoice.lastName,
        'hourlyRate': invoice.hourlyRate,
        'email' : invoice.email
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.authToken}`
      }
    })
      .then(res => {
        
        return res.json();
      })
      .then(email => {
        // console.log('email', email); 
      })
      .catch(err => {
        // console.log('err', err);
      });

  }

  componentDidMount() {
    fetch(`${API_BASE_URL}/invoices`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.authToken}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(invoices => {
        invoices.forEach(invoice => {
          invoice.invoiceAmount = (invoice.invoiceAmount) ? invoice.invoiceAmount.toFixed(2) : '0.00';
          //SECONDS ARE MINUTES
          invoice.seconds = (invoice.seconds / 60).toFixed(2);
        });
        this.setState({ invoices });
      })
      .catch(err => {
        // console.log('err', err);
      });
  }

  render() {
    const invoiceColumns = [
      {
        Header: 'Company',
        accessor: 'company'
      },
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        id: 'lastName',
        accessor: 'lastName'
      },
      {
        Header: 'Calls',
        accessor: 'calls'
      },
      {
        Header: 'Minutes',
        accessor: 'seconds'
      },
      {
        Header: 'Total Billed',
        accessor: 'invoiceAmount'
      }, 
      {
        Header: 'Actions',
        accessor: 'id',
        sortable: false,
        resizable: false,
        Cell: row => (
          <div
            className="call-button"
            onClick={() => {
              this.sendInvoice(this.state.invoices[row.index]); 
            }}
          >
            <p className="button-text">Send Invoice</p>
            <div className="button-icon-div">
              <img
                // src={callIcon}
                className="button-icon"
                alt="call contact"
              />
            </div>
          </div>
        )
      }
    ];

    if (this.state.invoices) {
      return (
        <div>
          <div className="app-container">
            <SubNav
              toggleAddClientForm={() => this.toggleAddClientForm()}
              page={'invoices'}
              setSearchTerm={e => this.setSearchTerm(e)}
              searchTerm={this.state.searchTerm}
              toggleView={e => this.toggleView(e)}
              view={this.state.view}
            />
            {this.state.invoices.length < 1 ? (
              <div>
                <section className="contacts">
                  <div className="section-container">
                    <GettingStarted
                      title="We Wouldn't Be CallMeter without Invoices"
                      image={graphMoney}
                      text="Clients + Calls = $$$$"
                      subtext="See you invoices listed here. As you make calls the data will populate and allow you to send away!"
                    />
                  </div>
                </section>
              </div>
            ) : (
              <div>
                <div className="title-bar">
                  <header className="app-page-header" role="presentation">
                    <div className="app-header-inner" role="banner">
                      <div className="app-header-title">
                        <h1 className="app-heading">Contacts</h1>
                      </div>
                    </div>
                  </header>
                </div>
                <section className="contacts">
                  <div className="section-container">
                    <ReactTable
                      data={this.state.invoices}
                      columns={invoiceColumns}
                      defaultSorted={[{ id: 'company', desc: false }]}
                      defaultPageSize={100}
                      showPagination={false}
                      className="-highlight -curser-pointer"
                      minRows={0}
                    />
                    <br />
                    <Tips />
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Invoices));
