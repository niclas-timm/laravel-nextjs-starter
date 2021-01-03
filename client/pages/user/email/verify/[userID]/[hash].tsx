import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { verifyEmail } from "../../../../../store/auth/authActions";
import { Card } from "./../../../../../components/Card/Card";
import { H1 } from "./../../../../../components/Typography/Headers";
import { SmallSpinner } from "./../../../../../components/Spinner/Spinner";

function VerifyPassword(props: any) {
    const router = useRouter();
    const { expires, signature, userID, hash } = router.query;

    const [state, setState] = useState({
        error: "",
        loading: true,
    });

    useEffect(async () => {
        const res = await props.verifyEmail(userID, hash, expires, signature);
        if (res.success) {
            setState({
                ...state,
                loading: false,
                error: "",
            });
            setTimeout(() => {
                router.push("/dashboard");
            }, 3000);
            return;
        }
        if (res.error) {
            setState({
                ...state,
                loading: false,
                error: res.error,
            });
        }
    }, []);

    const headerText = () => {
        if (state.loading) {
            return "We are currently validating your email address...";
        } else if (!state.loading && !state.error) {
            return "Verification successfull!";
        }
        return "Verification failed!";
    };
    const header = headerText();

    const paragraphText = () => {
        if (state.loading) {
            return "";
        } else if (!state.loading && !state.error) {
            return "Perfect! You will be redirected shortly....";
        }
        return "Sorry, something went wrong!";
    };
    const paragraph = paragraphText();

    return (
        <div className="w-screen h-screen relative">
            <div className="absolute w-full md:w-3/5 lg:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Card
                    verticalAlign="center"
                    horizontalAlign="center"
                    additionalClasses="bg-gray-100"
                >
                    <>
                        <H1 withMargin={true} center={true}>
                            {header}
                        </H1>
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
