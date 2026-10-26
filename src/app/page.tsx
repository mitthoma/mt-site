"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import HomeBanner from "./components/HomeBanner";
import { AnimatedBorderLink, AnimatedBorderButton } from "./components/AnimatedBorder";

// Lazy load below-the-fold components
const AboutSection = dynamic(() => import("./components/AboutSection"));
const BrutalistProjects = dynamic(() => import("./components/BrutalistProjects"));
const HorizontalResume = dynamic(() => import("./components/HorizontalResume"));
const ContactSection = dynamic(() => import("./components/ContactSection"));
const Copyright = dynamic(() => import("./components/Copyright"));
const AudioPlayer = dynamic(() => import("./components/SpotifyPlayer"));

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
        <BrutalistProjects />
        <HorizontalResume />
        <ContactSection />
        <Copyright />
      </main>

      {/* Hamburger — mobile only */}
      <button
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        className={`md:hidden mc-burger ${isMenuOpen ? 'is-open' : ''}`}
      >
        <span /><span /><span />
      </button>

      {/* Overlay menu — mobile only */}
      {isMenuOpen && (
        <div className="md:hidden mc-overlay" role="dialog" aria-label="Menu">
          <p className="mc-hd">mitchell@localhost:~$ ls ./nav</p>
          <AnimatedBorderLink href="/work" external={false} index="01">Work</AnimatedBorderLink>
          <AnimatedBorderLink href="/fleet" external={false} index="02">Fleet</AnimatedBorderLink>
          <AnimatedBorderLink href="/blog" external={false} index="03">Blog</AnimatedBorderLink>
          <AnimatedBorderLink href="/now" external={false} index="04">Now</AnimatedBorderLink>
          <AnimatedBorderLink href="https://github.com/mitthoma" index="05">GitHub</AnimatedBorderLink>
          <AnimatedBorderLink href="https://linkedin.com/in/mitchellthecoder" index="06">LinkedIn</AnimatedBorderLink>
          <AnimatedBorderButton onClick={handleMusicClick} index="07">Music produced by me</AnimatedBorderButton>
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
