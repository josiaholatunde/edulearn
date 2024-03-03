import { SET_AUTHED_USER } from "../actions"
import { CREATE_USER, LOGIN_USER, LOG_USER_OUT } from "../actions/types";

const initialState = {
    user: null,
    token: null,
    error: null,
    isLoading: false,
    createdUser: null,   
}

export default function authReducer(state=initialState, { type, payload }) {

    switch (type) {
        case SET_AUTHED_USER:
            return payload;
        case CREATE_USER:
            return {
                ...state,
                user: payload,
            }
        case LOGIN_USER:
            return {
                ...state,
                token: payload.token,
                user: payload.user,
            }
        case LOG_USER_OUT:
            return {
                ...state,
                user: null,
                token: null,
                error: null,
                isLoading: false,
                createdUser: null,
            }
        default:
        return state
    };
}