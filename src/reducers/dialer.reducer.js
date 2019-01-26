import ({ 
  LOADING_CALLER, 
  CALLER_LOADED, 
  LOADING_CALLER_ERROR
}) from '../actions/dialer.action'; 

const initialState = ({ 
  error: '', 
  caller: null
}); 

export default function reducer(state = initialState, action) {
  if (action.type === LOADING_CALLER) { 
    
  }
  else if (action.type === CALLER_LOADED) { 

  }
  else if (action.type === LOADING_CALLER_ERROR) { 

  }
}