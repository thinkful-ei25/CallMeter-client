import React from 'react';
import ReactTable from 'react-table';
import '../../styles/Calls.css'
import 'react-table/react-table.css';

export default function RecentCalls(props) {

  let callColumns = [
    {
      Header: 'Date',
      accessor: 'date',
      resizable: false
    },
    {
      Header: 'Direction',
      accessor: 'direction',
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
  return (
    <div className="callsHeaderContainer">
      
      <div className="section-container">
        <ReactTable
          data={props.calls}
          columns={callColumns}

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
    </div>
  )
}

