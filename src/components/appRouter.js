// 'use strict';
import React from 'react';
import { Route } from 'react-router-dom';
import Stats from './dashboard/Stats';
import MakeCall from './dashboard/MakeCall';
import Invoices from './dashboard/Invoices';
import NavBar from '../components/dashboard/navbar/Navbar';
import Clients from './dashboard/Clients/Clients';
import Dashboard from './dashboard/dashboard';
import ContactPage from './contactPage/contactPage';
import FormContainer from '../components/forms/FormContainer';

const AppRouter = () => (
  <div>
      <Route path="/setup" component={FormContainer} />  
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/stats" component={Stats} />
      <Route exact path="/dashboard/call" component={MakeCall} />
      <Route exact path="/dashboard/invoices" component={Invoices} />
      <Route exact path="/dashboard/clients" component={Clients} />
      <Route exact path="/clients/:clientId" component={ContactPage} /> 
      
      <NavBar />
  </div>
);

export default AppRouter;
