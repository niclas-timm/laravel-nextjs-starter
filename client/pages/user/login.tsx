/*
|--------------------------------------------------------------------------
| Login View.
|--------------------------------------------------------------------------
|
| The view where a user can log in. Redux is used to make the api call.
|
*/

import { ChangeEvent, FormEvent, useState } from "react";
import { connect } from "react-redux";
import PropTypes, { string } from "prop-types";
import { login } from "./../../store/actions/auth";

const Login = (props: {}) => {
    /**
     * The state.
     */
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

    const submit = () => {
        const { email, password } = formData;
        props.login(email, password);
    };

    /**
     * The Return statement. Responsible for rendering the markup.
     */
    return (
        <div>
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
            <button
                onClick={() => {
                    submit();
                }}
            >
                Submit
            </button>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    credentialsError: state.auth.credentialsError,
});

Login.propTypes = {
    props: PropTypes.object,
    login: PropTypes.func,
};

export default connect(mapStateToProps, { login })(Login);
