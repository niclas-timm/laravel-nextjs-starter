/*
|--------------------------------------------------------------------------
| Email verification view.
|--------------------------------------------------------------------------
|
| The user will get the link to this view per mail. It includes userId, hash,
| expiration data and signature in the url, which will be sent to the api upon
| mount of the app. If the email verification was successfull, the user will be
| redirected to the dashboard.
|
*/
import { NextRouter, useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import { verifyEmail } from "../../../../../store/auth/authActions";
import { Card } from "./../../../../../components/Card/Card";
import { H1 } from "./../../../../../components/Typography/Headers";
import { SmallSpinner } from "./../../../../../components/Spinner/Spinner";

function VerifyPassword(props: any): ReactElement {
    const router: NextRouter = useRouter();

    const { expires, signature, userID, hash } = router.query;

    // State.
    const [state, setState] = useState<{
        error: string;
        loading: boolean;
    }>({
        error: "",
        loading: true,
    });

    // Send api request to api upon mount of the component.
    useEffect(() => {
        const verify = async () => {
            const res = await props.verifyEmail(
                userID,
                hash,
                expires,
                signature
            );

            // Successfull verification.
            if (res.success) {
                setState({
                    ...state,
                    loading: false,
                    error: "",
                });

                // Redirect to Home route of the user after 3 seconds.
                setTimeout(() => {
                    router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
                }, 3000);
                return;
            }

            // Set error message if verification failed.
            if (res.error) {
                setState({
                    ...state,
                    loading: false,
                    error: res.error,
                });
            }
        };
        verify();
    }, []);

    /**
     * Set the text for the H1 header depending on verification status.
     */
    const headerText = (): string => {
        if (state.loading) {
            return "We are currently validating your email address...";
        } else if (!state.loading && !state.error) {
            return "Verification successfull!";
        }
        return "Verification failed!";
    };
    const header = headerText();

    /**
     * Set the text for the paragraph depending on verification status.
     */
    const paragraphText = (): string => {
        if (state.loading) {
            return "";
        } else if (!state.loading && !state.error) {
            return "Perfect! You will be redirected shortly....";
        }
        return "Sorry, something went wrong!";
    };

    const paragraph: string = paragraphText();

    // Return statement.
    return (
        <div className="w-screen h-screen relative">
            <div className="absolute w-full md:w-3/5 lg:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Card */}
                <Card
                    additionalInnerClasses="justify-center items-center"
                    additionalWrapperClasses="bg-gray-100"
                >
                    <>
                        {/* Header */}
                        <H1 withMargin={true} center={true}>
                            {header}
                        </H1>

                        {/* Paragraph */}
                        <p>
                            {" "}
                            {<SmallSpinner show={state.loading} />}{" "}
                            <span>{paragraph}</span>
                        </p>
                    </>
                </Card>
            </div>
        </div>
    );
}

export default connect(null, { verifyEmail })(VerifyPassword);
