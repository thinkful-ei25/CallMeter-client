import dialerReducer from '../../reducers/dialer.reducer'

describe('dialerReducer', () => {


  it('Should set the initial state when nothing is passed in', () => {
    const state = dialerReducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual({
      error: null,
      caller: null,
      loadingClient: true,
      outboundClient: null
    });
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = dialerReducer(currentState, { type: '__UNKNOWN' });
    expect(state).toBe(currentState);
  });

  describe('LOADING CALLER', () => {
    it('Should set loading to true', () => {
      let state = {
        error: null,
        caller: null,
        loadingClient: false,
        
      };
      state = dialerReducer(state, { type: 'LOADING_CALLER' });

      expect(state).toEqual({
        error: null,
        caller: null,
        loadingClient: true,
     
      });
    });
  });

  describe('CALLER LOADED', () => {
    it('Should set loading to false and caller to action.caller', () => {
      let state;
      state = dialerReducer(state, { type: 'CALLER_LOADED', caller: '5552223333' });

      expect(state).toEqual({
        error: null,
        caller: '5552223333',
        loadingClient: false,
       
      });
    });
  });

  describe('LOADING CALLER ERROR', () => {
    it('Should set loading to false, error to action.error and caller to null', () => {
      let state;
      state = dialerReducer(state, { type: 'LOADING_CALLER_ERROR', error: 'SOMETHING AWFUL' });

      expect(state).toEqual({
        error: 'SOMETHING AWFUL',
        caller: null,
        loadingClient: false,
        
      });
    });
  });

  describe('DIAL CLIENT', () => {
    it('Should set outbound client to action.client', () => {
      let state;
      state = dialerReducer(state, { type: 'DIAL_CLIENT', client: '4446669999' });

      expect(state).toEqual({
        outboundClient: '4446669999'
      });
    });
  });

  describe('HANGUP CLIENT', () => {
    it('Should set outbound client to null', () => {
      let state;
      state = dialerReducer(state, { type: 'HANGUP_CLIENT' });

      expect(state).toEqual({
        outboundClient: null
      });
    });
  });

});