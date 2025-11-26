"use client";

import { useEffect, useRef, useState, Fragment, useCallback } from 'react';

interface GlitchTextProps {
  children: string;
  trigger?: 'hover' | 'mount' | 'both' | 'continuous';
  speed?: number;
  interval?: number; // For continuous mode - delay between animations in ms
  hoverInterval?: number; // For hover mode - delay between re-glitches while hovered
  externalHover?: boolean; // External hover state from parent
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export default function GlitchText({ 
  children, 
  trigger = 'hover',
  speed = 30,
  interval = 5000,
  hoverInterval = 3000,
  externalHover,
  className = '',
  style = {},
  as: Component = 'span'
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [glitchingIndices, setGlitchingIndices] = useState<Set<number>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const continuousIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hoverIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalText = children;

  const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?~`';

  const animateHover = useCallback(() => {
    if (animationIntervalRef.current) {
      return;
    }

    let iteration = 0;
    const maxIterations = 8; // Shorter duration for hover

    animationIntervalRef.current = setInterval(() => {
      // Randomly select 10-15 characters to glitch
      const numGlitching = Math.floor(Math.random() * 6) + 10;
      const glitchIndices = new Set<number>();
      
      for (let i = 0; i < numGlitching; i++) {
        let randomIdx;
        do {
          randomIdx = Math.floor(Math.random() * originalText.length);
        } while (
          originalText[randomIdx] === ' ' ||
          !/[a-zA-Z]/.test(originalText[randomIdx])
        );
        glitchIndices.add(randomIdx);
      }

      const newText = originalText
        .split("")
        .map((char, idx) => {
          // Keep spaces and special characters
          if (char === ' ' || !/[a-zA-Z]/.test(char)) {
            return char;
          }
          
          // If this character is glitching, show random character
          if (glitchIndices.has(idx)) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          
          // Otherwise show original character
          return originalText[idx];
        })
        .join("");

      setDisplayText(newText);
      setGlitchingIndices(glitchIndices);

      iteration++;

      if (iteration >= maxIterations) {
        // Reset to original text
        setDisplayText(originalText);
        setGlitchingIndices(new Set());
        
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
      }
    }, speed);
  }, [originalText, speed]);

  const animate = useCallback(() => {
    if (animationIntervalRef.current) {
      return;
    }

    let iteration = 0;
    const maxIterations = 25; // Duration of glitch effect

    animationIntervalRef.current = setInterval(() => {
      // Randomly select 15-20 characters to glitch
      const numGlitching = Math.floor(Math.random() * 6) + 15;
      const glitchIndices = new Set<number>();
      
      for (let i = 0; i < numGlitching; i++) {
        let randomIdx;
        do {
          randomIdx = Math.floor(Math.random() * originalText.length);
        } while (
          originalText[randomIdx] === ' ' ||
          !/[a-zA-Z]/.test(originalText[randomIdx])
        );
        glitchIndices.add(randomIdx);
      }

      const newText = originalText
        .split("")
        .map((char, idx) => {
          // Keep spaces and special characters
          if (char === ' ' || !/[a-zA-Z]/.test(char)) {
            return char;
          }
          
          // If this character is glitching, show random character
          if (glitchIndices.has(idx)) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          
          // Otherwise show original character
          return originalText[idx];
        })
        .join("");

      setDisplayText(newText);
      setGlitchingIndices(glitchIndices);

      iteration++;

      if (iteration >= maxIterations) {
        // Reset to original text
        setDisplayText(originalText);
        setGlitchingIndices(new Set());
        
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
      }
    }, speed);
  }, [originalText, speed]);

  useEffect(() => {
    // Set mounted state to prevent hydration mismatch
    setIsMounted(true);
  }, []);

  // Sync with external hover state if provided
  useEffect(() => {
    if (externalHover !== undefined) {
      setIsHovered(externalHover);
    }
  }, [externalHover]);

  useEffect(() => {
    // Only run animations after component is mounted on client
    if (!isMounted) return;

    if (trigger === 'mount' || trigger === 'both') {
      // Small delay before starting animation
      const timeout = setTimeout(() => {
        animate();
      }, 100);

      return () => {
        clearTimeout(timeout);
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
      };
    }

    if (trigger === 'continuous') {
      // Start first animation after a delay
      const initialTimeout = setTimeout(() => {
        animate();

        // Set up continuous animation
        continuousIntervalRef.current = setInterval(() => {
          animate();
        }, interval);
      }, 1000);

      return () => {
        clearTimeout(initialTimeout);
        if (continuousIntervalRef.current) {
          clearInterval(continuousIntervalRef.current);
          continuousIntervalRef.current = null;
        }
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
      };
    }

    return () => {
      // Cleanup on unmount
      if (continuousIntervalRef.current) {
        clearInterval(continuousIntervalRef.current);
        continuousIntervalRef.current = null;
      }
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
    };
  }, [isMounted, trigger, interval, animate]);

  // Handle continuous hover glitching
  useEffect(() => {
    if (!isMounted) return;
    if (trigger !== 'hover' && trigger !== 'both') return;
    if (!isHovered) return;

    // Trigger first glitch immediately
    animateHover();

    // Set up interval to re-glitch every hoverInterval ms
    hoverIntervalRef.current = setInterval(() => {
      animateHover();
    }, hoverInterval);

    return () => {
      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current);
        hoverIntervalRef.current = null;
      }
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
      // Reset text when hover ends
      setDisplayText(originalText);
      setGlitchingIndices(new Set());
    };
  }, [isHovered, isMounted, trigger, animateHover, hoverInterval, originalText]);

  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'both') {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Component
      className={className}
      style={{
        ...style,
        display: 'inline',
        position: 'relative',
        whiteSpace: 'normal'
      }}
      onMouseEnter={externalHover === undefined ? handleMouseEnter : undefined}
      onMouseLeave={externalHover === undefined ? handleMouseLeave : undefined}
    >
      {(() => {
        const words = displayText.split(' ');
        let charIndex = 0;
        
        return words.map((word, wordIdx) => {
          const wordChars = word.split('').map((char) => {
            const idx = charIndex++;
            const isGlitching = glitchingIndices.has(idx);
            
            return (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  opacity: isGlitching ? 0.7 : 1,
                  filter: isGlitching ? 'brightness(0.7)' : 'brightness(1)',
                  transition: 'opacity 0.05s ease, filter 0.05s ease'
                }}
              >
                {char}
              </span>
            );
          });
          
          // Account for the space character in the index
          if (wordIdx < words.length - 1) {
            charIndex++;
          }
          
          return (
            <Fragment key={wordIdx}>
              <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                {wordChars}
              </span>
              {wordIdx < words.length - 1 && <span> </span>}
            </Fragment>
          );
        });
      })()}
    </Component>
  );
}
