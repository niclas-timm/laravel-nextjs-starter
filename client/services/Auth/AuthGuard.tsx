/*
|--------------------------------------------------------------------------
| Authenticator.
|--------------------------------------------------------------------------
|
| A set of functions related to user authentication. 
|
*/
import axios from "axios";
import { IncomingMessage, ServerResponse } from "http";
import { protectedRoutes } from "./../../config/config";

export class AuthGuard {
    /**
     * An array of routes that should not be accessible by unauthenticated users.
     */
    private protectedRoutes: string[];

    /**
     * The constructor function.
     */
    constructor() {
        this.protectedRoutes = protectedRoutes;
    }

    /**
     * Get the current user from the database and redirect to dashboard if successful.
     *
     * @param {IncomingMessage} req
     *   The request object.
     * @param {ServerResponse} res
     *   The response object.
     * @param {string} destination
     *   The destination URL the user will be redirected to if he's authenticated.
     *
     * @return {object}
     *  An empty object. It is still necessary to return obj as getServerSideProps() requires it.
     */
    public async redirectOnAuthentication(
        req: IncomingMessage,
        res: ServerResponse,
        destination: string
    ) {
        try {
            // CSRF.
            await axios.get("/sanctum/csrf-cookie");

            /**
             * As the API call is executed on the server it by
             * default does not have the cookies set in the browser.
             * Fortunately, we can extract these cookies from the req object
             * and attach them to the api call.
             */
            const user = await axios.get("/api/user", {
                headers: { Cookie: req.headers.cookie },
            });

            // Redirect to dashboard if user is logged in.
            if (user.status === 200) {
                res.writeHead(301, {
                    Location: destination,
                });
                res.end();
                return { props: {} };
            } else {
                return {
                    props: {},
                };
            }
        } catch (error) {
            return { props: {} };
        }
    }

    /**
     * Load the currently logged in user from DB.
     *
     * @param {object} req
     *   The request object.
     */
    public async authenticateUser(
        req: IncomingMessage,
        res: ServerResponse,
        pathname: string
    ) {
        const isNoProtectedRoute = this.isNoProtectedRoute(pathname);
        try {
            // CSRF.
            await axios.get("/sanctum/csrf-cookie");

            // If there are no cookies and the route is protected, redirect to login.
            if (!req.headers.cookie && !isNoProtectedRoute) {
                /**
                 * No further redirect if we're already on the login
                 * path, as we otherwisely would be caught in an
                 * infinite loop of redirections to /user/login.
                 */
                if (pathname === "/user/login") {
                    res.end();
                    return { user: false };
                }

                res.writeHead(302, {
                    Location: "/user/login",
                });
                res.end();
                return { user: false };
            }

            /**
             * As the API call is executed on the server it by
             * default does not have the cookies set in the browser.
             * Fortunately, we can extract these cookies from the req object
             * and attach them to the api call.
             */
            const response = await axios.get("/api/user", {
                headers: { Cookie: req.headers.cookie },
            });

            // Abort if request was not successful.
            if (response.status !== 200) {
                res.end();
                return { user: false };
            }

            // New var with the current user data.
            const currentUser = response.data;

            // If user is authenticated and he requests login or register, redirect to dashboard.
            if (
                currentUser &&
                (pathname === "/user/register" || pathname === "/user/login")
            ) {
                res.writeHead(302, {
                    Location: "/dashboard",
                });
                res.end();
            }
            // Redirect to login if user is not authenticated and tries to access protected route.
            else if (!currentUser && !isNoProtectedRoute) {
                res.writeHead(302, {
                    Location: "/user/login",
                });
                res.end();
                return { user: false };
            }

            // Return the currently authenticated user.
            return {
                user: currentUser,
            };
        } catch (error) {
            /**
             * If the authentication fails (e.g. invalid session)
             * the API will send a 401 response. If we're on a
             * protected route, redirect to the login page.
             */

            if (
                error.response &&
                error.response.status === 401 &&
                !isNoProtectedRoute
            ) {
                if (pathname === "/user/login") {
                    return { user: false };
                }
                res.writeHead(302, {
                    Location: "/user/login",
                });
                res.end();
            }
            return { user: false };
        }
    }

    /**
     * Check if a given path is a protected one.
     *
     * @param {string} pathname
     *   The current pathname.
     *
     * @return {boolean}
     *   True if it is a protected route.
     */
    public isNoProtectedRoute(pathname: string): boolean {
        return this.protectedRoutes.every((route) => {
            return !pathname.startsWith(route);
        });
    }
}
