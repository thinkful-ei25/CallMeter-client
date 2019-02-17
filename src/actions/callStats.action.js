import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './index.actions';

export const FETCH_CALLSTATS_REQUEST = 'FETCH_CALLSTATS_REQUEST';
export const fetchCallStatsRequest = () => ({
  type: FETCH_CALLSTATS_REQUEST
});

export const FETCH_CALLSTATS_SUCCESS = 'FETCH_CALLSTATS_SUCCESS';
export const fetchCallStatsSuccess = callStats => ({
  type: FETCH_CALLSTATS_SUCCESS,
  callStats
});

export const FETCH_CALLSTATS_ERROR = 'FETCH_CALLSTATS_ERROR';
export const fetchCallStatsError = error => ({
  type: FETCH_CALLSTATS_ERROR,
  error
});

export const FETCH_ALLCALLS_SUCCESS = 'FETCH_ALLCALLS_SUCCESS';
export const fetchAllCallsSuccess = calls => ({
  type: FETCH_ALLCALLS_SUCCESS,
  calls
});

export const FETCH_ALLCALLS_REQUEST = 'FETCH_ALLCALLS_REQUEST';
export const fetchAllCallsRequest = () => ({
  type: FETCH_ALLCALLS_REQUEST
});


export const FETCH_ALLCALLS_ERROR = 'FETCH_ALLCALLS_ERROR';
export const fetchAllCallsError = error => ({
  type: FETCH_ALLCALLS_ERROR,
  error
});

export const fetchCallStats = () => (dispatch, getState) => {
  dispatch(fetchCallStatsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/call/stats/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(callStats => {
      // console.log('result data', callStats)
      dispatch(fetchCallStatsSuccess(callStats));
    })
    .catch(err => {
      dispatch(fetchCallStatsError(err));
    });
};

export const fetchAllCalls = () => (dispatch, getState) => {
  dispatch(fetchAllCallsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/call/calls`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(calls => {
      dispatch(fetchAllCallsSuccess(calls));
    })
    .catch(err => {
      dispatch(fetchAllCallsError(err));
    });
};
