import {
  LOADING_CALLER,
  CALLER_LOADED,
  LOADING_CALLER_ERROR,
  DIAL_CLIENT,
  HANGUP_CLIENT
} from '../actions/index.actions';

const initialState = {
  error: null,
  caller: null,
  loadingClient: true,
  outboundClient: null
};

export default function dialerReducer(state = initialState, action) {
  if (action.type === LOADING_CALLER) {
    return Object.assign({}, state, {
      loadingClient: true,
      error: null,
      caller: null
    });
  } else if (action.type === CALLER_LOADED) {
    return Object.assign({}, state, {
      loadingClient: false,
      error: null,
      caller: action.caller
    });
  } else if (action.type === LOADING_CALLER_ERROR) {
    return Object.assign({}, state, {
      loadingClient: false,
      error: action.error,
      caller: null
    });
  } else if (action.type === DIAL_CLIENT) {
    return Object.assign({}, state, {
      outboundClient: action.client
    });
  } else if (action.type === HANGUP_CLIENT) {
    return Object.assign({}, state, {
      outboundClient: null
    });
  }
  return state;
}
