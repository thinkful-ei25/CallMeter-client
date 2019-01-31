import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './index.actions';

export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/register/user`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        console.log(location);
        console.log('reason was validation error');
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            _error: message
          })
        );
      }

      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};


export const completeTutorial = () => (dispatch, getState) => {
  //console.log("authToken", this.props.authToken);
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/register/endTutorial`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => {
    console.log('results of completedTutorial', res);
    console.log('tutorial marked completed');
  })
  .catch(err => {
    console.log('error changing tutorial status', err);
  })
}

export const getPhoneNumbers = areaCode => dispatch => {
  console.log('area code: ', areaCode);
  return fetch(`${API_BASE_URL}/register/phones?areaCode=${areaCode}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => {
      console.log("beforeNormalize", res);
      return normalizeResponseErrors(res)
    })
    .then(res => {
      console.log("res", res);
      return res.json();
    })
    .catch(err => {
      console.log(err);
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        console.log(location);
        console.log('reason was validation error');
        return Promise.reject(
          new SubmissionError({
            _error: message
          })
        );
      }
    });
};
