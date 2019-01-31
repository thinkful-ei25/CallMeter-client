import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import anime from 'animejs';
import '../styles/IndividualContact.css';
import {
  fetchOneClient,
  fetchClientCalls,
} from '../actions/index.actions';
import {
  DeleteContact,
  EditContact,
  AddContact,
  RecentCalls,
  IndividualContactBody
} from '../components/contacts/index.contacts';
import {
  saveClientId,
  loadClientId
} from '../_utils/index.utils';
import { SubNav } from '../components/navigation/index.navigation';

export class ContactPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      action: 'view',
      view: 'all'
    };
  }

  componentDidMount() {
    if (!this.props.clientId) {
      this.props.dispatch(fetchOneClient(loadClientId()));
      this.props.dispatch(fetchClientCalls(loadClientId()));
    } else {
      this.props.dispatch(fetchOneClient(this.props.clientId));
      this.props.dispatch(fetchClientCalls(this.props.clientId));
      saveClientId(this.props.clientId);
    }
  }

  onClickExample(e) {
    const element = document.getElementsByClassName('fixedPokePhone')[0];
    element.style.visibility = 'visible';
    anime({
      targets: '.fixedPokePhone',
      opacity: 1,
      duration: 4500
    });
  }

  onExitExample(e) {
    const element = document.getElementsByClassName('fixedPokePhone')[0];
    anime({
      targets: '.fixedPokePhone',
      opacity: 0,
      duration: 1000,
      complete: function() {
        element.style.visibility = 'hidden';
      }
    });
  }

  setAction(e) {
    this.setState({
      action: e.target.value
    });
  }

  toggleView(e) {
    this.setState({
      view: e.target.value
    });
  }

  render() {
    let invoicesHTML;
    const client = this.props.client;
    if (client.invoice) {
      if (client.invoice.length) {
        invoicesHTML = client.invoice.map((invoice, index) => {
          return (
            <div key={index} className="individualInvoice">
              <h4 className="invoiceStatus stackedElements">Status (coming)</h4>
              <h2 className="stackedElements">
                {invoice.month + ' ' + invoice.year} Invoice ${invoice.amount}
              </h2>
              <p className="stackedElements">
                Sent{' '}
                {invoice.sentDate +
                  ' - ' +
                  (invoice.paid ? 'Paid ' + invoice.paidDate : 'Unpaid')}
              </p>
            </div>
          );
        });
      }
    }

    let pageView = this.state.view;

    if (this.props.loading) {
      return <div>loading...</div>;
    } else if (this.state.action === 'view') {
      return (
        <div>
          <div className="app-container">
            <SubNav
              page={'individual-contact'}
              toggleView={e => this.toggleView(e)}
              view={this.state.view}
              handleAction={e => this.setAction(e)}
              action={this.state.action}
            />
            <div className="title-bar">
              <header className="app-page-header" role="presentation">
                <div className="app-header-inner" role="banner">
                  <div className="app-header-title">
                    <h1 className="app-heading">
                      {client.firstName + ' ' + client.lastName}
                    </h1>
                    <p>{client.category}</p>
                  </div>
                </div>
              </header>
            </div>
          </div>

          <section className="contacts">
            <div className="section-container">
              {pageView === 'all' ? (
                <IndividualContactBody
                  client={this.props.client}
                  calls={this.props.calls}
                  invoicesHTML={invoicesHTML}
                  setView={view => this.setState({ view: view })}
                />
              ) : pageView === 'calls' ? (
                <RecentCalls calls={this.props.calls} />
              ) : (
                <div>Invoices</div>
              )}
            </div>
          </section>
        </div>
      );
    } else if (this.state.action === 'editing') {
      return (
        <div className="topFormContainer noLine">
          <EditContact
            initialValues={this.props.client}
            toggle={() => this.setState({ action: 'view' })}
          />
        </div>
      );
    } else if (this.state.action === 'deleting') {
      return (
        <div className="deleteClientContainer">
          <DeleteContact
            id={this.props.clientId}
            name={
              this.props.client.firstName + ' ' + this.props.client.lastName
            }
            dispatch={this.props.dispatch}
            redirect={() => this.setState({ action: 'redirecting' })}
            toggle={() => this.setState({ action: 'view' })}
          />
        </div>
      );
    } else if (this.state.action === 'redirecting') {
      return <Redirect to="/app/contacts" />;
    } else if (this.state.adding) {
      return (
        <div className="topFormContainer noLine">
          <AddContact toggle={() => this.toggleAddClientForm()} />
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    client: state.client.data,
    clientId: state.client.clientId,
    loading: state.client.loading,
    calls: state.client.calls
  };
};

export default withRouter(connect(mapStateToProps)(ContactPage));