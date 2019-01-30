import callStatsReducer from './callStats.reducer';


describe('callStatsReducer', () => {
  const callStats = {
      datesArr: ["2019-01-24T21:30:50.264Z"],
      durationArr: [1, 2, 5],
      callsArr: [1, 1, 10],
      durationTotal: 8,
      callsTotal: 12,
      error: null,
      loading: false
  }

  const calls = [{
    "_id" : "5c4a2e935134a63c8c27b76e",
    "duration" : 9,
    "billable" : true,
    "id" : "5c4750b55a5cbb0b09158263",
    "userSid" : "AC1d8261f4ee03dbe1005af796ab821841",
    "startTime" : "2019-01-24T21:30:50.264Z",
    "endTime" : "2019-01-24T21:30:59.266Z",
    "organizationPhoneNumber" : "+13019803889",
    "clientPhoneNumber" : "+18025055503",
    "callSid" : "CAa417348e5e6a9ebda7cc22871cb1cc91",
    "direction" : "outgoing",
    "status" : "in-progress",
    "invoiced" : true,
    "__v" : 0
}]

  it('Should set the initial state when nothing is passed in', () => {
    const state = callStatsReducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual({
      datesArr: null,
      durationArr: null,
      callsArr: null,
      durationTotal: null,
      callsTotal: null,
      error: null,
      calls: []
    });
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = callStatsReducer(currentState, { type: '__UNKNOWN' });
    expect(state).toBe(currentState);
  });

  describe('FETCH_CALLSTATS_REQUEST', () => {
    it('Should set loading', () => {
      let state;
      state = callStatsReducer(state, { type: 'FETCH_CALLSTATS_REQUEST' });

      expect(state).toEqual({
        loading: true,
        datesArr: null,
        durationArr: null,
        callsArr: null,
        durationTotal: null,
        callsTotal: null,
        error: null,
        calls: []
      });
    });
  });

  describe('FETCH_CALLSTATS_ERROR', () => {
    it('Should set error and set loading false', () => {
      let state;
      state = callStatsReducer(state, { type: 'FETCH_CALLSTATS_ERROR', error: 'BAD STUFF' });

      expect(state).toEqual({
        loading: false,
        datesArr: null,
        durationArr: null,
        callsArr: null,
        durationTotal: null,
        callsTotal: null,
        error: 'BAD STUFF',
        calls: []
      });
    });
  });

  describe('FETCH_CALLSTATS_SUCCESS', () => {
    it('Should set call stats, error to null, and loading to false', () => {
      let state;
      state = callStatsReducer(state, {type: 'FETCH_CALLSTATS_SUCCESS', callStats: callStats});
      
      expect(state).toEqual({
      datesArr: ["2019-01-24T21:30:50.264Z"],
      durationArr: [1, 2, 5],
      callsArr: [1, 1, 10],
      durationTotal: 8,
      callsTotal: 12,
      error: null,
      loading: false,
      calls: []
      })
    })
  })

  describe('FETCH_ALLCALLS_SUCCESS', () => {
    it('Should set calls', () => {
      let state;
      state = callStatsReducer(state, {type: 'FETCH_ALLCALLS_SUCCESS', calls: calls});
      
      expect(state).toEqual({
        datesArr: null,
        durationArr: null,
        callsArr: null,
        durationTotal: null,
        callsTotal: null,
        error: null,
        calls: [{
          "_id" : "5c4a2e935134a63c8c27b76e",
          "duration" : 9,
          "billable" : true,
          "id" : "5c4750b55a5cbb0b09158263",
          "userSid" : "AC1d8261f4ee03dbe1005af796ab821841",
          "startTime" : "2019-01-24T21:30:50.264Z",
          "endTime" : "2019-01-24T21:30:59.266Z",
          "organizationPhoneNumber" : "+13019803889",
          "clientPhoneNumber" : "+18025055503",
          "callSid" : "CAa417348e5e6a9ebda7cc22871cb1cc91",
          "direction" : "outgoing",
          "status" : "in-progress",
          "invoiced" : true,
          "__v" : 0
      }]
      })
    })
  })



});