import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import callStatsReducer from './callStats.reducer';
import clientReducer from './client.reducer';
import dialerReducer from './dialer.reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: authReducer,
  callStats: callStatsReducer,
  client: clientReducer,
  dialer: dialerReducer,
  form: formReducer
});

export default rootReducer;
