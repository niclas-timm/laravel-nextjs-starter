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
import {ReactElement} from "react";

export function SmallSpinner(props: any): ReactElement {
    const classes: string = `inline-block rounded-full border-4 border-t-4 border-gray-200 border-top-colored animate-spin h-6 w-6`;
    return props.show ? <span className={classes}></span> : <span></span>;
}
SmallSpinner.propTypes = {
    show: PropTypes.bool.isRequired,
};
