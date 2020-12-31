/*
|--------------------------------------------------------------------------
| Button components.
|--------------------------------------------------------------------------
|
| A collection of buttons that are ready to plug and play.
|
*/

import PropTypes from "prop-types";

/**
 * The Primary Button. Primarily used for CTAs.
 *
 * @param {object} props
 *   The props object.
 */
export function PrimaryButton(props: any) {
    const classes = `w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-3 ${props.additionalClasses}`;
    return (
        <button type="button" className={classes} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
PrimaryButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any,
    additionalClasses: PropTypes.string,
};
