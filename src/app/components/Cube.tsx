"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useActive } from '../hooks/useActive';

/**
 * THE CORE — the hero instrument.
 * A hard wireframe cube with a fine face grid and vertex nodes, a white
 * inner wireframe core counter-rotating inside, corner brackets, a
 * perspective grid floor, and a telemetry line. Rotation, drift, and the
 * core are CSS keyframes. JS: pointer parallax over the hero, a periodic
 * signal-loss flicker, and a 1 Hz telemetry tick — all only while on
 * screen, tab visible, and motion allowed.
 */
export default function Cube() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const active = useActive(rootRef);
  const [t, setT] = useState(0);
  const [corrupt, setCorrupt] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const root = rootRef.current;
    if (!scene || !root) return;
    const stage = root.querySelector('.flex-container') as HTMLElement | null;
    stage?.style.setProperty('--inst-play', active ? 'running' : 'paused');
    if (!active) return;

    const tick = setInterval(() => setT((n) => n + 1), 1000);

    const host = (root.closest('section, header, div.relative') as HTMLElement | null) ?? root;
    let raf = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      ty = ((e.clientX - r.left) / r.width - 0.5) * 24;
      tx = -((e.clientY - r.top) / r.height - 0.5) * 24;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        scene.style.setProperty('--tilt-x', `${tx.toFixed(2)}deg`);
        scene.style.setProperty('--tilt-y', `${ty.toFixed(2)}deg`);
      });
    };
    const onLeave = () => { scene.style.setProperty('--tilt-x', '0deg'); scene.style.setProperty('--tilt-y', '0deg'); };
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave, { passive: true });

    // Glitch bursts: 460 ms tear every 4–9 s, with a 30% chance of a
    // second hit 260 ms later. The stage gets the overlays and bracket
    // flash; the scene gets the tear; the readouts corrupt for the burst.
    const stageEl = root.querySelector('.core-stage') as HTMLElement | null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;
    const hit = (then: () => void) => {
      scene.classList.add('glitch');
      stageEl?.classList.add('glitch');
      setCorrupt(true);
      timer = setTimeout(() => {
        scene.classList.remove('glitch');
        stageEl?.classList.remove('glitch');
        setCorrupt(false);
        then();
      }, 470);
    };
    const schedule = () => {
      timer = setTimeout(() => {
        if (disposed) return;
        hit(() => {
          if (disposed) return;
          if (Math.random() < 0.3) timer = setTimeout(() => { if (!disposed) hit(schedule); }, 260);
          else schedule();
        });
      }, 4000 + Math.random() * 5000);
    };
    schedule();

    return () => {
      disposed = true;
      clearInterval(tick);
      if (timer) clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      scene.classList.remove('glitch');
      stageEl?.classList.remove('glitch');
      setCorrupt(false);
      onLeave();
    };
  }, [active]);

  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
  const rx = ((t * 9) % 360).toFixed(1).padStart(5, '0');
  const ry = ((t * 18) % 360).toFixed(1).padStart(5, '0');
  const hex = () => '0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');

  return (
    <Fragment>
      <div className="cube-container" ref={rootRef} aria-hidden="true">
        <div className="flex-container">
          <div className="core-stage">
            <div className="core-grid" />
            <div className="inst-frame"><i /></div>
            <div className="scene" ref={sceneRef}>
              <div className="cube" id="cube">
                {faces.map((f) => (
                  <div key={f} className={`cube-face ${f}`}>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M5,5 L95,5 L95,95 L5,95 Z" fill="#eaeaea" /></svg>
                  </div>
                ))}
                <div className="cube-inner"><i /><i /><i /><i /><i /><i /></div>
              </div>
            </div>
            <div className="inst-tele" style={{ position: 'absolute', left: 14, top: 12 }}>
              {corrupt ? <>CORE <b>{hex()}</b> · <span className="acc">▲</span> SIG_LOST</> : <>CORE <b>01</b> · <span className="acc">●</span> NOMINAL</>}
            </div>
            <div className="inst-tele" style={{ position: 'absolute', right: 14, bottom: 10, textAlign: 'right' }}>
              {corrupt ? <>ROT <b>ERR</b> / <b>{hex()}</b></> : <>ROT <b>{rx}</b> / <b>{ry}</b></>}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
