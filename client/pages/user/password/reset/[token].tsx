import {useRouter} from "next/router";
import {Card} from "@/components/Card/Card";
import {PrimaryButton} from "@/components/Button/Button";
import {TextInput} from "@/components/Form/FormElement";
import {H1} from "@/components/Typography/Headers";
import React, {useState} from "react";
import {UserValidator} from "@/services/UserValidator";
import {connect} from "react-redux";
import {resetPassword} from "@/store/auth/authActions";
import {Alert} from "@/components/Alert/Alert";

function ResetPassword(props: any) {
    const router = useRouter();
    const {token} = router.query;

    const [formData, setFormData] = useState<{
        email: string;
        emailError: string;
        password: string;
        passwordError: string;
        password_confirmed: string;
        password_confirmedError: string;
        error: string;
    }>({
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        password_confirmed: "",
        password_confirmedError: "",
        error: "",
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
            emailError: "",
            passwordError: "",
        });
    };

    /**
     * Validate the form data and send it to the api by dispatching a redux action.
     */
    const submit = async (): Promise<void> => {
        const validator: UserValidator = new UserValidator();

        // Check if email is valid.
        const isEmailValid: boolean = validator.validateEmail(formData.email);

        if (!isEmailValid) {
            setFormData({
                ...formData,
                emailError: "Please enter a valid email address.",
            });
            return;
        }

        // Check if passwords are valid and equal.
        const arePasswordsValid: boolean = validator.validatePassword(
            formData.password,
            formData.password_confirmed,
            8
        );

        if (!arePasswordsValid) {
            setFormData({
                ...formData,
                emailError:
                    "Please enter a valid password and make sure you confirm it correctly.",
            });
            return;
        }

        // Make API request via redux.
        const res: any = await props.resetPassword(
            formData.email,
            formData.password,
            token
        );

        // Redirect to home route on successful password reset.
        if (res.success) {
            router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
        }

        // Display danger notification if something went wrong.
        if (res.error) {
            setFormData({
                ...formData,
                error: res.error,
            });
        }
    };

    // Return statement.
    return (
        <div className="w-screen h-screen relative">
            <div
                className="absolute w-full md:w-3/5 lg:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Card
                    additionalInnerClasses="justify-center items-center"
                    additionalWrapperClasses="bg-gray-100"
                >
                    <>
                        {/* Display error Message if applicable */}
                        {formData.error && (
                            <Alert type="danger">{formData.error}</Alert>
                        )}

                        {/* Primary Header */}
                        <H1 withMargin={true} center={true}>
                            Reset your password
                        </H1>
                        <p>
                            You now have the possibility to reset your password.
                            Firstly, please confirm your email address and then
                            create a new password.
                        </p>

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
                            placeholder="Your new password..."
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            name="password"
                            errorMsg={formData.passwordError}
                        />

                        {/* Password confirmed */}
                        <TextInput
                            type="password"
                            value={formData.password_confirmed}
                            placeholder="Confirm your new password"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            name="password_confirmed"
                            errorMsg={formData.password_confirmedError}
                        />

                        {/* Submit Button */}
                        <PrimaryButton
                            onClick={() => {
                                submit();
                            }}
                        >
                            Submit
                        </PrimaryButton>
                    </>
                </Card>
            </div>
        </div>
    );
}

export default connect(null, {resetPassword})(ResetPassword);
