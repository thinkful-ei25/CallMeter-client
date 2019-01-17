import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CLIENTS_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchClientsSuccess = data => ({
    type: FETCH_CLIENTS_SUCCESS,
    data
});

export const FETCH_CLIENTS_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchClientsError = error => ({
    type: FETCH_CLIENTS_ERROR,
    error
});

export const fetchClients = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/client`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchClientsSuccess(data)))
        .catch(err => {
            dispatch(fetchClientsError(err));
        });
};