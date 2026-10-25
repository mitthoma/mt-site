"use client";
import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatedBorderLink } from './AnimatedBorder';

export default function Logo() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Fragment>
      <Link
        href="/"
        onClick={(e) => { if (isHome) { e.preventDefault(); scrollToTop(); } }}
        aria-label={isHome ? 'Mitchell Thomas — back to top' : 'Mitchell Thomas — home'}
        className="fixed left-[5px] z-[9999] cursor-pointer transition-all duration-300 no-underline"
        style={{
          top: '5px',
        }}
      >
        <span style={{
          display: 'block',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 'bold',
          color: '#fff',
          letterSpacing: '-0.05em',
          lineHeight: '0.9',
          margin: 0,
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          padding: '1rem',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
        }}>
          MITCHELL<br/>
          THOMAS
        </span>
      </Link>
      
      {/* Desktop nav — mission-control controls */}
      <nav className="hidden md:flex fixed right-4 z-[9999] gap-2" style={{ top: '1.25rem' }} aria-label="Primary">
        <AnimatedBorderLink href="/work" external={false} index="01" active={pathname.startsWith('/work')}>Work</AnimatedBorderLink>
        <AnimatedBorderLink href="/blog" external={false} index="02" active={pathname.startsWith('/blog')}>Blog</AnimatedBorderLink>
        <AnimatedBorderLink href="/now" external={false} index="03" active={pathname.startsWith('/now')}>Now</AnimatedBorderLink>
        <AnimatedBorderLink href="https://github.com/mitthoma" index="04">GitHub</AnimatedBorderLink>
        <AnimatedBorderLink href="https://linkedin.com/in/mitchellthecoder" index="05">LinkedIn</AnimatedBorderLink>
      </nav>
    </Fragment>
  );
}