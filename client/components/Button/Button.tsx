/*
|--------------------------------------------------------------------------
| Button components.
|--------------------------------------------------------------------------
|
| A collection of buttons that are ready to plug and play.
|
*/

import PropTypes from "prop-types";
import {ReactElement} from "react";

/**
 * The Primary Button. Primarily used for CTAs.
 *
 * @param {object} props
 *   The props object.
 */
export function PrimaryButton(props: any): ReactElement {
    const classes: string = `w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-3 ${props.additionalClasses}`;
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

/**
 * A Swiper-Like button that can be used to indicate an on and off state.
 *
 * @param {object} props
 */
export function SwiperButton(props: any) {
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

/**
 * A circe round button.
 * @param {object} props
 */
export function CircleButton({children, onClick, additionalClasses}) {
    const classList = `${additionalClasses} mb-3 mr-3 rounded-full p-2 bg-purple-500 text-pruple-700 focus:outline-none cursour-pointer text-white hover:bg-purple-700`;
    return (
        <button className={classList} onClick={onClick}>
            {children}
        </button>
    );
}

CircleButton.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func,
    additionalClasses: PropTypes.string,
};

/**
 * A circle round button with a burger menu inside.
 *
 * @param {object} props
 */
export function BurgerCircleButton({onClick, additionalClasses}) {
    return (
        <CircleButton onClick={onClick} additionalClasses={additionalClasses}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                />
            </svg>
        </CircleButton>
    );
}

BurgerCircleButton.propTypes = {
    onClick: PropTypes.func,
    additionalClasses: PropTypes.string,
};
