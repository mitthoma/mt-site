"use client";
import { Fragment } from 'react';

export default function Logo() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Fragment>
      <div 
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          top: '-30px',
          left: '5px',
          zIndex: 9999,
          cursor: 'pointer',
          padding: '',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 20px #70e6ff80';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <h1 className="mt-10 text-2xl md:text-4xl font-bold tracking-tight text-white md:sm:text-6xl font-[family-name:var(--font-bbh-sans)]">
              Mitchell Thomas
            </h1>
      </div>
    </Fragment>
  );
}