import React from 'react';
import ReactTable from 'react-table';
import '../../styles/Calls.css'
import 'react-table/react-table.css';
import {inbound, outbound } from '../../images/illustrations/index.illustrations';


function formatDate(date) {
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

export default function RecentCalls(props) {

  let directionImg = {
    inbound: inbound,
    outbound: outbound,
    incoming: inbound,
    outgoing: outbound
  }


  const callColumns = [
    {
      Header: '',
      accessor: 'direction',
      resizable: false,
      Cell: row => (
        <div className="direction-icon">
          <img src={directionImg[row.value]} alt="phone call direction" className="direction-img-small" />
        </div>
      ),
      width: 60
    },
    {
      Header: 'Date',
      accessor: 'date',
      resizable: false,
      Cell: row => formatDate(row.value),
      width: 120
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
  return (
      
      <div>
        <ReactTable
          data={props.calls}
          columns={callColumns}
          defaultPageSize={5}
          showPagination={false}
          className="default-table"
          minRows={0}
        />
      </div>

  )
}

