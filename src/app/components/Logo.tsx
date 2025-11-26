"use client";
import { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatedBorderLink } from './AnimatedBorder';

export default function Logo() {
  const [isMounted, setIsMounted] = useState(false);

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
      <div 
        onClick={scrollToTop}
        className="fixed left-[5px] z-[9999] cursor-pointer transition-all duration-300"
        style={{
          top: '5px',
        }}
      >
        <Image 
          src="/images/logo2.svg" 
          alt="Mitchell Thomas Logo" 
          width={224}
          height={224}
          priority
          style={{
            height: '7rem',
            width: 'auto'
          }}
        />
      </div>
      
      {/* Desktop Links - Hidden on Mobile */}
      <div className="hidden md:flex fixed right-4 z-[9999] gap-4" style={{
        top: '2rem'
      }}>
        <AnimatedBorderLink 
          href="https://github.com/mitthoma"
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '0.75rem 1.25rem',
            color: '#eaeaea',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          GitHub
        </AnimatedBorderLink>
        <AnimatedBorderLink 
          href="https://linkedin.com/in/mitchellthecoder"
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '0.75rem 1.25rem',
            color: '#eaeaea',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          LinkedIn
        </AnimatedBorderLink>
      </div>
      
      <style jsx>{`
        @media (min-width: 768px) {
          img {
            height: 4rem !important;
          }
        }
      `}</style>
    </Fragment>
  );
}