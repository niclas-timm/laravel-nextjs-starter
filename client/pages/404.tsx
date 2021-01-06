/*
|--------------------------------------------------------------------------
| 404 Page.
|--------------------------------------------------------------------------
|
| The view that gets rendered when a user tries to visit a route that has
| no matching file in your /pages directory.
| If the user is authenticated, a link to the user home route (defined in your
| .env.local) will be displayed. Otherwise, a link to the homepage will be
| displayed.
|
*/
import { H1 } from "@/components/Typography/Headers";
import Link from "next/link";
import { connect } from "react-redux";

function FourOFour(props: any) {
    /**
     * Determine the link location that the link
     * on the page will lead to. If the user is
     * authenticated, it will be the user home route.
     * Otherwise it will be the homepage.
     */
    const linkLocation = props.isAuthenticated
        ? process.env.NEXT_PUBLIC_USER_HOME_ROUTE
        : "/";

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <H1 center={true} withMargin={true}>
                404 | Nothing to see here!
            </H1>
            <h2 className="text-xl text-purple-500 text-center underline flex hover:text-purple-700 transition">
                <Link href={linkLocation}>
                    <a>Go Home</a>
                </Link>
            </h2>
        </div>
    );
}

// Map redux states to local component props.
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(FourOFour);
