"use client";

import { Fragment, useEffect, useRef } from "react";
import { useActive } from '../hooks/useActive';

/**
 * THE CORE — the hero cube.
 * Rotation, drift, scanlines, and the inner core are CSS keyframes on the
 * compositor. JS only (a) tilts the scene toward the pointer while the hero
 * is hovered and (b) flashes a chromatic glitch every few seconds. Both run
 * only while the cube is on screen, the tab is visible, and the user hasn't
 * asked for reduced motion.
 */
export default function Cube() {
    const rootRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const active = useActive(rootRef);

    useEffect(() => {
        const scene = sceneRef.current;
        const root = rootRef.current;
        if (!scene || !root) return;
        scene.style.setProperty('--cube-play', active ? 'running' : 'paused');
        if (!active) return;

        // Pointer parallax: ±14° toward the cursor, over the whole hero section.
        const host = (root.closest('section, header, div.relative') as HTMLElement | null) ?? root;
        let raf = 0;
        let tx = 0, ty = 0;
        const onMove = (e: PointerEvent) => {
            const r = host.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            ty = nx * 28;
            tx = -ny * 28;
            if (!raf) raf = requestAnimationFrame(() => {
                raf = 0;
                scene.style.setProperty('--tilt-x', `${tx.toFixed(2)}deg`);
                scene.style.setProperty('--tilt-y', `${ty.toFixed(2)}deg`);
            });
        };
        const onLeave = () => {
            scene.style.setProperty('--tilt-x', '0deg');
            scene.style.setProperty('--tilt-y', '0deg');
        };
        host.addEventListener('pointermove', onMove, { passive: true });
        host.addEventListener('pointerleave', onLeave, { passive: true });

        // Chromatic glitch: 90–140 ms flash every 2–6 s.
        let timer: ReturnType<typeof setTimeout> | undefined;
        let disposed = false;
        const schedule = () => {
            timer = setTimeout(() => {
                if (disposed) return;
                scene.classList.add('glitch');
                timer = setTimeout(() => {
                    scene.classList.remove('glitch');
                    if (!disposed) schedule();
                }, 90 + Math.random() * 50);
            }, 2000 + Math.random() * 4000);
        };
        schedule();

        return () => {
            disposed = true;
            if (timer) clearTimeout(timer);
            if (raf) cancelAnimationFrame(raf);
            host.removeEventListener('pointermove', onMove);
            host.removeEventListener('pointerleave', onLeave);
            scene.classList.remove('glitch');
            onLeave();
        };
    }, [active]);

    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];

    return (
        <Fragment>
            <div className="cube-container" ref={rootRef} aria-hidden="true">
                <div className="flex-container">
                    <div className="cube-floor" />
                    <div className="scene" ref={sceneRef}>
                        <div className="cube" id="cube">
                            {faces.map((f) => (
                                <div key={f} className={`cube-face ${f}`}>
                                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5,5 L95,5 L95,95 L5,95 Z" fill="#eaeaea" />
                                    </svg>
                                </div>
                            ))}
                            <div className="cube-inner">
                                <i /><i /><i /><i /><i /><i />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
