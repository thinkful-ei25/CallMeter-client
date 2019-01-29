import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
// import AppContainer from './components/containers/AppContainer';
import {LandingPage, FormContainer} from './pages/index.pages';

export class Root extends React.Component {

  render() {
    return (
      <Switch>
        {/* <Route path='/app' component={AppContainer} /> */}
        <Route exact path ='/' component={LandingPage} />
        {/* <Route path = '/' component={FormContainer} /> */}
      </Switch>
    );
  }
}

export default withRouter(Root);
