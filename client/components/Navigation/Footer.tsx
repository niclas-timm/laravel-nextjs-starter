/*
|--------------------------------------------------------------------------
| A collection of Footer components.
|--------------------------------------------------------------------------
|
| Use any one you like. Once you decided for one, you might want to consider
| deleting the others to keep you javascript bundle size as small as possible.
|
*/

import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Grid layout. Defaults to three colums per row.
 */
export function AdvancedFooter() {
    // Customize to your needs. The footer ui will be composed of this data.
    const footerData = [
        // First col.
        {
            headline: "Links",
            content: [
                { title: "Home", link: "/" },
                { title: "Docs", link: "/docs" },
                { title: "Blog", link: "/blog" },
                { title: "Contact", link: "/contact" },
            ],
        },
        // Second col.
        {
            headline: "Social Media",
            content: [
                { title: "Twitter", link: "https://twitter.com/niclas_timm" },
                {
                    title: "GitHub",
                    link:
                        "https://github.com/NiclasTimmeDev/laravel-nextjs-starter/",
                },
            ],
        },
        // Third col.
        {
            headline: "Legal",
            content: [
                { title: "Privacy", link: "/privacy" },
                { title: "Imprint", link: "/imprint" },
            ],
        },
    ];

    /**
     * Map over the footerData array. For every object in the array,
     * return a new div with a headline and as many links as defined
     * in the .content of the currently mapped over object.
     */
    const footerCols = footerData.map((element) => {
        return (
            <div key={element.headline}>
                <h4 className="text-lg">{element.headline}</h4>
                {/* Map over every entry in the content and return an footer link component. */}
                {element.content.map((link) => {
                    return (
                        <FooterLink
                            key={link.link}
                            title={link.title}
                            link={link.link}
                        />
                    );
                })}
            </div>
        );
    });

    return (
        <footer className="w-screen py-4 px-2 bg-purple-50">
            <div className=" container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
                {footerCols}
            </div>
        </footer>
    );
}

/**
 * A link that will be displayed in the Footer.
 *
 * @param {object} props
 *   The props, including title and link.
 */
export function FooterLink({ title, link }) {
    return (
        <Link href={link}>
            <h5 className="text-purple-500 hover:text-purple-700 hover:underline">
                {title}
            </h5>
        </Link>
    );
}
FooterLink.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};
