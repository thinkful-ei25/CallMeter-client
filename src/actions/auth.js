import jwtDecode from 'jwt-decode';
import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { saveAuthToken, clearAuthToken } from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
	type: SET_AUTH_TOKEN,
	authToken
});

export const SET_CAPABILITY_TOKEN = 'SET_CAPABILITY_TOKEN'; 
export const setCapabilityToken = capabilityToken => ({ 
  type: SET_CAPABILITY_TOKEN, 
  capabilityToken
}); 

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
	type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
	type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
	type: AUTH_SUCCESS,
	currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
	type: AUTH_ERROR,
	error
});

// Stores the authToken and the capabilityToken in the state. 
// Stores and decodes the authToken in localStorage. 
// The user information is stored in the authToken
const storeTokens = (authToken, capabilityToken, dispatch) => { 
  const decodedToken = jwtDecode(authToken); 
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
  dispatch(setCapabilityToken(capabilityToken)); 
  saveAuthToken(authToken);
}

export const login = (organizationName, password) => dispatch => {
    dispatch(authRequest());
    console.log('organizationName', organizationName, 'password', password); 
    return (
      fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          organizationName,
          password
        })
      })
      // Reject any requests which don't return a 200 status, creating
      // errors which follow a consistent format
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then((tokens) => { 
        const {authToken, capabilityToken} = tokens; 
       
        //STORE CAPABILITY & AUTHTOKEN IN THE STATE
        storeTokens(authToken, capabilityToken, dispatch); 
      })
      .catch(err => {
          console.log('err',err)
          const {status} = err;
          console.log('code', status)
          const message =
              status === 401
                  ? 'Incorrect organization name or password'
                  : 'Unable to login, please try again';
          dispatch(authError(err));
          // Could not authenticate, so return a SubmissionError for Redux
          // Form
          return Promise.reject(
              new SubmissionError({
                  _error: message
              })
          );
      })
    );
};

export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(tokens => { 
          const {authToken, capabilityToken} = tokens; 
       
          //STORE CAPABILITY & AUTHTOKEN IN THE STATE
          storeTokens(authToken, capabilityToken, dispatch); 
        })
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, or something else went wrong, so clear
            // them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};
