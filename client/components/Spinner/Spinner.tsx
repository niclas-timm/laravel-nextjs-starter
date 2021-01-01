/*
|--------------------------------------------------------------------------
| Form Element components.
|--------------------------------------------------------------------------
|
| A collection of form elements ready to plug in to other compents.
| They all have error messages ready to be displayed.
|
*/

import PropTypes from "prop-types";

export function SmallSpinner(props: any) {
    const classes = `rounded-full border-4 border-t-4 border-gray-200 border-top-colored animate-spin h-6 w-6`;
    return props.show ? <div className={classes}></div> : <div></div>;
}
SmallSpinner.propTypes = {
    show: PropTypes.bool.isRequired,
};
