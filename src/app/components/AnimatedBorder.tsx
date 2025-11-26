"use client";
import { useState, ReactNode } from 'react';

interface AnimatedBorderProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  borderColor?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function AnimatedBorderLink({ children, href, style, className, borderColor = '#ffffff' }: AnimatedBorderProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const boxShadow = style?.boxShadow as string || '0 0 2px rgba(255, 255, 255, 0.3)';
  const hoverBoxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        ...style,
        position: 'relative',
        display: 'inline-block',
        textDecoration: 'none',
        cursor: 'pointer',
        boxShadow: isHovered ? hoverBoxShadow : boxShadow,
        transition: 'box-shadow 0.3s ease'
      }}
    >
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-block' }}>
        {children}
      </span>
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 2
        }}
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="10"
          fill="none"
          stroke={borderColor}
          strokeWidth="2"
          strokeDasharray={isHovered ? "200 15" : "0"}
          strokeDashoffset="0"
          style={{
            animation: isHovered ? 'borderDash 4s linear infinite' : 'none'
          }}
        />
      </svg>
    </a>
  );
}

export function AnimatedBorderButton({ children, onClick, style, className, type, disabled, borderColor = '#ffffff' }: AnimatedBorderProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        ...style,
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <span style={{ position: 'relative', zIndex: 1, display: 'block' }}>
        {children}
      </span>
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible'
        }}
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="10"
          fill="none"
          stroke={borderColor}
          strokeWidth="2"
          strokeDasharray={isHovered ? "200 15" : "0"}
          strokeDashoffset="0"
          style={{
            animation: isHovered ? 'borderDash 4s linear infinite' : 'none'
          }}
        />
      </svg>
    </button>
  );
}

export function AnimatedBorderDiv({ children, style, className, borderColor = '#ffffff' }: AnimatedBorderProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        ...style,
        position: 'relative',
        cursor: 'pointer',
        isolation: 'isolate'
      }}
    >
      {children}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 1
        }}
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="10"
          fill="none"
          stroke={borderColor}
          strokeWidth="2"
          strokeDasharray={isHovered ? "200 15" : "0"}
          strokeDashoffset="0"
          style={{
            animation: isHovered ? 'borderDash 4s linear infinite' : 'none'
          }}
        />
      </svg>
    </div>
  );
}
