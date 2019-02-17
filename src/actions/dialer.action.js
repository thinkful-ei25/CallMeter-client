import { API_BASE_URL } from '../config'; 

export const DIAL_CLIENT = 'DIAL_CLIENT'; 
export const dialClient = (client) => ({ 
  type: DIAL_CLIENT, 
  client
}); 

export const HANGUP_CLIENT = 'HANGUP_CLIENT'; 
export const hangupClient = () => ({ 
 type: HANGUP_CLIENT
}); 

export const LOADING_CALLER = 'LOADING_CALLER';
export const loadingCaller = (client) => ({
  type: LOADING_CALLER, 
  client
}); 

export const CALLER_LOADED = 'CALLER_LOADED'; 
export const callerLoaded = (caller) => ({ 
  type: CALLER_LOADED, 
  caller
}); 

export const LOADING_CALLER_ERROR = 'LOADING_CALLER_ERROR'; 
export const loadingCallerError = (error) => ({ 
  type: LOADING_CALLER_ERROR, 
  error
}); 

export const fetchCallerFromContact = (callerNumber) => (dispatch, getState) => {
  dispatch(loadingCaller()); 
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}/client/contacts/phone/${callerNumber.slice(2)}`, 
    { 
      method: 'GET',
      headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`
      }
  })
  .then(res => { 
    return res.json(); 
  })
  .then(caller => { 
     dispatch(callerLoaded(caller)); 
  })
  .catch(err => { 
    dispatch(loadingCallerError(err)); 
    // console.log('err', err); 
  }); 
}; 