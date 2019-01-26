// 'use strict'; 
import React from 'react'; 
import { Route } from 'react-router-dom'; 

import LandingPage from '../components/landingPage/LandingPage';
import Register from '../components/forms/register/Register'; 
import SetupPhone from '../components/setupPhone/SetupPhone';
import Login from '../components/forms/login/Login'; 
import Stats from './dashboard/Stats'; 
import MakeCall from './dashboard/MakeCall'; 
import Invoices from './dashboard/Invoices'; 
import navBar from '../components/dashboard/navbar/Navbar'; 
import Clients from './dashboard/Clients/Clients'; 
import Dashboard from './dashboard/dashboard';
import Contacts from './contactPage/contactPage'; 
import Phone from './contactPage/phone'
import SetupModal from './accountModal/SetupModal';

const AppRouter = () => (
  <div> 
    <Route path='/setup' component={SetupModal} />
    <Route path='/login' component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/" component={LandingPage} />
    <Route path="/dashboard" component={navBar} />
    <Route path="/dashboard" component={Phone}/>
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/setupPhone" component={SetupPhone} />
    <Route exact path ="/dashboard/stats" component={Stats} />
    <Route exact path="/dashboard/call" component={MakeCall} />
    <Route exact path="/dashboard/invoices" component={Invoices} />
    <Route exact path="/dashboard/clients" component={Clients} />
    <Route exact path="/dashboard/contacts" component={Contacts}/>
  </div>
);

export default AppRouter; 