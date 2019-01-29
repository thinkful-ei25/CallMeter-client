import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RequiresLogin } from '../components/_utils/index._utils';
import { fetchClients, setClient, dialClient } from '../actions/index.actions';
import ReactTable from 'react-table';
import AddClient from '../components/contacts/index.contacts';
import { SubNav } from '../components/navigation/index.navigation'; 
import '../styles/Contacts.css';
import 'react-table/react-table.css';

export class Clients extends React.Component {
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
    console.log(this.state);
  }

  setClient(id) {
    console.log('id in setClient', id);
    this.props.dispatch(setClient(id));
  }

  setSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    if (this.props.loading) {
      return <div>loading...</div>;
    }

    if (
      Array.isArray(this.props.client) &&
      !this.state.adding
    ) {
      let clients = this.props.client;
      // console.log('clients:', clients);
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
          <div className="app-container">
            <SubNav
              toggleAddClientForm={() => this.toggleAddClientForm()}
              setSearchTerm={(e) => this.setSearchTerm(e)}
              searchTerm={this.state.searchTerm} />
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

    loading: state.client.loading


  };
};

export default RequiresLogin()(connect(mapStateToProps)(Clients));
