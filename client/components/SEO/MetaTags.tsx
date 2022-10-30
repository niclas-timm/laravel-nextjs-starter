import Head from "next/head";
import PropTypes from "prop-types";
import { ReactElement } from "react";

// COMPONENT
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

export const OriginalMetaTags = ({
    pageName = "Clinic"
}:{
    pageName?: string;
}) => {
    return (
        <Head>
            <title>{pageName} | Kelompok 4</title>
            <meta name="description" content="E-Commerce Tim 4 Present. Fast Clinic Reservation with SEO friendly" />
            <meta name="keywords" content="E-Commerce,Clinic,Laravel,NextJS" />
            <link
                rel="shortcut icon"
                href="https://w7.pngwing.com/pngs/957/974/png-transparent-hospital-logo-clinic-health-care-physician-business-thumbnail.png"
                type="image/png"
            />
        </Head>
    )
}

// PROPS
MetaTags.propTypes = {
    title: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    canonical: PropTypes.string,
    ogDescription: PropTypes.string.isRequired,
    ogImage: PropTypes.string,
    ogUrl: PropTypes.string,
};
