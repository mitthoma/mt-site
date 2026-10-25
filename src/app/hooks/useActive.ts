"use client";

import { useEffect, useState, type RefObject } from 'react';

/**
 * True only while `ref` is in (or near) the viewport AND the tab is visible
 * AND the user hasn't asked for reduced motion. Decorative loops (anime.js,
 * typing effects, image cyclers) should run only while this is true; running
 * them for the whole page lifetime was costing ~25% of a CPU core at idle.
 */
export function useActive(ref: RefObject<Element | null>, rootMargin = '200px'): boolean {
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return visible && tabVisible && !reduced;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
