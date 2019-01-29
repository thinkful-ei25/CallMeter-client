export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
  try {
    localStorage.setItem('authToken', authToken);
  } catch (e) {}
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (e) {}
};

export const loadClientId = () => {
  try {
    return localStorage.getItem('clientId');
  } catch (e) {
    // console.log(e);
  }
};

export const saveClientId = clientId => {
  try {
    localStorage.setItem('clientId', clientId);
  } catch (e) {
    // console.log(e);
  }
};

export const clearClientId = () => {
  try {
    localStorage.removeItem('clientId');
  } catch (e) {
    // console.log(e);
  }
};
