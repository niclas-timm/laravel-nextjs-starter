import Link from "next/link";
import { PrimaryButton } from "./../../components/Button/Button";
import { logout } from "./../../store/auth/authActions";
import { connect } from "react-redux";
import {useEffect, ReactElement} from "react";
import {NextRouter, useRouter} from "next/router";

function Dashboard(props: any): ReactElement {
    const router: NextRouter = useRouter();

    useEffect(() => {
        if (!props.isAuthenticated) {
            router.push("/user/login");
        }
    }, [props.isAuthenticated]);

    // Return statement.
    return (
        <>
            <div>Dashboard</div>
            <Link href="/user/register">Register</Link>
            <PrimaryButton
                onClick={() => {
                    props.logout();
                }}
            >
                Logout
            </PrimaryButton>
        </>
    );
}
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { logout })(Dashboard);
