import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchClients } from '../../actions/client';
import './dashboard.css'
import ReactTable from "react-table";
import 'react-table/react-table.css'




export class Clients extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           adding: false
        }
    }
    
    componentDidMount() {
        this.props.dispatch(fetchClients());
    }

    


     //         contactName: namor.generate({ words: 1, numbers: 0 }),
    // firstName: namor.generate({words: 1, numbers: 0 }),
    // lastName: namor.generate({ words: 1, numbers: 0 }),
    // numCalls: Math.floor(Math.random() * 30),
    // numMinutes: Math.floor(Math.random() * 50),
    // lastCall: Math.floor(Math.random() * 100),
    // totalBilled: Math.floor(Math.random() * 100),
    // totalUnpaid: Math.floor(Math.random() * 20)

    

    render() {
        
        const data = [{firstName: "Joe", lastName: "Schmoe", company: "Apple", phoneNumber: "333-333-3333", hourlyRate: "24"}]
     
        return (
            <div className="invoicesTable">
                <h1>Clients</h1>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: "First Name",
                            accessor: "firstName"
                        },
                        {
                            Header: "Last Name",
                            accessor: "lastName"
                        },
                        {
                            Header: "Company Name",
                            accessor: "company"
                        },
                        {
                            Header: "Phone Number",
                            id: "phoneNumber",
                            accessor: "phoneNumber"
                        },

                        {
                            Header: "Hourly Rate",
                            accessor: "hourlyRate"
                        }
                        
                  
        ]}
              defaultPageSize={10}
                className="-striped -highlight"
              />
            <br />
                
                {/* <Logo /> */}
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        // username: state.auth.currentUser.username,
        // name: `${currentUser.firstName} ${currentUser.lastName}`,
        client: state.client.data
        // protectedData: state.protectedData.data
    };
};

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));

export default connect(mapStateToProps)(Clients);