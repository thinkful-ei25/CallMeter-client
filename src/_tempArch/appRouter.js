// 'use strict';
import React from 'react';
import { Route } from 'react-router-dom';
import MakeCall from './dashboard/MakeCall';
import Invoices from './dashboard/Invoices';
import NavBar from '../components/dashboard/navbar/Navbar';
import Clients from './dashboard/Clients/Clients';
import ContactPage from './contactPage/contactPage';
import Stats from './dashboard/Stats';
import AppHeader from './AppHeader';
import DialerApp from './browserCall/DialerApp';

import FormContainer from '../components/forms/FormContainer';
import GlobalDialer from './dashboard/GlobalDialer';

const DashboardRouter = (
  <div>
     <AppHeader />
    <div className="app-container">
      <Route exact path="/clients" component={Clients} />
      <section id="contacts">
        <div className="section-container">
          <Route path="/dashboard" component={GlobalDialer} />
          <Route exact path="/dashboard" component={Stats} />
          <Route exact path="/dashboard/setup" component={FormContainer} />
          <Route exact path="/dashboard/stats" component={Stats} />
          <Route exact path="/dashboard/call" component={MakeCall} />
          <Route exact path="/dashboard/invoices" component={Invoices} />
          <Route exact path="/clients/:clientId" component={ContactPage} />
          <button onClick={() => this.logOut()}>LOG OUT</button>
          <NavBar />
        </div>
      </section>
    </div>
  </div>
);

export default DashboardRouter;
