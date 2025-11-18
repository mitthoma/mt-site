import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Logo from "./components/Logo";


const inter = Inter({ subsets: ["latin"] });

const bbhSans = localFont({
  src: '../../public/fonts/BBHSansBogle-Regular.ttf',
  variable: '--font-bbh-sans',
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
    <html lang="en" className={bbhSans.variable}>
      <body className={inter.className}>
        <SmoothScroll />
        <Logo />
        {children}
      </body>
    </html>
  );
}
