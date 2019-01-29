'use strict';

import {
  SET_AUTH_TOKEN,
  setAuthToken,
  SET_CAPABILITY_TOKEN,
  setCapabilityToken,
  CLEAR_AUTH,
  clearAuth,
  AUTH_REQUEST,
  authRequest,
  AUTH_SUCCESS,
  authSuccess,
  AUTH_ERROR,
  authError,
  login,
  refreshAuthToken
} from './auth.action';

import {
  FETCH_CALLSTATS_REQUEST,
  FETCH_CALLSTATS_SUCCESS,
  FETCH_CALLSTATS_ERROR,
  fetchCallStats
} from './callStats.action';

import {
  FETCH_CLIENT_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
  ADD_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  SET_CLIENT,
  fetchClients,
  fetchOneClient,
  addClient,
  deleteClient,
  editClient
} from './client.action';

import {
  DIAL_CLIENT,
  HANGUP_CLIENT,
  LOADING_CALLER,
  CALLER_LOADED,
  LOADING_CALLER_ERROR,
  fetchCallerFromContact
} from './dialer.action';

import {
  fetchCapabilityToken
} from './token.action';


import {
  registerUser,
  getPhoneNumbers,
} from './users.action';

import {
  normalizeResponseErrors
} from './utils.action';


export {
  SET_AUTH_TOKEN,
  setAuthToken,
  SET_CAPABILITY_TOKEN,
  setCapabilityToken,
  CLEAR_AUTH,
  clearAuth,
  AUTH_REQUEST,
  authRequest,
  AUTH_SUCCESS,
  authSuccess,
  AUTH_ERROR,
  authError,
  login,
  refreshAuthToken,
  FETCH_CALLSTATS_REQUEST,
  FETCH_CALLSTATS_SUCCESS,
  FETCH_CALLSTATS_ERROR,
  fetchCallStats,
  FETCH_CLIENT_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
  ADD_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  SET_CLIENT,
  fetchClients,
  fetchOneClient,
  addClient,
  deleteClient,
  editClient,
  DIAL_CLIENT,
  HANGUP_CLIENT,
  LOADING_CALLER,
  CALLER_LOADED,
  LOADING_CALLER_ERROR,
  fetchCallerFromContact,
  fetchCapabilityToken,
  registerUser,
  getPhoneNumbers,
  normalizeResponseErrors
}

