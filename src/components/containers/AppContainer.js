import React from 'react'; 
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'; 
import { refreshAuthToken, clearAuth } from '../../actions/index.actions';
import { RequiresLogin} from '../_utils/index._utils'; 
import { clearAuthToken } from '../../_utils/index.utils'; 
import { AppHeader, Menu, SubNav } from '../navigation/index.navigation';
import { Home, Contacts, Calls, IndividualContact } from '../../pages/index.pages';  
import { DialerApp} from '../../components/browserPhone/index.browserPhone';
import '../../styles/Contacts.css'; 

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
              <Route exact path="/app" component={Home} />
              <Route exact path="/app/contacts" component={ Contacts } />
              <Route exact path="/app/calls" component={ Calls } />
              <Route exact path="/app/contacts/:clientId" component={IndividualContact} />
              {/* <Route exact path="/app/setup" component={FormContainer} /> */}
              {/* <Route exact path="/app/invoices" component={Invoices} /> */}
              {/* <Route exact path="/app/clients/:clientId" component={ContactPage} /> */}
              <button onClick={() => this.logOut()}>LOG OUT</button>
              {(this.props.capabilityToken) ? <DialerApp capabilityToken={this.props.capabilityToken} />  : ''}
              <Menu />
      </div>
    ); 
  }
}

const mapStateToProps = (state, props) => { 
  console.log('app container', state);
   
  return ({
    capabilityToken : state.auth.capabilityToken, 
    organizationName : state.auth.currentUser.organizationName, 
    loading : state.auth.loading, 
    loggedIn: state.auth.currentUser !== null
  }); 
}

export default RequiresLogin()(connect(mapStateToProps)(AppContainer));