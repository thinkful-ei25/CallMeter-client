import {
  loadAuthToken,
  saveAuthToken,
  clearAuthToken,
  loadClientId,
  saveClientId,
  clearClientId
} from './_localStorage';

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
  required,
  nonEmpty,
  isTrimmed,
  length,
  matches,
  emailCheck,
  phoneCheck,
  normalizePhone
};