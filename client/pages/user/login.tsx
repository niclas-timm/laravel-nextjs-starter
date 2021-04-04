/*
|--------------------------------------------------------------------------
| Login View.
|--------------------------------------------------------------------------
|
| The view where a user can log in. Redux is used to make the api call.
|
*/

import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "@/store/auth/authActions";
import { UserValidator } from "@/services/UserValidator";
import { Card } from "@/components/Card/Card";
import { TextInput } from "@/components/Form/FormElement";
import { H1 } from "@/components/Typography/Headers";
import { PrimaryButton } from "@/components/Button/Button";
import { Alert } from "@/components/Alert/Alert";
import { useRouter } from "next/router";
import Link from "next/link";
import { SmallSpinner } from "@/components/Spinner/Spinner";

const Login = (props: any): ReactElement => {
    /**
     * The state.
     */
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
        emailError: string;
        passwordError: string;
    }>({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
    });

    // The router object used for redirecting after login.
    const router = useRouter();

    // Redirect to user home route if user is authenticated.
    useEffect(() => {
        if (props.isAuthenticated && !props.loading) {
            router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
        }
    }, [props.isAuthenticated, props.loading]);

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
            emailError: "",
            passwordError: "",
        });
    };

    /**
     * Submit the form.
     */
    const submit = (): Promise<void> => {
        const userValidator: UserValidator = new UserValidator();
        const { email, password } = formData;

        // Check for valid email address.
        const isEmailValid: boolean = userValidator.validateEmail(email);
        if (!isEmailValid) {
            setFormData({
                ...formData,
                emailError: "Please provide a valid email address",
            });
            return;
        }

        // Check for valid password.
        if (!password) {
            setFormData({
                ...formData,
                passwordError: "Please provide a valid password",
            });
            return;
        }

        // Make API call if everything is fine.
        props.login(email, password);
    };

    // Return statement.
    return (
        <div className="w-screen h-screen relative">
            <div className="absolute w-full md:w-3/5 lg:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Card
                    additionalInnerClasses="justify-center items-center"
                    additionalWrapperClasses="bg-gray-100"
                >
                    <>
                        {props.loginError && (
                            <Alert type="danger">{props.loginError}</Alert>
                        )}
                        {/* The main Header */}
                        <H1 withMargin={true} center={true}>
                            Login
                        </H1>

                        {/* Email */}
                        <TextInput
                            type="text"
                            value={formData.email}
                            placeholder="Your email address..."
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

                        {/* Submit Button */}
                        <PrimaryButton
                            onClick={() => {
                                submit();
                            }}
                        >
                            <SmallSpinner show={props.loading} />
                            Login
                        </PrimaryButton>

                        {/* Additional links. */}
                        <div className="w-full flex justify-between mt-3 text-blue-500">
                            <Link href="/user/register">
                                <a className="text-xs underline">
                                    No Account yet?
                                </a>
                            </Link>
                            <Link href="/user/password/forgot">
                                <a className="text-xs underline">
                                    Forgot password?
                                </a>
                            </Link>
                        </div>
                    </>
                </Card>
            </div>
        </div>
    );
};

// Map redux states to local component props.
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginError: state.auth.loginError,
    loading: state.auth.loginLoading,
});

// Define PropTypes.
Login.propTypes = {
    props: PropTypes.object,
    login: PropTypes.func,
};

export default connect(mapStateToProps, { login })(Login);
