import React from 'react';
import { connect } from 'react-redux';
import { RequiresLogin } from '../components/_utils/index._utils';
import ReactTable from 'react-table';
import { defaultProfilePictureArray } from '../images/profileImages/profileImages';
import { fetchAllCalls } from '../actions/index.actions';
import '../styles/Calls.css';
import { SubNav } from '../components/navigation/index.navigation';
import { inbound, outbound } from '../images/illustrations/index.illustrations';
import GettingStarted from '../components/GettingStarted';
import { computerPhone } from '../images/illustrations/index.illustrations';

export class Calls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureIterator: 0,
      directionImg: {
        inbound: inbound,
        outbound: outbound,
        incoming: inbound,
        outgoing: outbound
      }
    };
  }

  componentDidMount() {
    // console.log('COMPONENT MOUNTED');
    this.props.dispatch(fetchAllCalls());
  }

  // returnPictureFromArray() {
  //   const iterator = Math.floor(Math.random() * 5);
  //   const image = defaultProfilePictureArray[iterator];

  //   return image;
  // }

  formatPhoneNumber(num) {
    if (num === 'deleted') return '-';
    let areaCode = num.substring(2, 5);
    let firstThree = num.substring(5, 8);
    let lastFour = num.substring(num.length - 4);
    let number = '(' + areaCode + ')' + ' ' + firstThree + '-' + lastFour;
    return number;
  }

  formatTime(time) {
    if (time === 0) return '-';
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return minutes + ' m ' + seconds + ' s';
  }

  formatDate(date) {
    if (!date) return '-';
    let _date = new Date(date);
    let year = _date.getFullYear();
    let month = _date.getMonth();
    let dt = _date.getDate();
    let months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12'
    ];
    if (dt < 10) dt = '0' + dt;

    return months[month] + '/' + dt + '/' + year;
  }

  callColumns = [
    {
      Header: '',
      accessor: 'direction',
      resizable: false,
      Cell: row => (
        <div className="direction-icon">
          <img
            src={this.state.directionImg[row.value]}
            alt="phone call direction"
            className="direction-img-small"
          />
        </div>
      ),
      width: 60
    },
    {
      Header: '',
      accessor: 'photo',
      resizable: false,
      Cell: props => (
        <span className="avatar">
          <img
            className="table-cell-photo"
            alt="contactImage"
            src={props.value || ''}
          />
        </span>
      ),
      width: 80
    },
    {
      Header: 'Name',
      accessor: 'contactName',
      resizable: true,
      width: 230
    },
    {
      Header: 'Company',
      accessor: 'company',
      resizable: true,
      width: 290
    },
    {
      Header: 'Date',
      id: 'date',
      accessor: 'date',
      resizable: false,
      Cell: row => this.formatDate(row.value),
      width: 150
    },
    {
      Header: 'Phone Number',
      id: 'phoneNumber',
      accessor: 'phoneNumber',
      resizable: false,
      Cell: row => this.formatPhoneNumber(row.value),
      width: 190
    },
    {
      Header: 'Time',
      accessor: 'length',
      resizable: false,
      Cell: row => this.formatTime(row.value),
      width: 100
    },
    {
      Header: 'Billable',
      accessor: 'billable',
      resizable: false,
      width: 100,
      Cell: row => 'true'
    },
    {
      Header: '$ Amount',
      accessor: 'estimatedBilling',
      resizable: false
    }
  ];

  render() {
    // console.log(this.props);
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
                    text="How to Make a Call"
                    subtext="Use the navigation in the lower right corner to access your contacts and make a call!"
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
  // console.log(state.callStats);
  return {
    calls: state.callStats.calls,
    loading: state.callStats.loading
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Calls));
