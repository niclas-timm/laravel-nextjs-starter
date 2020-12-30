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
            // await axios.get("/sanctum/csrf-cookie");
            const res = await axios.get("/api/user");

            // User was loaded successfully.
            if (res.status === 200) {
                console.log(res);
                dispatch({ type: types.USER_LOADED, payload: res.data });
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                return dispatch(types.AUTHENTICATION_ERROR, {
                    errorMsg: "Email oder Passwort sind nicht korrekt.",
                });
            }
            if (error.response.status === 419) {
                return dispatch(types.AUTHENTICATION_ERROR, {
                    errorMsg: "Keinen Serverzugang.",
                });
            } else {
                return dispatch(types.AUTHENTICATION_ERROR, {
                    errorMsg: "Sorry, etwas ist schief gelaufen.",
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
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/login", {
                email,
                password,
            });

            // Authentication was successful.
            if (res.status === 204) {
                dispatch(loadUser());
                dispatch({
                    type: types.AUTH_SUCCESS,
                });
            }
        } catch (error: any) {
            if (error.response.status === 422) {
                return dispatch(types.AUTHENTICATION_ERROR, {
                    errorMsg: "Email oder Passwort sind nicht korrekt.",
                });
            }
            if (error.response.status === 419) {
                return dispatch(types.AUTHENTICATION_ERROR, {
                    errorMsg: "Keinen Serverzugang.",
                });
            } else {
                return dispatch(types.AUTHENTICATION_ERROR, {
                    errorMsg: "Sorry, etwas ist schief gelaufen.",
                });
            }
        }
    };
};
