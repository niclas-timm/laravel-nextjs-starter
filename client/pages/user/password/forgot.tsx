import React, {ReactElement, useState} from "react";
import {Card} from "@/components/Card/Card";
import {TextInput} from "@/components/Form/FormElement";
import {H1} from "@/components/Typography/Headers";
import {PrimaryButton} from "@/components/Button/Button";
import {connect} from "react-redux";
import {forgotPassword} from "@/store/auth/authActions";
import {Alert} from "@/components/Alert/Alert";

function ForgotPassword(props: any): ReactElement {
    const [formData, setFormData] = useState<{
        email: string;
        emailError: string;
        notificationAlert: {
            type: string;
            msg: string;
        };
    }>({
        email: "",
        emailError: "",
        notificationAlert: {
            type: "",
            msg: "",
        },
    });

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
            emailError: "",
        });
    };

    /**
     * The submit action.
     */
    const submit = async (): Promise<void> => {

        const res: any = await props.forgotPassword(formData.email);
        if (res.error) {
            setFormData({
                ...formData,
                notificationAlert: {
                    type: "danger",
                    msg: res.error,
                },
            });
        } else if (res.success) {
            setFormData({
                ...formData,
                notificationAlert: {
                    type: "success",
                    msg: res.success,
                },
            });
        }
    };

    // Returns statement.
    return (
        <div className="w-screen h-screen relative">
            <div
                className="absolute w-full md:w-3/5 lg:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Card
                    additionalInnerClasses="justify-center items-center"
                    additionalWrapperClasses="bg-gray-100"
                >
                    <>
                        {/* Alert message. */}
                        {formData.notificationAlert.type && (
                            <Alert type={formData.notificationAlert.type}>
                                {formData.notificationAlert.msg}
                            </Alert>
                        )}
                        <H1 withMargin={true} center={true}>
                            Forgot your password?
                        </H1>
                        <p>
                            Enter your email and we will send you a link to
                            reset your password.
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

export default connect(null, {forgotPassword})(ForgotPassword);
