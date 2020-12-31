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

/**
 * Text input field.
 *
 * @param {object} props
 *   The props object.
 */
export function TextInput(props: any) {
    const inputClasses = `w-full px-1 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 border ${
        props.errorMsg ? "border-red-500" : "border-transparent"
    } shadow-md focus:border-transparent`;
    return (
        <div className="text-input w-full mb-2">
            <input
                type={props.type || "text"}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                placeholder={props.placeholder || ""}
                className={inputClasses}
            />
            {/* Shor error message if given. */}
            {props.errorMsg && (
                <div className="text-red-500">{props.errorMsg}</div>
            )}
        </div>
    );
}
TextInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
};

/**
 * Textarea input field.
 *
 * @param {object} props
 *   The props object.
 */
export function TextArea(props: any) {
    return (
        <div>
            <textarea
                name={props.name}
                rows={3}
                placeholder={props.placeholder}
                onChange={props.onChange}
                cols={50}
                className="w-full p-1 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 border border-transparent focus:border-transparent"
            >
                {props.value}
            </textarea>
            {props.errorMsg && <div>{props.errorMsg}</div>}
        </div>
    );
}
TextArea.propTypes = {
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
};
