import { GetServerSideProps } from "next";
import axios from "axios";

function Dashboard() {
    return (
        <>
            <div>Dashboard</div>
        </>
    );
}
export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    try {
        // CSRF.
        await axios.get("/sanctum/csrf-cookie");

        /**
         * As the API call is executed on the server it by
         * default does not have the cookies set in the browser.
         * Fortunately, we can extract these cookies from the req object
         * and attach them to the api call.
         */
        const res = await axios.get("/api/user", {
            headers: { Cookie: req.headers.cookie },
        });

        // Attach
        if (res.status === 200) {
            return {
                props: {
                    user: res.data,
                },
            };
        } else {
            return {
                props: {
                    user: false,
                },
            };
        }
    } catch (error) {
        return {
            props: {
                user: false,
            },
        };
    }
};
