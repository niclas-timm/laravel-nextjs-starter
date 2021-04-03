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

/**
 * The Leading headline for every site.
 *
 * Should only be used once for every view.
 *
 * @param {object} props
 *   The props object
 */
export function H1(props: any): ReactElement {
    // The Css classes that will be appended to the tag.
    const classes: string = `text-5xl ${props.withMargin ? "mb-5" : ""} ${
        props.center ? "text-center" : ""
    } `;

    return <h1 className={classes}>{props.children}</h1>;
}
H1.propTypes = {
    center: PropTypes.bool,
    withMargin: PropTypes.bool,
    children: PropTypes.string.isRequired,
};
