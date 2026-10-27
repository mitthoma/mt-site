"use client";

import { useEffect, useState } from 'react';
import { missions } from '@/content/missions';

/**
 * Top-left readout: a small terminal status block instead of a name.
 * Shows the current path as a prompt, local time in Nashville, and the
 * fleet state from the mission manifest. Updates once a minute.
 */
export default function StatusReadout({ pathname }: { pathname: string }) {
  const [now, setNow] = useState<string>('');

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 60_000);
    return () => clearInterval(id);
  }, []);

  const operational = missions.filter((m) => m.status === 'operational').length;
  const inFlight = missions.filter((m) => m.status === 'in-flight').length;
  const cwd = pathname === '/' ? '~' : `~${pathname.replace(/\/$/, '')}`;

  return (
    <span
      style={{
        display: 'block',
        padding: '0.9rem 1rem',
        fontFamily: 'var(--font-tomorrow), ui-monospace, monospace',
        fontSize: '0.7rem',
        lineHeight: 1.5,
        letterSpacing: '0.08em',
        color: '#9ca3af',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.15)',
        whiteSpace: 'nowrap',
      }}
    >
      {/* prompt line: the path truncates with an ellipsis so long slugs never run under the burger */}
      <span style={{ display: 'flex', color: '#fff', minWidth: 0 }}>
        <span style={{ flex: '0 0 auto' }}>mitchell@localhost:</span>
        <span style={{ color: '#ffd166', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{cwd}</span>
        <span style={{ flex: '0 0 auto' }}>$</span>
      </span>
      <span style={{ display: 'block' }}>
        NSH <span style={{ color: '#fff' }}>{now || '--:--'}</span>
        <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>|</span>
        FLEET <span style={{ color: '#fff' }}>{operational}</span>/{missions.length} OP
        <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>|</span>
        <span style={{ color: '#ffd166' }}>{inFlight}</span> IN FLIGHT
      </span>
    </span>
  );
}
