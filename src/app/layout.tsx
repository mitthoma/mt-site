import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Tomorrow } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Logo from "./components/Logo";
import AudioPlayer from "./components/SpotifyPlayer";


const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true
});

const tomorrow = Tomorrow({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-tomorrow',
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mitchell-codes.com'),
  title: {
    default: 'Mitchell Thomas | Senior Full Stack Software Engineer | 7+ Years Experience',
    template: '%s | Mitchell Thomas - Full Stack Developer'
  },
  description: 'Senior Full Stack Software Engineer with 7+ years experience in React, Next.js, Node.js, blockchain development, and cloud architecture. Specializing in scalable web applications, AI integration, and modern UI/UX.',
  keywords: [
    'Mitchell Thomas',
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Node.js Engineer',
    'Blockchain Developer',
    'Web3 Developer',
    'Solidity Developer',
    'TypeScript Developer',
    'JavaScript Developer',
    'Frontend Developer',
    'Backend Developer',
    'Cloud Architecture',
    'AWS Developer',
    'Firebase Developer',
    'PostgreSQL',
    'MongoDB',
    'Vue.js Developer',
    'Nuxt.js Developer',
    'Full Stack Engineer',
    'Software Developer',
    'Web Developer',
    'UI/UX Developer',
    'Responsive Design',
    'RESTful API',
    'GraphQL',
    'Microservices',
    'DevOps',
    'CI/CD',
    'Git',
    'Agile Development'
  ],
  authors: [{ name: 'Mitchell Thomas', url: 'https://mitchell-codes.com' }],
  creator: 'Mitchell Thomas',
  publisher: 'Mitchell Thomas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mitchell-codes.com',
    title: 'Mitchell Thomas | Senior Full Stack Software Engineer',
    description: 'Senior Full Stack Software Engineer with 7+ years experience. Specializing in React, Next.js, blockchain development, and scalable cloud architectures.',
    siteName: 'Mitchell Thomas - Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mitchell Thomas - Full Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mitchell Thomas | Senior Full Stack Software Engineer',
    description: 'Senior Full Stack Software Engineer with 7+ years experience in modern web technologies and blockchain development.',
    images: ['/images/og-image.png'],
    creator: '@mitchellthecoder',
  },
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://mitchell-codes.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mitchell-codes.com/#person",
        "name": "Mitchell Thomas",
        "url": "https://mitchell-codes.com",
        "image": "https://mitchell-codes.com/images/og-image.png",
        "jobTitle": "Senior Full Stack Software Engineer",
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance"
        },
        "description": "Senior Full Stack Software Engineer with 7+ years experience specializing in React, Next.js, blockchain development, and cloud architecture.",
        "knowsAbout": [
          "React", "Next.js", "Node.js", "TypeScript", "JavaScript", 
          "Blockchain", "Web3", "Solidity", "Vue.js", "Nuxt.js",
          "PostgreSQL", "MongoDB", "Firebase", "AWS", "Docker",
          "GraphQL", "REST API", "Microservices", "CI/CD"
        ],
        "sameAs": [
          "https://github.com/mitthoma",
          "https://linkedin.com/in/mitchellthecoder"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://mitchell-codes.com/#website",
        "url": "https://mitchell-codes.com",
        "name": "Mitchell Thomas - Full Stack Software Engineer",
        "description": "Portfolio showcasing full stack development projects and expertise",
        "publisher": {
          "@id": "https://mitchell-codes.com/#person"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": "https://mitchell-codes.com/#webpage",
        "url": "https://mitchell-codes.com",
        "name": "Mitchell Thomas | Senior Full Stack Software Engineer",
        "isPartOf": {
          "@id": "https://mitchell-codes.com/#website"
        },
        "about": {
          "@id": "https://mitchell-codes.com/#person"
        },
        "description": "Senior Full Stack Software Engineer with 7+ years experience in React, Next.js, Node.js, blockchain development, and cloud architecture.",
        "inLanguage": "en-US"
      },
      {
        "@type": "ProfilePage",
        "mainEntity": {
          "@id": "https://mitchell-codes.com/#person"
        }
      }
    ]
  };

  return (
    <html lang="en" className={tomorrow.variable}>
      <head>
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="beforeInteractive"
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J15MBE2V1V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J15MBE2V1V');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <SmoothScroll />
        <Logo />
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}
