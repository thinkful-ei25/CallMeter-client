import { 
  LOADING_CALLER, 
  CALLER_LOADED, 
  LOADING_CALLER_ERROR
} from '../actions/dialer.action'; 

const initialState = ({ 
  error: null, 
  caller: null, 
  loadingClient: true
}); 

export default function reducer(state = initialState, action) {
  if (action.type === LOADING_CALLER) { 
    return Object.assign({
      loadingClient: true, 
      error: null, 
      caller: null
    }); 
  }
  else if (action.type === CALLER_LOADED) { 
    return Object.assign({ 
      loadingClient: false, 
      error: null, 
      caller: action.caller
    }); 
  }
  else if (action.type === LOADING_CALLER_ERROR) { 
    return Object.assign({ 
      loadingClient: false, 
      error: action.error, 
      caller: null
    }); 
  }
  return state; 
}