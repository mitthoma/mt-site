"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth wheel scrolling on pointer devices only.
 *
 * Perf notes: Lenis is skipped entirely on touch devices (its `syncTouch`
 * mode hijacks native touch scrolling and is a known cause of "page
 * unresponsive" on phones) and when the user prefers reduced motion. On
 * desktop the rAF loop is stopped while the tab is hidden.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    let running = true;
    const raf = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    const start = () => { if (!running) { running = true; frame = requestAnimationFrame(raf); } };
    const stop = () => { running = false; cancelAnimationFrame(frame); };
    const onVis = () => (document.visibilityState === 'visible' ? start() : stop());

    frame = requestAnimationFrame(raf);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
      lenis.destroy();
    };
  }, []);

  return null;
}
