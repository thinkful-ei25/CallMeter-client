import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RequiresLogin } from '../components/_utils/index._utils';
import { fetchClients, setClient, dialClient } from '../actions/index.actions';
import ReactTable from 'react-table';
import { AddContact } from '../components/contacts/index.contacts';
import { SubNav } from '../components/navigation/index.navigation';
import { callIcon } from '../images/contact/index.contact';
import { defaultProfile } from '../images/contact/index.contact';
import {defaultProfilePictureArray} from '../images/profileImages/profileImages'
import { timeMoney } from '../images/illustrations/index.illustrations';
import GettingStarted from '../components/GettingStarted';
import '../styles/Contacts.css';
import '../styles/Tables.css';

export class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
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

  toggleView(e) {
    this.setState({ view: e.target.value });
    // console.log(this.state);
  }

  setClient(id) {
    this.props.dispatch(setClient(id));
  }

  setSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  formatPhoneNumber(num) {
    if (!num) return '-';
    let areaCode = num.substring(2, 5);
    let firstThree = num.substring(5, 8);
    let lastFour = num.substring(num.length - 4);
    let number = '(' + areaCode + ')' + ' ' + firstThree + '-' + lastFour;
    return number;

  }

  returnPictureFromArray(){
    const iterator = Math.floor(Math.random() * 5);
    const image = defaultProfilePictureArray[iterator];
    
    return image;
  }

  render() {
    if (this.props.loading) {
      return <div>loading...</div>;
    }

    if (Array.isArray(this.props.client) && !this.state.adding) {
      let clients = this.props.client;
      clients.forEach(row => {
        let fullName = row.firstName + ' ' + row.lastName;
        row.fullName = (
          <Link
            to={`/app/contacts/${row.id}`}
            onClick={e => this.setClient(row.id)}
          >
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
                  src={props.value || this.returnPictureFromArray()}
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
            resizable: false,
            Cell: row => this.formatPhoneNumber(row.value),
            width: 150
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
              <div
                className="call-button"
                onClick={() => {
                  this.props.dispatch(dialClient(this.props.client[row.index]));
                }}
              >
                <p className="button-text">Call</p>
                <div className="button-icon-div">
                  <img
                    src={callIcon}
                    className="button-icon"
                    alt="call contact"
                  />
                </div>
              </div>
            )
          }
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
                  src={props.value || defaultProfile}
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
            Header: 'Billed',
            accessor: 'billed',
            resizable: false
          },
          {
            Header: 'Unpaid',
            accessor: 'unpaid',
            resizable: false
          }
        ]
      };

      return (
        <div>
          <div className="app-container">
            <SubNav
              toggleAddClientForm={() => this.toggleAddClientForm()}
              page={'contacts'}
              setSearchTerm={e => this.setSearchTerm(e)}
              searchTerm={this.state.searchTerm}
              toggleView={e => this.toggleView(e)}
              view={this.state.view}
            />
            {clients.length < 1 ? (
              <div>
                <section className="contacts">
                  <div className="section-container"> 
                <GettingStarted title="Getting started with Contacts" image={timeMoney} text="Add a Contact to Begin" subtext="The contact page is where you will be able to add, edit, and call your contacts directly from your browser. To get started, add a contact via the button in the top right." />
              </div>
              </section>
              </div>
            ): (
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
                    data={clients}
                    columns={clientColumns[this.state.view]}
                    defaultSorted={[{ id: 'fullName', desc: false }]}
                    defaultPageSize={100}
                    showPagination={false}
                    className="-highlight -curser-pointer"
                    minRows={0}
                  />

              </div>
            </section>
            </div>
            )}
          </div>
        </div>
      );
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
    client: state.client.data,
    loading: state.client.loading
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Contacts));
