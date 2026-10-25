"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useActive } from '../hooks/useActive';

/**
 * An agent run log, typed out line by line. Illustrative of how Nightwatch
 * reports a job — the shape is real, the numbers are placeholders.
 */
const CODE_LINES = [
  "$ nightwatch run site-audit --budget 0.50 --gate human",
  "[plan]    6 steps · tools: git, npm, lighthouse, gh",
  "[budget]  $0.50 · 120k tokens · 15 min",
  "",
  "[1/6] git clone mitthoma/mt-site ............ 1.8s",
  "[2/6] npm ci && npm run build ............... 41.2s",
  "[3/6] lighthouse / /blog /now ............... perf 97 · a11y 100 · seo 100",
  "[4/6] audit: headings, alt text, dead links . 0 findings",
  "[5/6] deps: npm audit --omit=dev ............ 0 vulnerabilities",
  "[6/6] draft: weekly post from build log ..... 430 words",
  "",
  "[gate]    propose: open PR 'Blog: week-3 post'",
  "[gate]    irreversible action → parked for human review",
  "",
  "[trace]   tokens_in 41,882 · tokens_out 3,104",
  "[trace]   p50 2.1s · p95 6.8s · wall 1m 12s",
  "[cost]    $0.071 of $0.50",
  "[eval]    12/12 golden tasks · 0 regressions",
  "",
  "[digest]  queued for 06:40 — 1 PR to merge, 0 issues",
  "$ _",
];

const CHAR_MS = 24;
const LINE_PAUSE_MS = 420;
const EMPTY_LINE_MS = 120;
const HOLD_MS = 9000;

export default function TerminalSimulation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const active = useActive(rootRef);
  const [state, setState] = useState<{ line: number; char: number }>({ line: 0, char: 0 });
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // One timer alive at a time; runs only while on screen and the tab is visible.
  useEffect(() => {
    if (!active) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let line = 0;
    let char = 0;
    const tick = () => {
      if (line >= CODE_LINES.length) {
        timer = setTimeout(() => { line = 0; char = 0; setState({ line, char }); tick(); }, HOLD_MS);
        return;
      }
      const current = CODE_LINES[line];
      if (char < current.length) {
        char += 1;
        setState({ line, char });
        timer = setTimeout(tick, CHAR_MS);
      } else {
        timer = setTimeout(() => { line += 1; char = 0; setState({ line, char }); tick(); }, current.length === 0 ? EMPTY_LINE_MS : LINE_PAUSE_MS);
      }
    };
    setState({ line, char });
    tick();
    return () => { if (timer) clearTimeout(timer); };
  }, [active]);

  const done = reduced || state.line >= CODE_LINES.length;
  const lines = done
    ? CODE_LINES
    : CODE_LINES.slice(0, state.line + 1).map((l, i) => (i === state.line ? l.slice(0, state.char) : l));
  const cursorOn = !done && state.char < (CODE_LINES[state.line]?.length ?? 0);

  // Keep the newest line in view. Only when a new line starts (not per
  // character) — reading scrollHeight forces layout, and the old version did
  // it on every keystroke for the life of the page.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollHeight - el.clientHeight > 0) el.scrollTop = el.scrollHeight;
  }, [state.line, done]);

  return (
    <div ref={rootRef} style={{
      background: '#0a0a0a',
      border: '2px solid #333',
      borderRadius: '8px',
      overflow: 'hidden',
      fontFamily: 'monospace',
      boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)'
    }}>
      {/* Terminal Header */}
      <div style={{
        background: '#1a1a1a',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <span style={{ color: '#666', fontSize: '0.875rem', marginLeft: '1rem' }}>
          nightwatch — mitchell@localhost
        </span>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        aria-live="off"
        style={{
          padding: '1.5rem',
          height: '500px',
          overflowY: 'auto',
          color: '#00ff00',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          fontFamily: 'Courier New, monospace'
        }}
        className="hide-scrollbar"
      >
        {lines.map((line, index) => (
          <div key={index} style={{ marginBottom: '0.25rem', minHeight: '1.6em', whiteSpace: 'pre' }}>
            {line || ''}
            {index === state.line && cursorOn && (
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '1em',
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
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }

          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
      </div>
    </div>
  );
}
