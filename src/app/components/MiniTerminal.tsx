"use client";

import { useEffect, useRef, useState } from 'react';
import { useActive } from '../hooks/useActive';

interface MiniTerminalProps {
  codeLines: string[];
  title?: string;
}

const CHAR_MS = 20;
const LINE_PAUSE_MS = 300;
const EMPTY_LINE_MS = 50;
const HOLD_MS = 6000;

/**
 * Types `codeLines` out character by character, then holds and replays.
 *
 * Perf notes: a single setTimeout chain drives the whole animation (one timer
 * live at a time, one state update per tick), and it only runs while the card
 * is on screen and the tab is visible. The previous version scheduled a timer
 * per character per card via effect deps, ~50 React renders/s per card for the
 * life of the page. With reduced motion the full text renders immediately.
 */
export default function MiniTerminal({ codeLines, title = "terminal" }: MiniTerminalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useActive(rootRef);
  const [state, setState] = useState<{ line: number; char: number }>({ line: 0, char: 0 });
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!active) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let line = 0;
    let char = 0;

    const tick = () => {
      if (line >= codeLines.length) {
        timer = setTimeout(() => { line = 0; char = 0; setState({ line, char }); tick(); }, HOLD_MS);
        return;
      }
      const current = codeLines[line];
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
  }, [active, codeLines]);

  const done = reduced || state.line >= codeLines.length;
  const lines = done
    ? codeLines
    : codeLines.slice(0, state.line + 1).map((l, i) => (i === state.line ? l.slice(0, state.char) : l));
  const cursorOn = !done && state.char < (codeLines[state.line]?.length ?? 0);

  return (
    <div ref={rootRef} style={{
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
        aria-live="off"
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
        {lines.map((line, index) => (
          <div key={index} style={{ marginBottom: '0.1rem', minHeight: '1.4em' }}>
            {line || ''}
            {index === state.line && cursorOn && (
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
