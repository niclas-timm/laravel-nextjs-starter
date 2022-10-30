import Link from "next/link";
import { H1 } from "./../components/Typography/Headers";

export default function Home() {
    return (
        <>
            <div className="flex w-screen h-screen items-center justify-center">
                <div className="w-1/2">
                    <H1 center={true} withMargin={true}>
                        Welcome to the Laravel Next.js Starter Kit
                    </H1>

                    <p className="text-center mb-4 mt-12">
                        What do you want to do?
                    </p>
                    <div className="flex justify-between items-center text-blue-500 underline">
                        <Link href="https://github.com/NiclasTimmeDev/laravel-nextjs-starter">
                            Documentation
                        </Link>
                        <Link href="/user/login">Login</Link>
                        <Link href="/user/register">Register</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
