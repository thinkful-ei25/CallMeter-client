import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './index.actions';


export const FETCH_CLIENT_REQUEST = 'FETCH_CLIENT_REQUEST';
export const fetchClientRequest = () => ({
	type: FETCH_CLIENT_REQUEST
});

export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const fetchClientsSuccess = data => ({
	type: FETCH_CLIENTS_SUCCESS,
	data
});

export const FETCH_CLIENT_CALLS_SUCCESS = 'FETCH_CLIENT_CALLS_SUCCESS';
export const fetchClientCallsSuccess = calls => ({
	type: FETCH_CLIENT_CALLS_SUCCESS,
	calls
})

export const FETCH_CLIENTS_ERROR = 'FETCH_CLIENTS_ERROR';
export const fetchClientsError = error => ({
	type: FETCH_CLIENTS_ERROR,
	error
});

export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
export const addClientSuccess = (data) => ({
	type: ADD_CLIENT_SUCCESS,

});

export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';
export const deleteClientSuccess = () => ({
	type: DELETE_CLIENT_SUCCESS,

});

export const SET_CLIENT = 'SET_CLIENT';
export const setClient = (id) => ({
	type: SET_CLIENT,
	id
})

export const fetchClients = () => (dispatch, getState) => {
	dispatch(fetchClientRequest())
	const authToken = getState().auth.authToken;
	// console.log('authtoken', authToken)
	return fetch(`${API_BASE_URL}/client/contacts`, {
		method: 'GET',
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then((data) => {
			dispatch(fetchClientsSuccess(data))
		})
		.catch(err => {
			dispatch(fetchClientsError(err));
		});
};

export const fetchOneClient = (id) => (dispatch, getState) => {
	dispatch(fetchClientRequest())
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/client/contacts/${id}`, {
		method: 'GET',
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => {
			return normalizeResponseErrors(res)
		})
		.then(res => {
			return res.json()
		})
		.then((data) => {
			data.phoneNumber = data.phoneNumber.slice(2, 5) + '-' + data.phoneNumber.slice(5, 8)
			+ '-' + data.phoneNumber.slice(8,)
			dispatch(fetchClientsSuccess(data))
		})
		.catch(err => dispatch(fetchClientsError(err)))

}

export const addClient = (values) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/client`, {
		method: 'POST',
		body: JSON.stringify(values),
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`,
			'Content-Type': 'application/json'
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => {
			dispatch(fetchClients())
		})
		.catch(err => {
			dispatch(fetchClientsError(err));
		});
};

//THIS SEEMS A BIT WEIRD
export const deleteClient = (id) => (dispatch, getState) => {
	// console.log('id in delete action', id);
	const authToken = getState().auth.authToken;
	// console.log('authtoken', authToken)
	return fetch(`${API_BASE_URL}/client/${id}`, {
		method: 'DELETE',
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => {

		})
		.then((id) => {
			dispatch(deleteClientSuccess())
		})
		.catch(err => {
			// console.log('error in delete catch block', err)
			dispatch(fetchClientsError(err));
		});
};

export const editClient = (values) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/client/${values.id}`, {
		method: 'PUT',
		body: JSON.stringify({
			'company': values.company,
			'firstName': values.firstname,
			'lastName': values.lastName,
			'hourlyRate': values.hourlyRate,
			'phoneNumber': values.phoneNumber,
			'email': values.email,
			'streetOne': values.address.streetOne,
			'streetTwo': values.address.streetTwo,
			'city': values.address.city,
			'state': values.address.state,
			'zip': values.address.zip,
			'category': values.category

		}),
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`,
			'Content-Type': 'application/json'
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then((data) => {
			// console.log('put result data', data)
			dispatch(fetchOneClient(data.id))
		})
		.catch(err => {
			dispatch(fetchClientsError(err));
		});
};

export const fetchClientCalls = (clientId) => (dispatch, getState) => {
	dispatch(fetchClientRequest())
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/call/calls/${clientId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(calls => dispatch(fetchClientCallsSuccess(calls))
	)
	.catch(err => dispatch(fetchClientsError()))
}




