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
  title: "Mitchell Thomas Software Engineer",
  description: "Portfolio showcase of work",
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
        <SmoothScroll />
        <Logo />
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}
