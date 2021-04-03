/*
|--------------------------------------------------------------------------
| Login View.
|--------------------------------------------------------------------------
|
| The view where a user can log in. Redux is used to make the api call.
|
*/

import React, {ReactElement, useEffect, useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {register} from "@/store/auth/authActions";
import {UserValidator} from "@/services/UserValidator";
import {Card} from "@/components/Card/Card";
import {TextInput} from "@/components/Form/FormElement";
import {H1} from "@/components/Typography/Headers";
import {PrimaryButton} from "@/components/Button/Button";
import {Alert} from "@/components/Alert/Alert";
import Link from "next/link";
import {NextRouter, useRouter} from "next/router";
import {SmallSpinner} from "@/components/Spinner/Spinner";

function Register(props: any): ReactElement {

    // State.
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        password: string;
        password_confirmed: string;
        nameError: string;
        emailError: string;
        passwordError: string;
        password_confirmedError: string;
    }>({
        name: "",
        email: "",
        password: "",
        password_confirmed: "",
        nameError: "",
        emailError: "",
        passwordError: "",
        password_confirmedError: "",
    });

    // The router object used for redirecting after login.
    const router: NextRouter = useRouter();

    // Redirect to user home route if user is authenticated.
    useEffect(() => {
        if (props.isAuthenticated) {
            router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
        }
    });

    /**
     * Handle input change.
     *
     * @param {object} e
     *   The event object.
     */
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
            [`${e.currentTarget.name}Error`]: "",
        });
    };

    /**
     * Submit the form.
     */
    const submit = (): Promise<any> => {
        const {name, email, password, password_confirmed} = formData;

        // Get instance of userValidator class and validate the input.
        const userValidator: UserValidator = new UserValidator();
        const inputErrors: boolean | { name: string, email: string, password: string } = userValidator.validateRegistrationInput(
            name,
            email,
            password,
            password_confirmed,
            8
        );

        // Put error to local state if we have an error.
        if (typeof inputErrors === "object" && inputErrors !== null) {
            setFormData({
                ...formData,
                nameError: inputErrors.name || "",
                emailError: inputErrors.email || "",
                passwordError: inputErrors.password || "",
                password_confirmedError: inputErrors.password || "",
            });
            return;
        }

        // Make API call if validaton was successful.
        props.register(name, email, password, password_confirmed);
    };

    // The Return statement.
    return (
        <div className="w-screen h-screen relative">
            <div
                className="absolute w-full md:w-3/5 lg:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Card
                    additionalInnerClasses="justify-center items-center"
                    additionalWrapperClasses="bg-gray-100"
                >
                    <>
                        {/* Display error message when we have one from the server. */}
                        {props.registerError && (
                            <Alert type="danger">{props.registerError}</Alert>
                        )}

                        {/* The main header */}
                        <H1 withMargin={true} center={true}>
                            Register
                        </H1>

                        {/* Name */}
                        <TextInput
                            type="text"
                            value={formData.name}
                            placeholder="Your name..."
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            name="name"
                            errorMsg={formData.nameError}
                        />

                        {/* Email */}
                        <TextInput
                            type="email"
                            value={formData.email}
                            placeholder="Your email..."
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            name="email"
                            errorMsg={formData.emailError}
                        />

                        {/* Password */}
                        <TextInput
                            type="password"
                            value={formData.password}
                            placeholder="Your password..."
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            name="password"
                            errorMsg={formData.passwordError}
                        />

                        {/* Password confirmation */}
                        <TextInput
                            type="password"
                            value={formData.password_confirmed}
                            placeholder="Confirm your password..."
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            name="password_confirmed"
                            errorMsg={formData.password_confirmedError}
                        />

                        {/* Submit button */}
                        <PrimaryButton
                            onClick={() => {
                                submit();
                            }}
                        >
                            <SmallSpinner show={props.loading}/>
                            Register
                        </PrimaryButton>

                        {/* Additional links. */}
                        <div className="w-full flex mt-3 text-blue-500">
                            <Link href="/user/login">
                                <a className="text-xs underline">
                                    Already have an account?
                                </a>
                            </Link>
                        </div>
                    </>
                </Card>
            </div>
        </div>
    );
}

// Map redux states to local component props.
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    registerError: state.auth.registerError,
    loading: state.auth.registerLoading,
});

// Define Prop Types.
Register.propTypes = {
    props: PropTypes.object,
    register: PropTypes.func,
};
export default connect(mapStateToProps, {register})(Register);
