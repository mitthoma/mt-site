"use client";

import { useEffect, useRef, useState } from 'react';
import styles from '../work.module.css';

/** Types the boot command once, then stays. Full text immediately under reduced motion. */
export default function BootLine({ command, prompt = 'mitchell@localhost:~$ ' }: { command: string; prompt?: string }) {
  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(command.length);
      done.current = true;
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < command.length) t = setTimeout(tick, 28);
      else done.current = true;
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [command]);

  return (
    <p className={styles.bootLine} aria-label={`${prompt}${command}`}>
      {prompt}
      <b>{command.slice(0, n)}</b>
      {n < command.length ? <span aria-hidden="true">▍</span> : null}
    </p>
  );
}
