import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Logo from "./components/Logo";
import AudioPlayer from "./components/SpotifyPlayer";


const inter = Inter({ subsets: ["latin"] });

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-space-grotesk',
});

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: '--font-plus-jakarta-sans',
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: '--font-open-sans',
});

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

const otNeueMontreal = localFont({
  src: '../../public/fonts/OT Neue Montreal/otf/OTNeueMontreal-MediumSemiSqueezed.otf',
  variable: '--font-ot-neue-montreal',
  display: 'swap',
});

const otNeueMontrealBold = localFont({
  src: '../../public/fonts/OT Neue Montreal/otf/OTNeueMontreal-BoldSemiSqueezed.otf',
  variable: '--font-ot-neue-montreal-bold',
  display: 'swap',
});

const otNeueMontrealExtraSqueezed = localFont({
  src: '../../public/fonts/OT Neue Montreal/otf/OTNeueMontreal-MediumExtraSqueezed.otf',
  variable: '--font-ot-neue-montreal-extra-squeezed',
  display: 'swap',
});

const vg5000 = localFont({
  src: '../../public/fonts/vg5000/fonts/VG5000-Regular.otf',
  variable: '--font-vg5000',
  display: 'swap',
});

const helmet = localFont({
  src: '../../public/fonts/helmet/Helmet-Regular.ttf',
  variable: '--font-helmet',
  display: 'swap',
});

const sudo = localFont({
  src: '../../public/fonts/sudo/sudo/Sudo-Bold.ttf',
  variable: '--font-sudo',
  display: 'swap',
});

const schaboxCondensed = localFont({
  src: '../../public/fonts/schaboxcondensed/SCHABO-XCondensed.otf',
  variable: '--font-schabox-condensed',
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
    <html lang="en" className={`${bbhSans.variable} ${packHard.variable} ${otNeueMontreal.variable} ${otNeueMontrealBold.variable} ${otNeueMontrealExtraSqueezed.variable} ${vg5000.variable} ${spaceGrotesk.variable} ${helmet.variable} ${sudo.variable} ${schaboxCondensed.variable} ${plusJakartaSans.variable} ${openSans.variable}`}>
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
      <body className={openSans.className}>
        <SmoothScroll />
        <Logo />
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}
