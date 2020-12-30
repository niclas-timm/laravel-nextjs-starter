import "../styles/globals.css";
import store from "./../store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

require("./../config/config.tsx");

function MyApp({ Component, pageProps }) {
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
