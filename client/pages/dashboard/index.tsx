import Link from "next/link";
import { PrimaryButton } from "./../../components/Button/Button";
import { logout } from "./../../store/auth/authActions";
import { connect } from "react-redux";

function Dashboard(props: any) {
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
export default connect(null, { logout })(Dashboard);
