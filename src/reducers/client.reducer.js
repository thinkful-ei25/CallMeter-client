import {
	FETCH_CLIENTS_SUCCESS,
	FETCH_CLIENTS_ERROR,
	ADD_CLIENT_SUCCESS,
	DELETE_CLIENT_SUCCESS,
	FETCH_CLIENT_REQUEST,
	SET_CLIENT,
	FETCH_CLIENT_CALLS_SUCCESS
} from '../actions/index.actions';

const initialState = {
	data: '',
  error: null, 
  outgouingClientNumber: ''
};

export default function clientReducer(state = initialState, action) {
	if (action.type === FETCH_CLIENTS_SUCCESS) {
		return Object.assign({}, state, {
			data: action.data,
			error: null,
			loading: false
		});
	} else if (action.type === FETCH_CLIENTS_ERROR) {
		return Object.assign({}, state, {
			error: action.error,
			loading: false
		});
	} else if (action.type === ADD_CLIENT_SUCCESS) {
		return Object.assign({}, state, {

		})
	} else if (action.type === DELETE_CLIENT_SUCCESS) {
		return Object.assign({}, state, {

		})
	} else if (action.type === FETCH_CLIENT_REQUEST) {
		return Object.assign({}, state, {
			error: null,
			loading: true
		})
	} else if (action.type === SET_CLIENT) {
		return Object.assign({}, state, {
			error: null,
			clientId: action.id
		})
	
  } else if (action.type === FETCH_CLIENT_CALLS_SUCCESS) {
		return Object.assign({}, state, {
			calls: action.calls
		})
	}
	return state;
}