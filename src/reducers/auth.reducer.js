import {
  SET_AUTH_TOKEN,
  SET_CAPABILITY_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CHECK_TUTORIAL_COMPLETED,
} from '../actions/index.actions';

const initialState = {
  isTutorialCompleted: false,
  authToken: null,
  capabilityToken: null,
  currentUser: null,
  loading: false,
  error: null
};

export default function authReducer(state = initialState, action) {
  if (action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken
    });
  } else if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, {
      authToken: null,
      currentUser: null
    });
  } else if (action.type === AUTH_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === AUTH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      currentUser: action.currentUser
    });
  } else if (action.type === AUTH_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === SET_CAPABILITY_TOKEN) {
    return Object.assign({}, state, {
      capabilityToken: action.capabilityToken
    });
  }
    else if (action.type === CHECK_TUTORIAL_COMPLETED){
      // console.log('reducer was here', action.isTutorialCompleted);
      return Object.assign({}, state, {
        isTutorialCompleted: action.isTutorialCompleted
      })
    }
  return state;
}
