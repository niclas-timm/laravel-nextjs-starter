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
export function Card(props: any) {
    const outerClasses = `card w-full rounded-md bg-white shadow-md p-3 ${props.additionalClasses}`;
    const innerClasses = `max-w-full h-full mx-auto flex flex-col items-${props.verticalAlign} justify-${props.horizontalAlign} `;

    return (
        <div className={outerClasses}>
            <div className={innerClasses}>{props.children}</div>
        </div>
    );
}
Card.propTypes = {
    children: PropTypes.element,
    verticalAlign: PropTypes.string,
    horizontalAlign: PropTypes.string,
    additionalClasses: PropTypes.string,
};
