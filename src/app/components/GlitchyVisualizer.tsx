"use client";

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

interface GlitchyVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
}

const codeLines = [
  'import React, { useState, useEffect, useRef } from "react";',
  'import anime from "animejs";',
  'import { Canvas } from "@react-three/fiber";',
  '',
  '// Cybernetic Cube Visualizer Component',
  'function CubeVisualizer() {',
  '  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });',
  '  const [glitchActive, setGlitchActive] = useState(false);',
  '  const cubeRef = useRef(null);',
  '  const animationRef = useRef(null);',
  '',
  '  useEffect(() => {',
  '    // Initialize 3D rotation animation',
  '    const animation = anime({',
  '      targets: rotation,',
  '      y: 360,',
  '      x: 180,',
  '      z: 360,',
  '      duration: 20000,',
  '      easing: "linear",',
  '      loop: true,',
  '      update: () => {',
  '        if (cubeRef.current) {',
  '          const transform = `rotateX(\${rotation.x}deg)',
  '                             rotateY(\${rotation.y}deg)',
  '                             rotateZ(\${rotation.z}deg)`;',
  '          cubeRef.current.style.transform = transform;',
  '        }',
  '      }',
  '    });',
  '',
  '    animationRef.current = animation;',
  '',
  '    // Glitch effect system',
  '    const glitchInterval = setInterval(() => {',
  '      setGlitchActive(true);',
  '      setTimeout(() => setGlitchActive(false), 500);',
  '    }, 3000);',
  '',
  '    return () => {',
  '      animation.pause();',
  '      clearInterval(glitchInterval);',
  '    };',
  '  }, []);',
  '',
  '  // Face rotation handler',
  '  const handleFaceRotation = (index) => {',
  '    const faces = cubeRef.current?.querySelectorAll(".cube-face-vis");',
  '    if (faces && faces[index]) {',
  '      const randomAngle = Math.floor(Math.random() * 360);',
  '      faces[index].style.transform = `rotate(\${randomAngle}deg)`;',
  '    }',
  '  };',
  '',
  '  return (',
  '    <div className="visualizer-container">',
  '      <div className="cube" ref={cubeRef}>',
  '        <div className="cube-face-vis front" />',
  '        <div className="cube-face-vis back" />',
  '        <div className="cube-face-vis left" />',
  '        <div className="cube-face-vis right" />',
  '        <div className="cube-face-vis top" />',
  '        <div className="cube-face-vis bottom" />',
  '      </div>',
  '      {glitchActive && <GlitchOverlay />}',
  '    </div>',
  '  );',
  '}',
  '',
  '// Glitch overlay component',
  'const GlitchOverlay = () => {',
  '  return (',
  '    <div className="glitch-overlay">',
  '      <div className="scan-line" />',
  '    </div>',
  '  );',
  '};',
  '',
  'export default CubeVisualizer;',
  '',
  '// Styles for the cube',
  'const styles = {',
  '  visualizer: {',
  '    perspective: "1000px",',
  '    width: "100%",',
  '    height: "100vh",',
  '    display: "flex",',
  '    alignItems: "center",',
  '    justifyContent: "center"',
  '  }',
  '};',
];

export default function GlitchyVisualizer({ isOpen, onClose, isPlaying }: GlitchyVisualizerProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const cubeRotationRef = useRef({ x: 0, y: 0, z: 0 });
  const [typedCode, setTypedCode] = useState('');
  const codeContentRef = useRef<HTMLDivElement>(null);

  // Auto-typing code effect
  useEffect(() => {
    if (!isOpen) return;

    const fullCode = codeLines.join('\n');
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < fullCode.length) {
        setTypedCode(fullCode.substring(0, charIndex + 1));
        charIndex++;
        // Auto-scroll to bottom as code is typed
        if (codeContentRef.current) {
          codeContentRef.current.scrollTop = codeContentRef.current.scrollHeight;
        }
      } else {
        // Keep scrolling - restart immediately
        setTypedCode('');
        charIndex = 0;
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [isOpen]);

  // Animated sphere particles
  useEffect(() => {
    if (!isOpen || !cubeRef.current) return;

    const container = cubeRef.current;
    const sphere = container.querySelector('.sphere-structure') as HTMLElement;
    const particles = Array.from(container.querySelectorAll('.sphere-particle')) as HTMLElement[];

    // Rapid continuous rotation of entire sphere on all 3 axes
    if (!sphere) return;
    
    const rotation = { x: 0, y: 0, z: 0 };
    
    const rotationAnimation = anime({
      targets: rotation,
      x: 360,
      y: 360,
      z: 360,
      duration: 3000,
      easing: 'linear',
      loop: true,
      update: () => {
        sphere.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
      }
    });

    // Minimal shaking/vibration
    let shakeActive = true;
    const shake = () => {
      if (!shakeActive || !sphere) return;
      
      const shakeX = (Math.random() - 0.5) * 0.8;
      const shakeY = (Math.random() - 0.5) * 0.8;
      
      anime({
        targets: sphere,
        translateX: shakeX,
        translateY: shakeY,
        duration: 150,
        easing: 'linear',
        complete: shake
      });
    };
    shake();

    // Breathing animation - expand and contract the sphere (subtle and slow)
    const breathingAnimation = anime({
      targets: sphere,
      scale: [
        { value: 0.95, duration: 3500, easing: 'easeInOutQuad' },
        { value: 1.05, duration: 3500, easing: 'easeInOutQuad' },
        { value: 0.95, duration: 3500, easing: 'easeInOutQuad' }
      ],
      loop: true,
    });

    // Orbit particles around the sphere
    particles.forEach((particle, index) => {
      const orbitSpeed = 3000 + Math.random() * 2000;
      const orbitRadius = 150;
      const initialAngle = (index / particles.length) * Math.PI * 2;
      
      const orbitParticle = () => {
        anime({
          targets: particle,
          rotateY: '+=360',
          duration: orbitSpeed,
          easing: 'linear',
          loop: true,
        });
      };
      
      orbitParticle();
    });


    return () => {
      shakeActive = false;
      rotationAnimation.pause();
      breathingAnimation.pause();
      anime.remove(sphere);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        zIndex: 10000,
        display: 'flex',
      }}
    >
      {/* Left: IDE Code Editor */}
      <div
        style={{
          width: '50%',
          height: '100vh',
          background: '#000',
          borderRight: '1px solid #00ff00',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* IDE Header */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #00ff00',
            color: '#00ff00',
            fontSize: '0.9rem',
            fontFamily: 'monospace',
          }}
        >
          CubeVisualizer.tsx
        </div>

        {/* Code Content */}
        <div
          ref={codeContentRef}
          style={{
            flex: 1,
            padding: '1.5rem',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
          }}
        >
          {typedCode}
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '16px',
              background: '#00ff00',
              marginLeft: '2px',
              animation: 'blink 1s infinite',
            }}
          />
        </div>
      </div>

      {/* Right: Preview Pane */}
      <div
        style={{
          flex: 1,
          background: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent),
            #000
          `,
          backgroundSize: '50px 50px',
          borderLeft: '1px solid #00ff00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Preview Header */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #00ff00',
            color: '#00ff00',
            fontSize: '0.9rem',
            fontFamily: 'monospace',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Preview</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #00ff00',
              borderRadius: '4px',
              color: '#00ff00',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0.25rem 0.75rem',
              fontFamily: 'monospace',
            }}
          >
            Close
          </button>
        </div>

        {/* Preview Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              perspective: '1000px',
              width: '400px',
              height: '400px',
            }}
          >
            <div
              ref={cubeRef}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Orbiting sharp particles */}
              {Array.from({ length: 40 }).map((_, i) => {
                const phi = Math.acos(-1 + (2 * i) / 40);
                const theta = Math.sqrt(40 * Math.PI) * phi;
                const radius = 180;
                
                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(theta) * Math.sin(phi);
                const z = radius * Math.cos(phi);
                
                return (
                  <div
                    key={i}
                    className="sphere-particle"
                    style={{
                      position: 'absolute',
                      width: '6px',
                      height: '6px',
                      background: '#00ff00',
                      transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%) rotate(45deg)`,
                      boxShadow: '0 0 15px #00ff00, 0 0 30px #00ff00, 0 0 45px #00ff00',
                      left: '50%',
                      top: '50%',
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    }}
                  />
                );
              })}
              
              {/* Sphere structure container */}
              <div
                className="sphere-structure"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                }}
              >
              
                {/* Pulsing energy rings */}
                {[1, 2, 3].map((ring) => (
                  <div
                    key={`energy-ring-${ring}`}
                    className="energy-ring"
                    style={{
                      position: 'absolute',
                      width: `${150 + ring * 50}px`,
                      height: `${150 + ring * 50}px`,
                      border: `2px solid rgba(0, 255, 0, ${0.6 - ring * 0.15})`,
                      borderRadius: '50%',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 20px rgba(0, 255, 0, ${0.5 - ring * 0.1}), inset 0 0 20px rgba(0, 255, 0, ${0.3 - ring * 0.1})`,
                      animation: `pulse-ring ${2 + ring * 0.5}s ease-in-out infinite`,
                      animationDelay: `${ring * 0.3}s`,
                    }}
                  />
                ))}

                {/* Elliptical wireframe lines - optimized count */}
                {Array.from({ length: 25 }).map((_, i) => {
                const angle = (i * 180) / 25;
                  return (
                    <div
                      key={`ellipse-${i}`}
                      className="sphere-ellipse"
                      style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        border: '1px solid #00ff00',
                        borderRadius: '50%',
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) rotateX(${angle / 2}deg)`,
                        opacity: 0.2,
                      }}
                    />
                  );
                })}
                {Array.from({ length: 15 }).map((_, i) => {
                const angle = (i * 180) / 15;
                  return (
                    <div
                      key={`ellipse-horizontal-${i}`}
                      className="sphere-ellipse"
                      style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        border: '1px solid #00ff00',
                        borderRadius: '50%',
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotateX(${angle}deg)`,
                        opacity: 0.2,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blinking cursor animation */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
