import {
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_ERROR
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
    }
    return state;
}