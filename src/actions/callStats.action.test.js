import {
  FETCH_CALLSTATS_REQUEST,
  fetchCallStatsRequest,
  FETCH_CALLSTATS_SUCCESS,
  fetchCallStatsSuccess,
  FETCH_CALLSTATS_ERROR,
  fetchCallStatsError,
  FETCH_ALLCALLS_SUCCESS,
  fetchAllCallsSuccess,
  fetchCallStats,
  fetchAllCalls
} from './callStats.action';

describe('Sync Actons', () => {

  it('fetchCallStatsSuccess', () => {
    const callStats = [1, 2, 3];
    const action = fetchCallStatsSuccess(callStats);
    expect(action.type).toEqual(FETCH_CALLSTATS_SUCCESS);
    expect(action.callStats).toEqual(callStats);
  });

  it('fetchCallStatsRequest', () => {
    const action = fetchCallStatsRequest()
    expect(action.type).toEqual(FETCH_CALLSTATS_REQUEST);
  });


  it('fetchCallStatsError', () => {
    const error = 'CATASTROPHE';
    const action = fetchCallStatsError(error);
    expect(action.type).toEqual(FETCH_CALLSTATS_ERROR);
    expect(action.error).toEqual(error);
  });

  it('fetchAllCallsSuccess', () => {
    const calls = [{ call1: 'call1' }]
    const action = fetchAllCallsSuccess(calls)
    expect(action.type).toEqual(FETCH_ALLCALLS_SUCCESS);
    expect(action.calls).toEqual(calls);
  });




})