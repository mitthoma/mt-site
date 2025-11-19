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
          fontSize: '4.5rem'
        }}>
          Mitchell Thomas
        </h1>
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