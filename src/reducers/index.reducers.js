import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import callStatsReducer from './callStats.reducer';
import clientReducer from './client.reducer';


const rootReducer = combineReducers({
  authReducer, callStatsReducer, clientReducer
});

export default rootReducer;
