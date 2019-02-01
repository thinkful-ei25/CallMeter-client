import React from 'react';
import { connect } from 'react-redux';
import { RequiresLogin } from '../components/_utils/index._utils';
import ReactTable from 'react-table';
import {defaultProfilePictureArray} from '../images/profileImages/profileImages'
import { fetchAllCalls } from '../actions/index.actions';
import '../styles/Calls.css';
import GettingStarted from '../components/GettingStarted';
import { computerPhone } from '../images/illustrations/index.illustrations';
import { SubNav } from '../components/navigation/index.navigation';

export class Calls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureIterator : 0
  }
}

  componentDidMount() {
    this.props.dispatch(fetchAllCalls());
    console.log();
  }

  returnPictureFromArray(){
    const iterator = Math.floor(Math.random() * 5);
    const image = defaultProfilePictureArray[iterator];
    
    return image;
  }


  callColumns = [
    {
      Header: 'Date',
      id: "column",
      accessor: 'date',
      resizable: false
    },
    {
      Header: 'Direction',
      accessor: 'direction',
      resizable: false
    },

    {
      Header: 'Photo',
      accessor: 'photo',
      resizable: false,
      Cell: (props, column) => (
        <span className="avatar">
          <img
            className="table-cell-photo"
            alt="contactImage"
            src={props.value || this.returnPictureFromArray()}
          />
        </span>
      )
    },
    {
      Header: 'Contact Name',
      accessor: 'contactName',
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
      Header: 'Length',
      accessor: 'length',
      resizable: false
    },
    {
      Header: 'Billable',
      accessor: 'billable',
      resizable: false
    },
    {
      Header: 'Estimated Billing',
      accessor: 'estimatedBilling',
      resizable: false
    }
  ];

  render() {
    console.log(this.props.loading);
    if (this.props.loading) {

      return <div>loading...</div>;
    }
    return (
      <div>
        <div className="app-container">
          <SubNav
            page={'calls'}
            toggleAddClientForm={() => this.toggleAddClientForm()}
            setSearchTerm={e => this.setSearchTerm(e)}
            searchTerm={this.state.searchTerm}
            toggleView={e => this.toggleView(e)}
            view={this.state.view}
          />
          {this.props.calls.length < 1 ? (
            <div>
              <section className="contacts">
                <div className="section-container">
                  <GettingStarted
                    title="It's Time To Make Your First Call!"
                    image={computerPhone}
                    text="How a Make a Call"
                    subtext="Dummy text here. horray hip horray hip hop!"
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
                      <h1 className="app-heading">All Calls</h1>
                    </div>
                  </div>
                </header>
              </div>
              <section className="contacts">
                <div className="section-container">
                  <ReactTable
                    data={this.props.calls}
                    columns={this.callColumns}
                    defaultSorted={[{ id: 'date', desc: false }]}
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
  }
}

const mapStateToProps = state => {
  return {
    calls: state.callStats.calls,
    loading: state.callStats.loading
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Calls));
