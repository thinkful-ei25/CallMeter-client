import React from 'react';
import { connect } from 'react-redux';
import { RequiresLogin } from '../components/_utils/index._utils';
import ReactTable from 'react-table';
import {defaultProfilePictureArray} from '../images/profileImages/profileImages'
import { fetchAllCalls } from '../actions/index.actions';
import '../styles/Calls.css';

import 'react-table/react-table.css';

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
      ),
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
    },
  ]

  render() {
    return (
      <div className="callsHeaderContainer">
        <h1 className="callsHeader">All Calls</h1>
        <div className="section-container">
          <ReactTable
            data={this.props.calls}
            columns={this.callColumns}

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
            className="default-table"c
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            minRows={0}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    calls: state.callStats.calls
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Calls));

