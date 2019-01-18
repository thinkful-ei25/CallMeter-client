import {
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_ERROR,
    ADD_CLIENT_SUCCESS
} from '../actions/client';

const initialState = {
    data: '',
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_CLIENTS_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_CLIENTS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === ADD_CLIENT_SUCCESS) {
        return Object.assign({}, state, {
            newCompany: action.newCompany
        })
    }
    return state;
}