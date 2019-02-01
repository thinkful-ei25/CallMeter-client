import {
  FETCH_CLIENT_REQUEST,
  fetchClientRequest,
  FETCH_CLIENTS_SUCCESS,
  fetchClientsSuccess,
  FETCH_CLIENTS_ERROR,
  fetchClientsError,
  ADD_CLIENT_SUCCESS,
  addClientSuccess,
  DELETE_CLIENT_SUCCESS,
  deleteClientSuccess,
  SET_CLIENT,
  FETCH_CLIENT_CALLS_SUCCESS,
  fetchClientCalls,
  setClient,
  fetchClients,
  fetchOneClient,
  addClient,
  deleteClient,
  editClient, 
} from './client.action';

describe('Sync Actons', () => {

  it('fetchClientsSuccess', () => {
    const data = [{name: 'Bob'}]
    const action = fetchClientsSuccess(data);
    expect(action.type).toEqual(FETCH_CLIENTS_SUCCESS);
    expect(action.data).toEqual(data);
  });

  it('fetchClientRequest', () => {
    const action = fetchClientRequest()
    expect(action.type).toEqual(FETCH_CLIENT_REQUEST);
  });

  it('fetchClientError', () => {
    const error = 'CATASTROPHE';
    const action = fetchClientsError(error);
    expect(action.type).toEqual(FETCH_CLIENTS_ERROR);
    expect(action.error).toEqual(error);
  });

})