"use client";

import { Fragment, useEffect, useRef } from "react";
import anime from 'animejs/lib/anime.es.js';
import { useActive } from '../hooks/useActive';

export default function Cube() {
    const rootRef = useRef<HTMLDivElement>(null);
    const active = useActive(rootRef);

    useEffect(() => {
        // Runs only while the cube is on screen, the tab is visible, and the
        // user hasn't asked for reduced motion. Everything started here is torn
        // down in the cleanup, so scrolling away stops all work.
        if (!active) return;
        const cube = rootRef.current?.querySelector('#cube') as HTMLElement | null;
        if (!cube) return;
        const cubeSides = Array.from(cube.querySelectorAll('.cube-face svg')) as SVGElement[];
        const timers = new Set<ReturnType<typeof setTimeout>>();
        let disposed = false;

        // Rotation is a CSS keyframe (compositor thread, no JS per frame);
        // only the intermittent face glitch is scripted.
        cube.style.animationPlayState = 'running';

        function applyGlitch(side: SVGElement) {
            if (disposed) return;
            anime({
                targets: side,
                scaleX: 0.9 + Math.random() * 0.2,
                scaleY: 0.9 + Math.random() * 0.2,
                translateX: -50 + Math.random() * 30,
                translateY: -10 + Math.random() * 30,
                duration: 100,
                complete: () => resetGlitch(side),
            });
        }

        function resetGlitch(side: SVGElement) {
            if (disposed) return;
            anime({
                targets: side,
                scaleX: 1, scaleY: 1, translateX: 0, translateY: 0,
                duration: 100,
                complete: () => {
                    const t = setTimeout(() => { timers.delete(t); applyGlitch(side); }, 1000 + Math.random() * 4000);
                    timers.add(t);
                },
            });
        }

        cubeSides.forEach(applyGlitch);

        return () => {
            disposed = true;
            cube.style.animationPlayState = 'paused';
            anime.remove(cubeSides);
            timers.forEach(clearTimeout);
        };
    }, [active]);

    return (
        <Fragment>
            <div className="cube-container" ref={rootRef}>
                <div className="flex-container">
                    <div className="scene">
                        <div className="cube" id="cube">
                            <div className="cube-face front">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face back">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face right">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face left">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face top">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face bottom">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
