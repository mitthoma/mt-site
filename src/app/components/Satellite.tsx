"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useActive } from '../hooks/useActive';

/**
 * THE ARRAY — a tracking instrument.
 * A wireframe globe rotates under a reticle with a radar sweep; six tracked
 * objects (the things this site is about) sit on its surface as square
 * markers, listed in a telemetry panel with ticking coordinates. The active
 * track advances every few seconds or on hover. Monochrome; one accent.
 *
 * Geometry and motion are CSS (compositor). JS: the active index, a 1 Hz
 * telemetry tick, and pausing everything when offscreen / hidden / reduced.
 */
const TRACKS = [
  { id: 'AGT', name: 'Agents',    desc: 'orchestration · tool use · gates', lon: 20,  lat: 18 },
  { id: 'EVL', name: 'Evals',     desc: 'golden sets · judges · CI gates',   lon: 80,  lat: -26 },
  { id: 'BCK', name: 'Backend',   desc: 'Node · TypeScript · Postgres',      lon: 140, lat: 32 },
  { id: 'FRT', name: 'Frontend',  desc: 'React · Next · Vue · Nuxt',         lon: 200, lat: -12 },
  { id: 'INF', name: 'Infra',     desc: 'AWS · Docker · CI/CD · traces',     lon: 260, lat: 40 },
  { id: 'REG', name: 'Regulated', desc: 'compliance · review gates · audit', lon: 320, lat: -34 },
];

const MERIDIANS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
const LATITUDES = ['l0', 'l1', 'l2', 'l3', 'l4'];

function fmt(n: number, w = 5) {
  return n.toFixed(1).padStart(w, '0');
}

export default function Satellite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useActive(rootRef);
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const sys = rootRef.current?.closest('.proxz-nav__system') as HTMLElement | null;
    (sys ?? rootRef.current)?.style.setProperty('--inst-play', active ? 'running' : 'paused');
    if (!active) return;
    const cycle = setInterval(() => setIdx((i) => (i + 1) % TRACKS.length), 3600);
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => { clearInterval(cycle); clearInterval(t); };
  }, [active]);

  const current = hover ?? idx;
  const heading = (tick * 7.5) % 360;

  return (
    <Fragment>
      <div className="array" ref={rootRef} aria-hidden="true">
        <div className="inst-frame"><i /></div>
        <div className="array-reticle" />
        <div className="array-ticks" />
        <div className="globe-tilt">
          <div className="globe">
            {MERIDIANS.map((c) => <div key={c} className={`gring ${c}`} />)}
            {LATITUDES.map((c) => <div key={c} className={`gring ${c}`} />)}
            <div className="sweep" />
            {TRACKS.map((t, i) => (
              <div
                key={t.id}
                className={`marker ${i === current ? 'active' : ''}`}
                style={{ ['--lon' as string]: `${t.lon}deg`, ['--lat' as string]: `${t.lat}deg` }}
              />
            ))}
          </div>
        </div>
        <div className="array-scan" />
        <div className="inst-tele" style={{ position: 'absolute', left: 14, top: 12 }}>
          TRK <b>{TRACKS[current].id}</b> · HDG <b>{fmt(heading)}</b>
        </div>
        <div className="inst-tele" style={{ position: 'absolute', right: 14, bottom: 10, textAlign: 'right' }}>
          <span className="acc">●</span> LOCK · 6 OBJ
        </div>
      </div>

      <div className="array-panel" role="list" aria-label="Areas of practice">
        <div className="hd"><span>TRACKED OBJECTS</span><span>{String(current + 1).padStart(2, '0')}/06</span></div>
        {TRACKS.map((t, i) => (
          <div
            key={t.id}
            role="listitem"
            className={`track ${i === current ? 'active' : ''}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span>
              {t.name}
              <small>{t.desc}</small>
            </span>
            <span className="pos">{fmt(((t.lon + heading) % 360), 5)} / {t.lat >= 0 ? '+' : '-'}{fmt(Math.abs(t.lat), 4)}</span>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
