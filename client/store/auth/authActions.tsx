/*
|--------------------------------------------------------------------------
| Auth actions.
|--------------------------------------------------------------------------
|
| Here all api calls and business logic concerned with authentication are
| handled. This (potentially among others) includes registration, login,
| logout.
|
*/

import axios from "axios";
import { type } from "os";
import * as types from "../actionTypes";

/**
 * Load currently logged in user from DB.
 *
 * This usually happens after a successful login
 * or after a page refresh when there is currently
 * an active user.
 */
export const loadUser = () => {
    return async (dispatch: CallableFunction) => {
        try {
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.get("/api/user");

            // User was loaded successfully.
            if (res.status === 200) {
                dispatch({ type: types.USER_LOADED, payload: res.data });
                return res.data;
            }
        } catch (error) {
            if (error.response.status === 422) {
                return dispatch({
                    type: types.USER_LOADED_ERROR,
                    payload: "Email or password are incorrect.",
                });
            }
            if (error.response.status === 419) {
                return dispatch({
                    type: types.AUTHENTICATION_ERROR,
                    payload: {
                        errorMsg: "Keinen Serverzugang.",
                    },
                });
            } else {
                return dispatch({
                    type: types.USER_LOADED_ERROR,
                    payload: "Sorry, something went wrong.",
                });
            }
        }
    };
};

/**
 * Login functionality.
 *
 * @param {string} email
 *   The email address of the user.
 * @param {string} password
 *   The password of the user.
 */
export const login = (email: string, password: string): any => {
    return async (dispatch: CallableFunction) => {
        try {
            // Start loading.
            dispatch({ type: types.START_LOGIN_LOADING });

            // Make api requests.
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/login", {
                email,
                password,
            });

            // Authentication was successful.
            if (res.status === 204) {
                dispatch(loadUser());
                dispatch({
                    type: types.LOGIN_SUCCESS,
                });
            }
        } catch (error: any) {
            if (error.response.status === 422) {
                return dispatch({
                    type: types.LOGIN_ERROR,
                    payload: "Email or password are incorrect.",
                });
            }
            if (error.response.status === 419) {
                return dispatch({
                    type: types.LOGIN_ERROR,
                    payload: "Application access denied.",
                });
            } else {
                return dispatch({
                    type: types.AUTHENTICATION_ERROR,
                    payload: "Sorry, somethig went wrong.",
                });
            }
        }
    };
};

/**
 * Registration functionality.
 *
 * @param {string} name
 *   The name of the user.
 * @param {string} email
 *   The email of the user.
 * @param {string} password
 *   The password of the user.
 * @param {string} password_confirmed
 *   The confirmed password of the user.
 */
export const register = (
    name: string,
    email: string,
    password: string,
    password_confirmed: string
) => {
    return async (dispatch: CallableFunction) => {
        try {
            dispatch({
                type: types.START_REGISTER_LOADING,
            });
            // API Call.
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/register", {
                name,
                email,
                password,
                password_confirmed,
            });

            // Load the user if registration was successful.
            if (res.status === 201) {
                dispatch(loadUser());
            }
        } catch (error: any) {
            if (error.response.status === 422) {
                const emailErrorMsg = error.response.data.errors.email[0];

                if (emailErrorMsg) {
                    dispatch({
                        type: types.REGISTER_ERROR,
                        payload: emailErrorMsg,
                    });
                }
            } else {
                dispatch({
                    type: types.REGISTER_ERROR,
                    payload: "Sorry, something went wrong.",
                });
            }
        }
    };
};

/**
 * Log current user out.
 */
export const logout = () => {
    return async (dispatch: CallableFunction) => {
        try {
            const res = await axios.post("/logout");
            if (res.status === 204) {
                dispatch({
                    type: types.LOGOUT,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
