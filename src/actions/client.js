import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const fetchClientsSuccess = data => ({
    type: FETCH_CLIENTS_SUCCESS,
    data
});

export const FETCH_CLIENTS_ERROR = 'FETCH_CLIENTS_ERROR';
export const fetchClientsError = error => ({
    type: FETCH_CLIENTS_ERROR,
    error
});

export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
export const addClientSuccess = (data) => ({
    type: ADD_CLIENT_SUCCESS,
    newCompany: data.company
});

export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';
export const deleteClientSuccess = () => ({
    type: DELETE_CLIENT_SUCCESS,
    deleted: true
});

export const fetchClients = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log('authtoken', authToken)
    return fetch(`${API_BASE_URL}/client`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            console.log('result data', data)
            dispatch(fetchClientsSuccess(data))
        })
        .catch(err => {
            dispatch(fetchClientsError(err));
        });
};

export const addClient = (values) => (dispatch, getState) => {
    console.log('values in action', values)
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
        .then((data) => {
            console.log('post result data', data)
            dispatch(addClientSuccess(data))
            })
        .catch(err => {
            dispatch(fetchClientsError(err));
        });
};

export const deleteClient = (id) => (dispatch, getState) => {
    console.log('id in delete action', id);
    const authToken = getState().auth.authToken;
    console.log('authtoken', authToken)
    return fetch(`${API_BASE_URL}/client/${id}`, {
        method: 'DELETE',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => {
            console.log('response after normalize', res)
            
        })
        .then((id) => {
            console.log('delete result data', id)
            dispatch(deleteClientSuccess())
        })
        .catch(err => {
            console.log('error in delete catch block', err)
            dispatch(fetchClientsError(err));
        });
};


    
