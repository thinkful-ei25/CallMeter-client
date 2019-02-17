import React from 'react'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'; 
import { refreshAuthToken, clearAuth } from '../../actions/index.actions';
import { RequiresLogin} from '../_utils/index._utils'; 
import { clearAuthToken } from '../../_utils/index.utils'; 
import { AppHeader, Menu } from '../navigation/index.navigation';
import { Home, Contacts, Settings, Invoices, IndividualContact, Calls } from '../../pages/index.pages';  
import { DialerApp} from '../../components/browserPhone/index.browserPhone';
import { API_BASE_URL } from '../../config'; 
import SetupContainer from './SetupContainer'
import '../../styles/Contacts.css'; 

export class AppContainer extends React.Component{ 

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // console.log('hitting route');
      // console.log(prevProps);
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // console.log('hitting other route');
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    return fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${this.props.authToken}`
      }
    })
    .then(() => { 
      this.stopPeriodicRefresh();
    })
    .catch(err => { 
      // console.log('err', err); 
    }); 
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
        <Menu />
              <Route exact path='/app' component={Home} />
              <Route exact path='/app/contacts' component={ Contacts } />
              <Route exact path='/app/settings' component={ Settings } />
              <Route exact path="/app/calls" component={ Calls } />
              <Route exact path="/app/invoices" component={Invoices} />
              <Route exact path="/app/contacts/:clientId" component={IndividualContact} />
              <Route exact path="/app/setup" component={SetupContainer} />
              {(this.props.capabilityToken) ? <DialerApp capabilityToken={this.props.capabilityToken} />  : ''}

      </div>
    ); 
  }
}

const mapStateToProps = (state, props) => {    
  return ({
    authToken: state.auth.authToken, 
    isTutorialCompleted: state.auth.isTutorialCompleted,
    capabilityToken : state.auth.capabilityToken, 
    organizationName : state.auth.currentUser.organizationName,
    loading : state.auth.loading, 
    loggedIn: state.auth.currentUser !== null
  }); 
}

export default RequiresLogin()(withRouter(connect(mapStateToProps)(AppContainer)));