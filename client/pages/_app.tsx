import { useEffect } from "react";

import "../styles/globals.css";
import store from "./../store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "./../store/auth/authActions";
require("./../config/config.tsx");

function MyApp({ Component, pageProps }) {
    // Load currently logged in user upon mount.
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Component {...pageProps} />;
        </Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

export default MyApp;
