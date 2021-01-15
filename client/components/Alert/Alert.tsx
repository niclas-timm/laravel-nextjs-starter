/*
|--------------------------------------------------------------------------
| Alert components.
|--------------------------------------------------------------------------
|
| A collection of different alerts that can be used to notify the user about
| important events & state changes.
|
*/

import PropTypes from "prop-types";

export function Alert({ type, children }) {
    // Determine the classes of the alert depending ong the type given as a prop.
    const alertType = () => {
        switch (type) {
            case "danger":
                return "bg-red-300 text-red-500";
            case "warning":
                return "bg-yellow-300 text-yellow-500";
            case "success":
                return "bg-green-300 text-green-500";
            default:
                return "bg-red-300 text-red-500";
        }
    };

    const alertTypeClasses = alertType();
    const classes = `w-full rounded flex justify-center items-center px-2 py-1 ${alertTypeClasses}`;
    return <div className={classes}>{children}</div>;
}
Alert.propTypes = {
    children: PropTypes.any,
    type: PropTypes.string.isRequired,
};
