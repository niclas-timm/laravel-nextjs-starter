import "../styles/globals.css";
import store from "./../store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { AuthGuard } from "./../services/Auth/AuthGuard";
import { useEffect } from "react";
import * as types from "./../store/actionTypes";

require("./../config/config.tsx");

function MyApp(props: any) {
    // Handle current user in redux.
    useEffect(() => {
        // Store current user if we have one.
        if (props.user) {
            store.dispatch({
                type: types.USER_LOADED,
                payload: props.user,
            });
            return;
        }
        // Dispatch user loading error if no user is present.
        store.dispatch({
            type: types.USER_LOADED_ERROR,
        });
    }, []);

    return (
        <Provider store={store}>
            <props.Component {...props.pageProps} />;
        </Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

/**
 * Fetch some data server side before rendering the page client side.
 *
 * @param {object} context
 *   The context object.
 */
MyApp.getInitialProps = async ({ ctx }) => {
    const req = ctx.req;
    const pathname = ctx.pathname;
    const res = ctx.res;
    const authenticator = new AuthGuard();
    const user = await authenticator.authenticateUser(req, res, pathname);
    return user;
};

export default MyApp;
