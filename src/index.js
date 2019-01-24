import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import store from './store';
import 'normalize.css'
import './index.css';
import DialerApp from './components/browserCall/DialerApp';


{/* <DialerApp />,  */}
ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App /> 
      </Router>
    </Provider>,
    document.getElementById('root')
);
