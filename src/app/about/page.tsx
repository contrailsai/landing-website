import About_Page_UI from "./client_ui";

export const metadata = {
    title: 'About Us | Contrails AI',
    description: 'Learn about our vision to shape a world where trust is the foundation of every digital connection. We harness multimodal AI to protect digital lives and create safe online spaces.',
    keywords: 'digital security, AI protection, online safety, trust technology, multimodal AI, cybersecurity, digital trust, safe online communities',
    authors: [{ name: 'Contrails AI' }],
    creator: 'Contrails AI',
    publisher: 'Contrails AI',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://contrails.ai/about',
        title: 'About Us - Digital Trust & AI Security Solutions | Contrails AI',
        description: 'Discover how we\'re building tomorrow\'s digital trust through AI-powered security solutions that protect and empower human connections.',
        siteName: 'Contrails AI',
        images: [
            {
                url: '/og-image.png', // Replace with your actual image
                width: 1200,
                height: 630,
                alt: 'About Contrails AI - Digital Security and AI Solutions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | Contrails AI - Digital Trust & AI Security Solutions',
        description: 'Learn about our mission to create safe digital spaces where trust is unshakable and communities can thrive without fear.',
        creator: '@Contrails AI', // Replace with your Twitter handle
        images: ['/og-image.png'], // Replace with your actual image
    },
    alternates: {
        canonical: 'https://contrails.ai/about',
    },
};

const About_Page = () => {

    return <About_Page_UI />;
};

export default About_Page;