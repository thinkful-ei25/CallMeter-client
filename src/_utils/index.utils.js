import {
  loadAuthToken,
  saveAuthToken,
  clearAuthToken,
  loadClientId,
  saveClientId,
  clearClientId
} from './_localStorage';

import {
  newPerson,
  newClient,
  Logo,
  Tips
} from './_miscUtils';

import {
  required,
  nonEmpty,
  isTrimmed,
  length,
  matches,
  emailCheck,
  phoneCheck,
  normalizePhone
} from './_validators';

export {
  loadAuthToken,
  saveAuthToken,
  clearAuthToken,
  loadClientId,
  saveClientId,
  clearClientId,
  newPerson,
  newClient,
  Logo,
  Tips,
  required,
  nonEmpty,
  isTrimmed,
  length,
  matches,
  emailCheck,
  phoneCheck,
  normalizePhone
};