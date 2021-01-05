/*
|--------------------------------------------------------------------------
| A collection of navbar components.
|--------------------------------------------------------------------------
|
| Use any one you like. Once you decided for one, you might want to consider
| deleting the others to keep you javascript bundle size as small as possible.
|
*/

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
    const [showSidebar, toggleSidebar] = useState(false);

    const toggleNavbar = () => {
        toggleSidebar(!showSidebar);
    };

    const sidebarOffset = `${
        showSidebar
            ? "right-0"
            : "-right-full md:-right-1/2 lg:-right-1/3 xl:-right-1/4"
    }`;
    return (
        <>
            <nav className="w-screen py-3 px-2 flex items-center justify-between">
                <Link href="/">
                    <a>Blog</a>
                </Link>
                <div className="h-full cursor-pointer" onClick={toggleNavbar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-full w-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </div>
            </nav>
            <div
                className={`h-screen w-full md:w-1/2 lg:w-1/3 xl:w-1/4 fixed top-0 right-0 transition-all bg-purple-50 ${sidebarOffset} flex flex-col items-center justiy-start z-50 shadow-lg pt-8 pb-16 px-10`}
            >
                <div
                    className="flex justify-end w-full pb-8 cursor-pointer"
                    onClick={toggleNavbar}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-full w-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <Link href="/">
                    <h4
                        onClick={toggleNavbar}
                        className="cursor-pointer text-2xl mb-8 hover:text-purple-700 transition-all"
                    >
                        Home
                    </h4>
                </Link>
                <Link href="/docs">
                    <h4
                        onClick={toggleNavbar}
                        className="cursor-pointer text-2xl mb-8 hover:text-purple-700 transition-all"
                    >
                        Docs
                    </h4>
                </Link>
                <Link href="/blog">
                    <h4
                        onClick={toggleNavbar}
                        className="cursor-pointer text-2xl mb-8 hover:text-purple-700 transition-all"
                    >
                        Blog
                    </h4>
                </Link>
                <Link href="/contact">
                    <h4
                        onClick={toggleNavbar}
                        className="cursor-pointer text-2xl mb-8 hover:text-purple-700 transition-all"
                    >
                        Contact
                    </h4>
                </Link>
            </div>
        </>
    );
}
export default Navbar;
