'use strict'; 
import React from 'react'; 
import { Route } from 'react-router-dom'; 

import LandingPage from '../components/landingPage/LandingPage';
import RegistrationPage from '../components/registration/Registration'; 
import SetupPhone from '../components/setupPhone/SetupPhone';
import Login from '../components/logIn/LogIn'; 
import Stats from './dashboard/Stats'; 
import MakeCall from './dashboard/MakeCall'; 
import Invoices from './dashboard/Invoices'; 
import navBar from '../components/dashboard/navbar/Navbar'; 
import Clients from './dashboard/Clients/Clients'; 
import Dashboard from './dashboard/dashboard';
import Contacts from './contactPage/contactPage'; 

const AppRouter = () => (
  <div> 
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/register" component={RegistrationPage} />
    <Route path="/dashboard" component={navBar} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/setupPhone" component={SetupPhone} />
    <Route exact path="/login" component={Login} />
    <Route exact path ="/dashboard/stats" component={Stats} />
    <Route exact path="/dashboard/call" component={MakeCall} />
    <Route exact path="/dashboard/invoices" component={Invoices} />
    <Route exact path="/dashboard/clients" component={Clients} />
    <Route exact path="/dashboard/contacts" component={Contacts}/>
  </div>
);

export default AppRouter; 