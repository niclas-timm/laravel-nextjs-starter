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

export class AuthGuard {
    /**
     * Get the current user from the database and redirect to dashboard if successful.
     *
     * @param {IncomingMessage} req
     *   The request object.
     * @param {ServerResponse} res
     *   The response object.
     *
     * @return {object}
     *  An empty object. It is still necessary to return obj as getServerSideProps() requires it.
     */
    public async redirectOnAuthentication(
        req: IncomingMessage,
        res: ServerResponse
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
                    Location: "/dashboard",
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
}
