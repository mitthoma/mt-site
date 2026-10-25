import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Tomorrow } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Logo from "./components/Logo";


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

const SITE_URL = "https://mitchell-codes.com";
const TITLE = "Mitchell Thomas — Senior Full-Stack & AI Engineer";
const DESCRIPTION =
  "Senior full-stack and AI engineer in Nashville. 8 years shipping Node, React/Next, Vue/Nuxt, TypeScript and PostgreSQL products; now building agent systems and agentic workflows that replace real business processes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Mitchell Thomas",
  },
  description: DESCRIPTION,
  applicationName: "Mitchell Thomas",
  authors: [{ name: "Mitchell Thomas", url: SITE_URL }],
  creator: "Mitchell Thomas",
  keywords: [
    "Mitchell Thomas",
    "senior full-stack engineer",
    "AI engineer",
    "forward deployed engineer",
    "agentic systems",
    "LLM integration",
    "Node.js",
    "React",
    "Next.js",
    "Vue",
    "Nuxt",
    "TypeScript",
    "PostgreSQL",
    "Nashville",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Mitchell Thomas",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    firstName: "Mitchell",
    lastName: "Thomas",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
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
  return (
    <html lang="en" className={tomorrow.variable}>
      <head>
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
        <script
          type="application/ld+json"
          // Person schema so search engines attach the right entity to the domain.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mitchell Thomas",
              url: SITE_URL,
              jobTitle: "Senior Full-Stack & AI Engineer",
              description: DESCRIPTION,
              address: { "@type": "PostalAddress", addressLocality: "Nashville", addressRegion: "TN", addressCountry: "US" },
              alumniOf: { "@type": "CollegeOrUniversity", name: "Indiana University Bloomington" },
              worksFor: { "@type": "Organization", name: "OPEN Health" },
              sameAs: [
                "https://github.com/mitthoma",
                "https://linkedin.com/in/mitchellthecoder",
                "https://mitchellthecoder.medium.com",
              ],
              knowsAbout: [
                "Agentic systems",
                "LLM integration",
                "Node.js",
                "React",
                "Next.js",
                "Vue",
                "Nuxt",
                "TypeScript",
                "PostgreSQL",
                "AWS",
              ],
            }),
          }}
        />
        <SmoothScroll />
        <Logo />
        {/* AudioPlayer is mounted by the home page (src/app/page.tsx), which owns its
            open/close state for the mobile menu. Mounting it here too produced two
            <audio> elements and duplicate controls in the tab order (issue #12). */}
        {children}
      </body>
    </html>
  );
}
