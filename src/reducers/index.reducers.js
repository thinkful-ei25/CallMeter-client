import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import callStatsReducer from './callStats.reducer';
import clientReducer from './client.reducer';
import dialerReducer from './dialer.reducer';


const rootReducer = combineReducers({
  authReducer, callStatsReducer, clientReducer, dialerReducer
});

export default rootReducer;
