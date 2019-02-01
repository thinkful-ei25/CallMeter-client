import {
  loadAuthToken,
  saveAuthToken,
  clearAuthToken,
  loadClientId,
  saveClientId,
  clearClientId
} from '../../_utils/_localStorage';

describe('localStorage', () => {
  it('should save authToken to localStorage', () => {
    const KEY = 'authToken',
      VALUE = 'bar';
    saveAuthToken((VALUE));
    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
    expect(localStorage.__STORE__[KEY]).toBe(VALUE);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it('should load authToken from local storage', () => {
    const authToken = loadAuthToken()
    expect(authToken).toEqual('bar')
  })

  it('should clear the authToken', () => {
    clearAuthToken()
    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  })

  it('should save clientId to localStorage', () => {
    const KEY = 'clientId',
      VALUE = '12345';
    saveClientId((VALUE));
    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
    expect(localStorage.__STORE__[KEY]).toBe(VALUE);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it('should load clientId from local storage', () => {
    const clientId = loadClientId()
    expect(clientId).toEqual('12345')
  })

  it('should clear the clientId', () => {
    clearClientId()
    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  })

})

