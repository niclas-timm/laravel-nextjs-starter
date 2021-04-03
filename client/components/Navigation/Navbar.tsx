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
import {ReactElement, useState} from "react";
import PropTypes from "prop-types";

/**
 * The default nabvar.
 */
export function Navbar(): ReactElement {
    const [showSidebar, toggleSidebar] = useState<boolean>(false);

    const toggleNavbar = (): void => {
        toggleSidebar(!showSidebar);
    };

    const sidebarOffset: string = `${
        showSidebar
            ? "right-0"
            : "-right-full md:-right-1/2 lg:-right-1/3 xl:-right-1/4"
    }`;

    // Return statement.
    return (
        <>
            {/* The Menu Bar that the horizontal bar at the top of the screen that is shown on all breakpoints. It includes the logo als well as the Burger Menu */}
            <MenuBar onClick={toggleNavbar} />
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
                <NavbarMenuLink title="Home" link="/" onClick={toggleNavbar} />
                <NavbarMenuLink
                    title="Documentation"
                    link="/docs"
                    onClick={toggleNavbar}
                />
                <NavbarMenuLink
                    title="Blog"
                    link="/blog"
                    onClick={toggleNavbar}
                />
                <NavbarMenuLink
                    title="Contact"
                    link="/contact"
                    onClick={toggleNavbar}
                />
            </div>
        </>
    );
}

/**
 * A Mega Menu that takes the full witdth and height of the screen.
 */
export function MegaMenu(): ReactElement {
    const [showSidebar, toggleSidebar] = useState<boolean>(false);

    const toggleNavbar = (): void => {
        toggleSidebar(!showSidebar);
    };

    const sidebarOffset: string = `${showSidebar ? "right-0" : "-right-full"}`;

    // Return statement.
    return (
        <>
            {/* The Menu Bar that the horizontal bar at the top of the screen that is shown on all breakpoints. It includes the logo als well as the Burger Menu */}
            <MenuBar onClick={toggleNavbar} />
            <div
                className={`h-screen w-screen fixed top-0 right-0 transition-all bg-purple-50 ${sidebarOffset} flex flex-col items-center justiy-start z-50 shadow-lg pt-8 pb-16 px-10`}
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
                <NavbarMenuLink title="Home" link="/" onClick={toggleNavbar} />
                <NavbarMenuLink
                    title="Documentation"
                    link="/docs"
                    onClick={toggleNavbar}
                />
                <NavbarMenuLink
                    title="Blog"
                    link="/blog"
                    onClick={toggleNavbar}
                />
                <NavbarMenuLink
                    title="Contact"
                    link="/contact"
                    onClick={toggleNavbar}
                />
            </div>
        </>
    );
}

/**
 * A Link that can be displayed in the menu.
 * @param {object} props
 */
export function NavbarMenuLink({ title, link, onClick }): ReactElement {
    return (
        <Link href={link}>
            <h4
                onClick={onClick}
                className="cursor-pointer text-2xl mb-8 hover:text-purple-700 transition-all"
            >
                {title}
            </h4>
        </Link>
    );
}
NavbarMenuLink.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

// The horizontal menu bar.
export function MenuBar({ onClick }): ReactElement {
    return (
        <nav className="w-screen py-3 px-2 flex sticky top-0 items-center justify-between bg-purple-50 z-40">
            <Link href="/">
                <a>Blog</a>
            </Link>
            <div className="h-full cursor-pointer" onClick={onClick}>
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
    );
}
MenuBar.propTypes = {
    onClick: PropTypes.func.isRequired
};
