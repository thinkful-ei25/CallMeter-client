import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadAuthToken } from './_utils/index.utils';
import { setAuthToken, refreshAuthToken } from './actions/index.actions';
import rootReducer from './reducers/index.reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

const authToken = loadAuthToken();
if (authToken) {
	const token = authToken;
	store.dispatch(setAuthToken(token));
	store.dispatch(refreshAuthToken());
}

export default store;
