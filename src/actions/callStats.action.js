import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


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

export const fetchCallStats = () => (dispatch, getState) => {
  dispatch(fetchCallStatsRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/call/stats/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then((callStats) => {
        console.log('result data', callStats)
        dispatch(fetchCallStatsSuccess(callStats))
      })
      .catch(err => {
        dispatch(fetchCallStatsError(err));
      });
    
    }

  
