import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          pokemonArray: []
      }
  }
  render() {
    return(
    <div>
      <div className="dashboard topnavContainer">
          <div className="dashboard-username topnav">
              <Link to="/dashboard/stats">Stats</Link>
          </div>
          <div className="dashboard-name topnav"><Link to="/dashboard/invoices">Invoices</Link></div>
          <div className="dashboard-protected-data topnav">
              <Link to="/dashboard/call">Make Calls</Link>
          </div>
          <div className="dashboard-protected-data topnav">
              <Link to="/dashboard/clients">Clients</Link>
          </div>
      </div>
    </div>
    )

  }
}
const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
      //username: state.auth.currentUser.username,
      //name: `${currentUser.firstName} ${currentUser.lastName}`,
      protectedData: state.protectedData.data
  };
};

export default connect(mapStateToProps)(Navbar);