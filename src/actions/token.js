import { API_BASE_URL } from '../config';

/**
 * Obtain a Twilio capability token for the appropriate account
 * @param accountSid
 * @param authToken
 * @returns {Promise<string>} capability token
 * @throws error on auth failure
 */

export const fetchCapabilityToken = (accountSid, authToken) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      accountSid: accountSid,
      authToken: authToken
    })
  };
  return fetch(`${API_BASE_URL}/token`, options)
    .then(res => handleErrors(res))
    .then(res => res.text())
}

function handleErrors(res) {
  if(res.ok) return res;
  else throw new Error(res.statusText);
}

