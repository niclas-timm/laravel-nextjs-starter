/*
|--------------------------------------------------------------------------
| Login View.
|--------------------------------------------------------------------------
|
| The view where a user can log in. Redux is used to make the api call.
|
*/

import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "./../../store/auth/authActions";
import { UserValidator } from "./../../services/UserValidator";

function Register(props: {}) {
    /**
     * The state.
     */
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmed: "",
        error: "",
    });

    /**
     * Handle input change.
     *
     * @param {object} e
     *   The event object.
     */
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
            error: "",
        });
    };

    /**
     * Submit the form.
     */
    const submit = () => {
        const { name, email, password, password_confirmed } = formData;

        // Get instance of userValidator class and validate the input.
        const userValidator = new UserValidator();
        const isInputValid = userValidator.validateRegistrationInput(
            name,
            email,
            password,
            password_confirmed,
            8
        );

        // Put error to local state if we have an error.
        if (!isInputValid) {
            setFormData({
                ...formData,
                error: "Please make sure to provide valid data.",
            });
            return;
        }

        // Make API call if validaton was successful.
        props.register(name, email, password, password_confirmed);
    };

    /**
     * The Return statement. Responsible for rendering the markup.
     */
    return (
        <div>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                    handleInputChange(e);
                }}
                name="name"
            />
            <input
                type="text"
                value={formData.email}
                onChange={(e) => {
                    handleInputChange(e);
                }}
                name="email"
            />
            <input
                type="password"
                value={formData.password}
                onChange={(e) => {
                    handleInputChange(e);
                }}
                name="password"
            />
            <input
                type="password"
                value={formData.password_confirmed}
                onChange={(e) => {
                    handleInputChange(e);
                }}
                name="password_confirmed"
            />
            <button
                onClick={() => {
                    submit();
                }}
            >
                Submit
            </button>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    credentialsError: state.auth.credentialsError,
});

Register.propTypes = {
    props: PropTypes.object,
    register: PropTypes.func,
};

export default connect(mapStateToProps, { register })(Register);
