import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Logo from "./components/Logo";
import AudioPlayer from "./components/SpotifyPlayer";


const inter = Inter({ subsets: ["latin"] });

const bbhSans = localFont({
  src: '../../public/fonts/BBHSansBogle-Regular.ttf',
  variable: '--font-bbh-sans',
  display: 'swap',
});

const packHard = localFont({
  src: '../../public/fonts/Pack-TRIALHard.otf',
  variable: '--font-pack-hard',
  display: 'swap',
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
    <html lang="en" className={`${bbhSans.variable} ${packHard.variable}`}>
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
