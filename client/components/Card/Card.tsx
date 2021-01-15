/*
|--------------------------------------------------------------------------
| Card components.
|--------------------------------------------------------------------------
|
| A collection of Components that fall under the "card" category and deliver
| a nice ui separation from the rest of the websites content.
|
*/

import PropTypes from "prop-types";

/**
 * The default card element.
 *
 * @param {object} props
 *   The props object.
 */
export function Card({
    additionalWrapperClasses,
    additionalInnerClasses,
    children,
}) {
    const outerClasses = `card w-full rounded-md bg-white shadow-md p-3 ${additionalWrapperClasses}`;
    const innerClasses = `max-w-full h-full mx-auto flex flex-col ${additionalInnerClasses}`;

    return (
        <div className={outerClasses}>
            <div className={innerClasses}>{children}</div>
        </div>
    );
}
Card.propTypes = {
    children: PropTypes.element,
    additionalInnerClasses: PropTypes.string,
    additionalWrapperClasses: PropTypes.string,
};
