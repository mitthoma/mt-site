"use client";

import { useState } from 'react';
import HomeBanner from "./components/HomeBanner";
import AboutSection from "./components/AboutSection";
import HorizontalResume from "./components/HorizontalResume";
import ContactSection from "./components/ContactSection";
import AudioPlayer from "./components/SpotifyPlayer";

export default function Home() {
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMusicClick = () => {
    setIsMusicPlayerOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseMusicPlayer = () => {
    setIsMusicPlayerOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <main>
        <HomeBanner />
        <AboutSection />
        <HorizontalResume />
        <ContactSection />
      </main>

      {/* Hamburger Menu - Mobile Only */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 10001,
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid #ffffff',
          borderRadius: '10px',
          padding: '0.75rem',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
          gap: '4px',
          width: '45px',
          height: '45px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <span style={{
          width: '24px',
          height: '2px',
          background: '#ffffff',
          transition: 'all 0.3s ease',
          transform: isMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
        }} />
        <span style={{
          width: '24px',
          height: '2px',
          background: '#ffffff',
          transition: 'all 0.3s ease',
          opacity: isMenuOpen ? 0 : 1
        }} />
        <span style={{
          width: '24px',
          height: '2px',
          background: '#ffffff',
          transition: 'all 0.3s ease',
          transform: isMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
        }} />
      </button>

      {/* Overlay Menu - Mobile Only */}
      {isMenuOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.98)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
          <button
            onClick={handleMusicClick}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid #ffffff',
              borderRadius: '10px',
              padding: '1.5rem 3rem',
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            🎵 Music
          </button>
        </div>
      )}

      {/* Audio Player */}
      <AudioPlayer 
        expandedFromMenu={isMusicPlayerOpen} 
        onClose={handleCloseMusicPlayer}
      />
    </>
  );
}
