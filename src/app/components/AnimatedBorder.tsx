"use client";
import { useState, ReactNode } from 'react';
import Link from 'next/link';
import GlitchText from './GlitchText';

/**
 * Mission-control controls. One look for every button, link-button, and
 * card on the site: square, hairline border, corner ticks, mono uppercase,
 * a status LED, a phosphor-green underline sweep on hover, and the text
 * scramble on hover. Styles live in globals.css under `.mc-*`.
 *
 * `variant`: 'ghost' (default, outlined) · 'solid' (white fill, for the one
 * primary action in a view) · 'quiet' (no border — text + LED only).
 */
interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  borderColor?: string; // kept for API compat; ignored
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  /** Internal links open in the same tab. Defaults to true for backwards compatibility. */
  external?: boolean;
  /** small index shown before the label, e.g. "01" */
  index?: string;
  variant?: 'ghost' | 'solid' | 'quiet';
  /** marks the current page / active state */
  active?: boolean;
  'aria-label'?: string;
}

function Inner({ children, index, hovered }: { children: ReactNode; index?: string; hovered: boolean }) {
  return (
    <>
      <i className="mc-led" aria-hidden="true" />
      {index ? <span className="mc-idx" aria-hidden="true">{index}</span> : null}
      <span className="mc-label">
        {typeof children === 'string' ? (
          <GlitchText trigger="hover" speed={30} hoverInterval={3000} externalHover={hovered}>{children}</GlitchText>
        ) : (
          children
        )}
      </span>
      <span className="mc-ticks" aria-hidden="true"><i /></span>
    </>
  );
}

function cls(variant: Props['variant'], active: boolean | undefined, className?: string) {
  return ['mc-ctl', `mc-${variant ?? 'ghost'}`, active ? 'is-active' : '', className ?? ''].filter(Boolean).join(' ');
}

export function AnimatedBorderLink({ children, href = '#', style, className, external = true, index, variant, active, ...rest }: Props) {
  const [hovered, setHovered] = useState(false);
  const { borderRadius: _r, background: _b, border: _bd, ...safe } = style ?? {};
  const common = {
    className: cls(variant, active, className),
    style: safe,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    'aria-current': active ? ('page' as const) : undefined,
    'aria-label': rest['aria-label'],
  };
  const inner = <Inner index={index} hovered={hovered}>{children}</Inner>;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...common}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} {...common}>
      {inner}
    </Link>
  );
}

export function AnimatedBorderButton({ children, onClick, style, className, type = 'button', disabled, index, variant, active, ...rest }: Props) {
  const [hovered, setHovered] = useState(false);
  const { borderRadius: _r, background: _b, border: _bd, ...safe } = style ?? {};
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={rest['aria-label']}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cls(variant, active, className)}
      style={safe}
    >
      <Inner index={index} hovered={hovered}>{children}</Inner>
    </button>
  );
}

export function AnimatedBorderDiv({ children, style, className, onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const { borderRadius: _r, border: _bd, ...safe } = style ?? {};
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={['mc-card', className ?? ''].filter(Boolean).join(' ')}
      style={safe}
    >
      <span className="mc-ticks" aria-hidden="true"><i /></span>
      <div className="mc-card-body">
        {typeof children === 'string' ? (
          <GlitchText trigger="hover" speed={30} hoverInterval={3000} externalHover={hovered}>{children}</GlitchText>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
