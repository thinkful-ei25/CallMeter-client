import {
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_ERROR,
    ADD_CLIENT_SUCCESS,
    DELETE_CLIENT_SUCCESS
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
            
        })
    } else if (action.type === DELETE_CLIENT_SUCCESS) {
        return Object.assign({}, state, {
            
        })
    }
    return state;
}