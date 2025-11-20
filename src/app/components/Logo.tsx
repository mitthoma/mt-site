"use client";
import { Fragment, useState, useEffect } from 'react';

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
          top: '-30px',
        }}
      >
        <h1 className="mt-5 font-bold tracking-tight text-white font-[family-name:var(--font-bbh-sans)]" style={{
          fontSize: '3.5rem'
        }}>
          Mitchell Thomas
        </h1>
      </div>
      
      {/* Desktop Links - Hidden on Mobile */}
      <div className="hidden md:flex fixed right-4 z-[9999] gap-4" style={{
        top: '2rem'
      }}>
        <a
          href="https://github.com/mitthoma"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #ffffff',
            borderRadius: '10px',
            padding: '0.75rem 1.25rem',
            color: '#eaeaea',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 2px rgba(255, 255, 255, 0.3)';
          }}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/mitchellthecoder"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #ffffff',
            borderRadius: '10px',
            padding: '0.75rem 1.25rem',
            color: '#eaeaea',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 2px rgba(255, 255, 255, 0.3)';
          }}
        >
          LinkedIn
        </a>
      </div>
      
      <style jsx>{`
        @media (min-width: 768px) {
          h1 {
            font-size: 4rem !important;
          }
        }
      `}</style>
    </Fragment>
  );
}