import {
  FETCH_CALLSTATS_SUCCESS,
  FETCH_CALLSTATS_ERROR,
  FETCH_CALLSTATS_REQUEST,
} from '../actions/callStats.action';


const initialState = {
  datesArr: null,
  durationArr: null,
  callsArr: null,
  durationTotal: null,
  callsTotal: null,
  error: null,
};


export default function reducer(state = initialState, action) {
  if (action.type === FETCH_CALLSTATS_SUCCESS) {
    return Object.assign({}, state, {
      datesArr: action.callStats.datesArr, 
      durationArr: action.callStats.durationArr, 
      callsArr: action.callStats.callsArr, 
      durationTotal: action.callStats.durationTotal, 
      callsTotal: action.callStats.callsTotal, 
      error: null,
      loading: false
    });
  } else if (action.type === FETCH_CALLSTATS_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  } else if (action.type === FETCH_CALLSTATS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    })
  } else {
    return state;
  }
}