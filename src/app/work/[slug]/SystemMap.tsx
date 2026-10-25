"use client";

import { useState } from 'react';
import type { SystemEdge, SystemNode } from '@/content/work/types';
import styles from '../work.module.css';

export default function SystemMap({ nodes, edges }: { nodes: SystemNode[]; edges: SystemEdge[] }) {
  const [active, setActive] = useState<string>(nodes[0]?.id ?? '');
  const current = nodes.find((n) => n.id === active);
  const related = edges.filter((e) => e.from === active || e.to === active);
  const label = (id: string) => nodes.find((n) => n.id === id)?.label ?? id;

  return (
    <>
      <div className={styles.map} role="group" aria-label="System components">
        {nodes.map((n) => (
          <button
            key={n.id}
            type="button"
            className={`${styles.node} ${n.id === active ? styles.nodeActive : ''}`}
            style={{ gridColumn: `${n.col + 1} / span ${n.span ?? 3}`, gridRow: n.row + 1 }}
            onMouseEnter={() => setActive(n.id)}
            onFocus={() => setActive(n.id)}
            onClick={() => setActive(n.id)}
            aria-pressed={n.id === active}
            aria-describedby="system-note"
          >
            <div className={styles.nodeId}>{n.id.toUpperCase()}</div>
            <div className={styles.nodeLabel}>{n.label}</div>
          </button>
        ))}
      </div>
      <div id="system-note" className={styles.note} aria-live="polite">
        {current ? (
          <>
            <b>{current.label.toUpperCase()}</b> — {current.note}
          </>
        ) : null}
      </div>
      <div className={styles.edges} aria-label="Connections">
        {related.map((e, i) => (
          <span key={i}>
            <b>{label(e.from)}</b> → <b>{label(e.to)}</b>
            {e.label ? ` · ${e.label}` : ''}
          </span>
        ))}
      </div>
    </>
  );
}
