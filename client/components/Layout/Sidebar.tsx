/*
|--------------------------------------------------------------------------
| Sidebar component.
|--------------------------------------------------------------------------
|
| A sidebar component that you can use to wrap the layout of you page.
| It's ideal for admin dashboards or documentation pages where you want
| the user to have broader selection of links or options.
|
*/
import PropTypes from "prop-types";
import tailwindConfig from "./../../tailwind.config";
import { useState } from "react";
import { BurgerCircleButton } from "@/components/Button/button";

/**
 * A page layout that includes a fixed responsive sidebar
 * Ob mobile breakpoints, a button on the top right
 * enables toggling of the sidebar. On Desktop, the
 * sidebar is always visible on the left side.
 *
 * @param {object} props
 */
export function SidebarLayout({ sidebarItems, children }) {
    // Initially, the sidebar will not be shown on mobile breakpoints.
    const [showSidebar, setShowSidebar] = useState(false);

    // Get the breaktpoints from the tailwind configuration and convert them to numbers.
    const breakpoints = {
        sm: parseInt(tailwindConfig.theme.screens.sm.replace("px", "")),
        md: parseInt(tailwindConfig.theme.screens.md.replace("px", "")),
        lg: parseInt(tailwindConfig.theme.screens.lg.replace("px", "")),
        xl: parseInt(tailwindConfig.theme.screens.xl.replace("px", "")),
    };

    /**
     * Toggle the sidebar state.
     */
    const toggleSidebar = () => {
        /**
         * This function should not be called when we're on desktop,
         * since the button for toggling is hidden on desktop. But
         * if the function gets called anyways that we only toggle the
         * sidebar state on mobile breakpoints.
         */
        const windowWidth = window.innerWidth;
        if (windowWidth >= breakpoints.lg) {
            return setShowSidebar(true);
        }
        setShowSidebar(!showSidebar);
    };

    // Set the class list of the sidebar. If the sidebar should not be shown, set the left property to -100%.
    const asideClassList = `w-10/12 md:w-1/3 lg:w-72 fixed h-screen lg:left-0 shadow-lg bg-white flex-grow z-50 transition-all ${
        showSidebar ? "" : "-left-full"
    }`;
    return (
        <div className="w-screen min-h-screen flex relative">
            {/* The sidebar menu on the left side. */}
            <div>
                <aside className={asideClassList}>
                    <div className="w-full h-full p-3 overflow-scroll">
                        {sidebarItems}
                    </div>
                </aside>
            </div>

            {/*  The content area. */}
            <div className="flex-auto w-full lg:ml-72">
                <div className="w-full p-3">{children} </div>
            </div>

            {/* The toggle button that gets show only on mobile. */}
            <BurgerCircleButton
                onClick={toggleSidebar}
                additionalClasses="fixed lg:hidden bottom-0 right-0"
            />
        </div>
    );
}
SidebarLayout.propTypes = {
    sidebarItems: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired,
};
