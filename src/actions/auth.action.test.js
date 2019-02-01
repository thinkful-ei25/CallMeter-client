import {
  SET_AUTH_TOKEN,
  setAuthToken,
  SET_CAPABILITY_TOKEN,
  setCapabilityToken,
  CLEAR_AUTH,
  clearAuth,
  AUTH_REQUEST,
  authRequest,
  AUTH_SUCCESS,
  authSuccess,
  AUTH_ERROR,
  authError,
  login,
  refreshAuthToken,
  checkTutorialCompleted,
  CHECK_TUTORIAL_COMPLETED,
} from './auth.action';


describe('Sync Actions', () => {
  it('setAuthToken', () => {
    const authToken = 'RANDOMHASH%%';
    const action = setAuthToken(authToken);
    expect(action.type).toEqual(SET_AUTH_TOKEN);
    expect(action.authToken).toEqual(authToken);
  });

  it('setCapabilityToken', () => {
    const capabilityToken = 'RANDOMHASH%%';
    const action = setCapabilityToken(capabilityToken);
    expect(action.type).toEqual(SET_CAPABILITY_TOKEN);
    expect(action.capabilityToken).toEqual(capabilityToken);
  });

  it('clearAuth', () => {
    const action = clearAuth()
    expect(action.type).toEqual(CLEAR_AUTH);
  });

  it('authRequest', () => {
    const action = authRequest()
    expect(action.type).toEqual(AUTH_REQUEST);
  });

  it('authSuccess', () => {
    const currentUser = 'Jimbo';
    const action = authSuccess(currentUser);
    expect(action.type).toEqual(AUTH_SUCCESS);
    expect(action.currentUser).toEqual(currentUser);
  });

  it('authError', () => {
    const error = 'CATASTROPHE';
    const action = authError(error);
    expect(action.type).toEqual(AUTH_ERROR);
    expect(action.error).toEqual(error);
  });

  it('checkTutorialCompleted', () => {
    const isTutorialCompleted = true;
    const action = checkTutorialCompleted(isTutorialCompleted);
    expect(action.type).toEqual(CHECK_TUTORIAL_COMPLETED);
    expect(action.isTutorialCompleted).toEqual(isTutorialCompleted);
  });


});

