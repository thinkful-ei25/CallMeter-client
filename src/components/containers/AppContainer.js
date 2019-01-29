import React from 'react'; 
import { connect } from 'react-redux';
import { refreshAuthToken, clearAuth } from '../../actions/index.actions';
import { RequiresLogin} from '../_utils/index._utils'; 
import { clearAuthToken } from '../../_utils/index.utils'; 
import { AppHeader, Menu } from '../navigation/index.navigation'; 
export class AppContainer extends React.Component{ 

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) return;
    clearInterval(this.refreshInterval);
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render(){ 
    return (
      <div>
        <AppHeader name={this.props.organizationName} />
        <div className="app-container">
          {/* <Route exact path="/clients" component={Clients} /> */}
          <section id="contacts">
            <div className="section-container">
              {/* <Route path="/dashboard" component={GlobalDialer} />
              <Route exact path="/dashboard" component={Stats} />
              <Route exact path="/dashboard/setup" component={FormContainer} />
              <Route exact path="/dashboard/stats" component={Stats} />
              <Route exact path="/dashboard/call" component={MakeCall} />
              <Route exact path="/dashboard/invoices" component={Invoices} />
              <Route exact path="/clients/:clientId" component={ContactPage} /> */}
              <button onClick={() => this.logOut()}>LOG OUT</button>
              <Menu />
            </div>
          </section>
        </div>
      </div>
    ); 
  }
}

const mapStateToProps = (state, props) => { 
  console.log('app container', state); 
  return ({
    organizationName : state.auth.currentUser.organizationName, 
    loading : state.auth.loading, 
    loggedIn: state.auth.currentUser !== null
  }); 
}

export default RequiresLogin()(connect(mapStateToProps)(AppContainer));