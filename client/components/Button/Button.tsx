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

export function ToggleButton(props: any) {
    const outerClasses = `toggle-checkbox flex align-center items-center inline-block rounded-2xl p-1 h-8 w-14 ${
        props.checked
            ? "bg-purple-700 justify-end"
            : "bg-gray-300 justify-start"
    } cursor-pointer transition-all duration-100 ease-in`;
    const innerClasses = `rounded-full h-6 w-6 bg-gray-700 transition-all duration-500 ease-in`;
    return (
        <div className={outerClasses} onClick={props.onClick}>
            <div className={innerClasses}></div>
        </div>
    );
}
