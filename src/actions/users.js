import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

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
            console.log(err)
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                console.log(location)
                console.log('reason was validation error')
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        
                        _error: message
                    
                    })
                );
            }
            
            return Promise.reject(
                new SubmissionError({
                    _error: 'Error submitting message'
                })
            );
        });
};
