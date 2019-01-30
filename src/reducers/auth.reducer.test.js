import authReducer from './auth.reducer';


describe('authReducer', () => {

  it('Should set the initial state when nothing is passed in', () => {
    const state = authReducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual({
      authToken: null,
      capabilityToken: null,
      currentUser: null,
      loading: false,
      error: null
    });
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = authReducer(currentState, { type: '__UNKNOWN' });
    expect(state).toBe(currentState);
  });

  
  describe('AUTH_REQUEST', () => {
    it('Should set loading to true and error to null', () => {
      let state;
      state = authReducer(state, { type: 'AUTH_REQUEST' });

      expect(state).toEqual({
        authToken: null,
        capabilityToken: null,
        currentUser: null,
        loading: true,
        error: null
      });
    });
  });

  describe('AUTH_SUCCESS', () => {
    it('Should set loading to false and set the currentUser', () => {
      let state;
      state = authReducer(state, { type: 'AUTH_SUCCESS', currentUser: 'Someone' });

      expect(state).toEqual({
        authToken: null,
        capabilityToken: null,
        currentUser: 'Someone',
        loading: false,
        error: null
      });
    });
  });

  describe('AUTH_ERROR', () => {
    it('Should set loading to false and set the error', () => {
      let state;
      state = authReducer(state, { type: 'AUTH_ERROR', error: 'BAD NEWS' });

      expect(state).toEqual({
        authToken: null,
        capabilityToken: null,
        currentUser: null,
        loading: false,
        error: 'BAD NEWS'
      });
    });
  });

  describe('SET_AUTH_TOKEN', () => {
    it('Should set the authToken', () => {
      let state;
      state = authReducer(state, { type: 'SET_AUTH_TOKEN', authToken: 'AUTHTOKENHASH$$RANDOMETC' });

      expect(state).toEqual({

        authToken: 'AUTHTOKENHASH$$RANDOMETC',
        capabilityToken: null,
        currentUser: null,
        loading: false,
        error: null
      });
    });
  });

  describe('SET_CAPABILITY_TOKEN', () => {
    it('Should set the capabilityToken', () => {
      let state;
      state = authReducer(state, { type: 'SET_CAPABILITY_TOKEN', capabilityToken: 'CAPABILITYTOKENHASH$$RANDOMETC' });

      expect(state).toEqual({

        authToken: null,
        capabilityToken: 'CAPABILITYTOKENHASH$$RANDOMETC',
        currentUser: null,
        loading: false,
        error: null
      });
    });
  });

  describe('CLEAR_AUTH', () => {
    it('Should set the authToken and curentUser to null', () => {
      let state = {
        authToken: 'AUTHTOKENHASH$$RANDOMETC',
        capabilityToken: 'CAPABILITYTOKENHASH$$RANDOMETC',
        currentUser: 'Someone',
        loading: false,
        error:null
      };
      state = authReducer(state, { type: 'CLEAR_AUTH' });

      expect(state).toEqual({

        authToken: null,
        capabilityToken: 'CAPABILITYTOKENHASH$$RANDOMETC',
        currentUser: null,
        loading: false,
        error: null
      });
    });
  });

});