/*
|--------------------------------------------------------------------------
| Meta Tag components.
|--------------------------------------------------------------------------
|
| Here you can find components that are related to the meta tags. You should
| try to include them on as many pages as possible, as they have a high
| relevance for SEO.
|
*/
import Head from "next/head";
import PropTypes from "prop-types";
import {ReactElement} from "react";

export function MetaTags({
    title,
    metaDescription,
    canonical,
    ogDescription,
    ogImage,
    ogUrl,
}): ReactElement {
    return (
        <>
            <Head>
                {/* Title */}
                <title>{title}</title>

                {/* Description */}
                <meta name="description" content={metaDescription} />

                {/* Canocical URL, if given. */}
                {canonical && <meta name="canonical" content={canonical} />}

                {/* Open Graph. */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={ogDescription}></meta>
                {ogImage && <meta property="og:image" content={ogImage}></meta>}
                {ogUrl && <meta property="og:url" content={ogUrl}></meta>}
            </Head>
        </>
    );
}
MetaTags.propTypes = {
    title: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    canonical: PropTypes.string,
    ogDescription: PropTypes.string.isRequired,
    ogImage: PropTypes.string,
    ogUrl: PropTypes.string,
};
