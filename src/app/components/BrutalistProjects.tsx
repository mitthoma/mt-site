"use client";

import { useState } from 'react';
import Link from 'next/link';
import MiniTerminal from './MiniTerminal';
import { missions, type Mission } from '@/content/missions';

const statusLabel: Record<Mission['status'], string> = {
  operational: 'OPERATIONAL',
  'in-flight': 'IN FLIGHT',
  pending: 'PENDING',
};

const operational = missions.filter((m) => m.status === 'operational').length;

export default function BrutalistProjects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" style={{
      background: '#000',
      minHeight: '100vh',
      padding: '4rem 2rem',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '4rem'
      }}>
        <h2 style={{
          fontSize: 'clamp(3rem, 2vw, 8rem)',
          fontWeight: 'bold',
          color: '#fff',
          letterSpacing: '-0.05em',
          lineHeight: '0.9',
          margin: 0,
          textTransform: 'uppercase',
          fontFamily: 'monospace'
        }}>
          SELECTED<br/>
          WORK
        </h2>
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem 0',
          borderTop: '2px solid #fff',
          borderBottom: '2px solid #fff',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem 1.5rem',
        }}>
          <p style={{
            fontFamily: 'monospace',
            color: '#fff',
            margin: 0,
            fontSize: '0.875rem',
            letterSpacing: '0.1em'
          }}>
            [MANIFEST_2026] — {missions.length} MISSIONS · {operational} OPERATIONAL
          </p>
          <p style={{
            fontFamily: 'monospace',
            color: '#fff',
            margin: 0,
            fontSize: '0.875rem',
            letterSpacing: '0.1em',
            opacity: 0.7,
          }}>
            SYSTEMS I&apos;M BUILDING IN PUBLIC. EACH ONE OPENS WHEN IT RUNS.
          </p>
        </div>
      </div>

      {/* Missions Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '2rem'
      }}>
        {missions.map((m, index) => {
          const isHovered = hovered === index;
          const live = Boolean(m.href);
          const fg = isHovered ? '#000' : '#fff';
          const card = (
            <div
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              aria-label={`${m.mission} ${m.codename} — ${statusLabel[m.status]}`}
              style={{
                border: '3px solid #fff',
                background: isHovered ? '#fff' : '#000',
                cursor: live ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
              }}
            >
              {/* Mission number + status */}
              <div style={{
                padding: '0.75rem 1rem',
                borderBottom: '3px solid ' + fg,
                background: isHovered ? '#000' : 'transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: '#fff',
                  letterSpacing: '0.2em',
                  fontWeight: 'bold'
                }}>
                  {m.mission}
                </span>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  color: '#fff',
                  letterSpacing: '0.2em',
                  opacity: 0.85,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginRight: '2.25rem',
                }}>
                  <span aria-hidden="true" style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: m.status === 'operational' ? '#5cff8d' : m.status === 'in-flight' ? '#ffd166' : '#6b7280',
                    boxShadow: m.status === 'pending' ? 'none' : '0 0 8px currentColor',
                  }} />
                  {statusLabel[m.status]}
                </span>
              </div>

              {/* Media - Mini Terminal */}
              <div className="mission-term" style={{
                height: '210px',
                ['--term-h' as string]: '210px',
                background: '#000',
                position: 'relative'
              }}>
                <MiniTerminal
                  codeLines={m.terminal}
                  title={m.codename.toLowerCase()}
                />
              </div>

              {/* Info */}
              <div style={{
                padding: '1.5rem',
                borderTop: '3px solid ' + fg,
                background: isHovered ? '#fff' : 'transparent'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: fg,
                  margin: '0 0 0.5rem 0',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace'
                }}>
                  {m.codename}
                </h3>
                <p style={{
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                  color: fg,
                  margin: '0 0 1rem 0',
                  opacity: 0.9,
                }}>
                  {m.role}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  gap: '1rem',
                }}>
                  <p style={{
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    color: fg,
                    margin: 0,
                    letterSpacing: '0.05em',
                    opacity: 0.8
                  }}>
                    {m.tech}
                  </p>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: fg,
                    letterSpacing: '-0.05em',
                    whiteSpace: 'nowrap',
                  }}>
                    [{live ? (m.status === 'operational' ? 'ENTER →' : 'BRIEF →') : m.window}]
                  </span>
                </div>
              </div>

              {/* Corner Accent */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '20px',
                height: '20px',
                borderTop: '3px solid ' + fg,
                borderRight: '3px solid ' + fg,
                pointerEvents: 'none'
              }} />
            </div>
          );

          return live ? (
            <Link key={m.mission} href={m.href!} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              {card}
            </Link>
          ) : (
            <div key={m.mission}>{card}</div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div style={{
        maxWidth: '1400px',
        margin: '4rem auto 0',
        padding: '1rem 0',
        borderTop: '2px solid #fff',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem 1.5rem',
      }}>
        <Link
          href="/blog"
          style={{
            fontFamily: 'monospace',
            color: '#fff',
            margin: 0,
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            opacity: 0.7,
            textDecoration: 'none',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          [BUILD_LOG] → /BLOG
        </Link>
        <Link
          href="/fleet"
          style={{
            fontFamily: 'monospace',
            color: '#fff',
            margin: 0,
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            opacity: 0.7,
            textDecoration: 'none',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          [FLEET_DEMO] → /FLEET
        </Link>
        <a
          href="https://github.com/mitthoma"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'monospace',
            color: '#fff',
            margin: 0,
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            opacity: 0.7,
            textDecoration: 'none',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          [SOURCE] → GITHUB.COM/MITTHOMA
        </a>
      </div>
    </section>
  );
}
