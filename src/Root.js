import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { AppContainer, FormContainer }  from './components/containers/index.containers';
import { LandingPage } from './pages/index.pages';

export class Root extends React.Component {

  render() {
    return (
      <Switch>
        <Route path='/app' component={ AppContainer } />
        <Route exact path ='/' component={ LandingPage } />
        <Route path = '/' component={FormContainer} />
      </Switch>
    );
  }
}

export default withRouter(Root);
