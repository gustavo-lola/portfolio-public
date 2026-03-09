import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
}

export function SEO({
    title = "Gustavo Lóla | Desenvolvedor de Software",
    description = "Portfólio de Gustavo Lóla, desenvolvedor de Software, backend e frontend, especialista em React, TypeScript, Node.js, automação, APIs, projetos open source e soluções digitais.",
    url = "https://gustavolola.dev",
    image = "https://gustavolola.dev/og-image.png",
}: SEOProps) {
    return (
        <Helmet htmlAttributes={{ lang: "pt-BR" }}>
            <title>{title}</title>

            <meta name="description" content={description} />
            <meta
                name="keywords"
                content="Gustavo Lóla, Gustavo Lola, portfólio, desenvolvedor fullstack, React, TypeScript, Node.js, backend, frontend, projetos, Arapiraca"
            />

            <meta name="author" content="Gustavo Lóla, Gustavo Lola" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#000000" />

            <link rel="canonical" href={url} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
