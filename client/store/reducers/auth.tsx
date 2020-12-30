/*
|--------------------------------------------------------------------------
| Auth store.
|--------------------------------------------------------------------------
|
| Here you can find the store for the authentication part of the application
| It manages all authentication data like the current user, auth status and errors.
|
*/

import * as types from "../actionTypes";

const initState = {
    isAuthenticated: false,
    loading: true,
    user: {},
    authError: "",
    credentialsError: "",
};

const auth = (state = initState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case types.AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                authError: "",
                credentialsError: "",
            };
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                authError: "",
                credentialsError: "",
                user: action.payload,
            };
        case types.AUTHENTICATION_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                authError: "",
                credentialsError: action.payload.errorMsg,
            };
    }
    return state;
};

export default auth;
