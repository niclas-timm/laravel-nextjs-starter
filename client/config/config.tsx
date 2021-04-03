/*
|--------------------------------------------------------------------------
| Axios defaults
|--------------------------------------------------------------------------
|
| The default config for axios. "withCredentials" is necessary in order to
| get access to the laravel backend. The "baseURL" should match the domain
| and port of your laravel api.
|
*/
import axios from "axios";
// Configure axios in order to be able to make api requests to the laravel backend.
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST_URL;

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
|
| A list of routes that is only accessible for authenticated user. If an
| unauthenticated user tries to access on of the listed routes, she will be
| redirected to /user/login. The list also respects sub-routes.
| This means, if you include /dashboard, /dashboard/analytics or /dashboard/1
| will lead to a redirect if the user is not authenticated.
|
*/
export const protectedRoutes: string[] = [
    process.env.NEXT_PUBLIC_USER_HOME_ROUTE, // -> from .env.local
    // "/profile",
    // "/acount",
    // ...,
];
