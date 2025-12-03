"use client";

import { useEffect, useState } from 'react';

interface MiniTerminalProps {
  codeLines: string[];
  title?: string;
}

export default function MiniTerminal({ codeLines, title = "terminal" }: MiniTerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      // Reset after finishing
      setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 2000);
      return;
    }

    const currentLine = codeLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      // Type out current line character by character
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 20); // Faster typing speed for mini version

      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, currentLine.length === 0 ? 50 : 300); // Shorter pause

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, codeLines]);

  return (
    <div style={{
      background: '#0a0a0a',
      border: '1px solid #333',
      borderRadius: '4px',
      overflow: 'hidden',
      fontFamily: 'monospace',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Terminal Header */}
      <div style={{
        background: '#1a1a1a',
        padding: '0.4rem 0.6rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem'
      }}>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <span style={{ color: '#666', fontSize: '0.65rem', marginLeft: '0.5rem' }}>
          {title}
        </span>
      </div>

      {/* Terminal Content */}
      <div
        style={{
          padding: '0.75rem',
          flex: 1,
          overflowY: 'auto',
          color: '#00ff00',
          fontSize: '0.65rem',
          lineHeight: '1.4',
          fontFamily: 'Courier New, monospace'
        }}
        className="hide-scrollbar"
      >
        {displayedLines.map((line, index) => (
          <div key={index} style={{ marginBottom: '0.1rem' }}>
            {line || ''}
            {index === currentLineIndex && currentLineIndex < codeLines.length && currentCharIndex < codeLines[currentLineIndex].length && (
              <span style={{
                display: 'inline-block',
                width: '6px',
                height: '0.8em',
                background: '#00ff00',
                animation: 'blink 1s infinite',
                marginLeft: '2px'
              }} />
            )}
          </div>
        ))}

        <style jsx>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
}
