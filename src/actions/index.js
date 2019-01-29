'use strict';

import {
  SET_AUTH_TOKEN,
  SET_CAPABILITY_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
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
  SET_CAPABILITY_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
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

