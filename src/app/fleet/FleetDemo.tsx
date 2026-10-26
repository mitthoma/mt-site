"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { SCENARIOS, SYSTEMS, type Scenario, type SystemId } from '@/content/fleet';
import { AnimatedBorderButton } from '../components/AnimatedBorder';
import { useActive } from '../hooks/useActive';
import styles from './fleet.module.css';

/**
 * THE FLEET — an interactive, scripted run of the six systems on one client
 * problem. Nothing is live: steps are data, numbers are targets, and the page
 * says so. The point is the shape — who hands off to whom, where a human sits,
 * what it costs — not the values.
 */

type Phase = 'idle' | 'running' | 'gate' | 'paused' | 'done';

interface LogLine { key: string; sys: SystemId; text: string; head?: boolean }

// node layout in SVG units
const NODE: Record<SystemId, { x: number; y: number }> = {
  nightwatch: { x: 110, y: 78 },
  verdict:    { x: 320, y: 78 },
  redline:    { x: 530, y: 78 },
  ledger:     { x: 110, y: 222 },
  sentinel:   { x: 320, y: 222 },
  parley:     { x: 530, y: 222 },
};
const NW = 176, NH = 74;

function fmtUsd(n: number) { return `$${n.toFixed(2)}`; }
function fmtSec(s: number) { const m = Math.floor(s / 60); const r = Math.round(s % 60); return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`; }

export default function FleetDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useActive(rootRef);
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(-1);          // index of the current step
  const [line, setLine] = useState(0);           // lines revealed in the current step
  const [autoGate, setAutoGate] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const reduced = useMemo(() => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches, []);

  const reset = useCallback((s: Scenario = scenario) => {
    setScenario(s); setPhase('idle'); setStep(-1); setLine(0);
  }, [scenario]);

  const start = useCallback(() => {
    if (phase === 'idle' || phase === 'done') { setStep(0); setLine(0); setPhase('running'); }
    else if (phase === 'paused') setPhase('running');
    else if (phase === 'running') setPhase('paused');
    else if (phase === 'gate') setPhase('running');
  }, [phase]);

  // advance one line or one step; called by the timer and by STEP
  const advance = useCallback(() => {
    if (step < 0) { setStep(0); setLine(0); setPhase('running'); return; }
    const cur = scenario.steps[step];
    if (line < cur.lines.length) { setLine(line + 1); return; }
    // step complete
    if (cur.gate && phase !== 'gate' && !autoGate) { setPhase('gate'); return; }
    if (step + 1 >= scenario.steps.length) { setPhase('done'); return; }
    setStep(step + 1); setLine(0);
  }, [scenario, step, line, phase, autoGate]);

  // timer
  useEffect(() => {
    if (phase !== 'running' || !active) return;
    const cur = scenario.steps[step];
    const endOfStep = cur && line >= cur.lines.length;
    const delay = reduced ? 400 : endOfStep ? 1100 : line === 0 ? 500 : 620;
    const t = setTimeout(advance, delay);
    return () => clearTimeout(t);
  }, [phase, active, step, line, scenario, advance, reduced]);

  // autoscroll the log
  useEffect(() => { const el = logRef.current; if (el) el.scrollTop = el.scrollHeight; }, [step, line]);

  // derived
  const completed = scenario.steps.slice(0, Math.max(0, step)).concat(step >= 0 && line >= (scenario.steps[step]?.lines.length ?? 0) ? [scenario.steps[step]] : []);
  const usd = completed.reduce((a, s) => a + (s.usd ?? 0), 0);
  const sec = completed.reduce((a, s) => a + (s.sec ?? 0), 0);
  const gates = completed.filter((s) => s.gate).length;
  const findings = completed.reduce((a, s) => a + (s.findings ?? 0), 0);
  const current = step >= 0 ? scenario.steps[step] : undefined;
  const touched = new Set<SystemId>(scenario.steps.slice(0, step + 1).map((s) => s.sys));
  const links = scenario.steps.slice(0, step + 1).filter((s) => s.from).map((s) => ({ a: s.from as SystemId, b: s.sys, live: s === current }));

  const log: LogLine[] = [];
  scenario.steps.slice(0, step + 1).forEach((s, i) => {
    const code = SYSTEMS.find((x) => x.id === s.sys)!;
    log.push({ key: `h${i}`, sys: s.sys, text: `[${code.code} ${code.name.toUpperCase()}] ${s.title}`, head: true });
    const n = i === step ? line : s.lines.length;
    s.lines.slice(0, n).forEach((t, j) => log.push({ key: `l${i}-${j}`, sys: s.sys, text: t }));
    if (i === step && phase === 'gate') log.push({ key: `g${i}`, sys: 'sentinel', text: '— HUMAN GATE · waiting for approval —', head: true });
  });

  const runLabel = phase === 'running' ? 'Pause' : phase === 'paused' ? 'Resume' : phase === 'gate' ? 'Approve' : phase === 'done' ? 'Run again' : 'Run';

  return (
    <div className={styles.demo} ref={rootRef}>
      {/* scenario tabs */}
      <div className={styles.tabs} role="tablist" aria-label="Scenario">
        {SCENARIOS.map((s, i) => (
          <AnimatedBorderButton key={s.id} index={String(i + 1).padStart(2, '0')} active={s.id === scenario.id} onClick={() => reset(s)} aria-label={`Scenario ${s.codename}`}>
            {s.codename}
          </AnimatedBorderButton>
        ))}
      </div>

      <div className={styles.client}>
        <p className={styles.clientLine}><span className={styles.k}>CLIENT</span> {scenario.client}</p>
        <p className={styles.clientLine}><span className={styles.k}>PROBLEM</span> {scenario.problem}</p>
        <p className={styles.brief}>{scenario.brief}</p>
      </div>

      <div className={styles.grid}>
        {/* system map */}
        <div className={styles.map}>
          <div className="inst-frame"><i /></div>
          <div className="inst-tele" style={{ position: 'absolute', left: 14, top: 12 }}>FLEET <b>06</b> · {phase.toUpperCase()}</div>
          <div className="inst-tele" style={{ position: 'absolute', right: 14, top: 12, textAlign: 'right' }}>STEP <b>{String(Math.max(0, step + 1)).padStart(2, '0')}</b>/{String(scenario.steps.length).padStart(2, '0')}</div>
          <svg viewBox="0 0 640 300" className={styles.svg} aria-label="Six systems and the hand-offs between them">
            <defs>
              <pattern id="fgrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" /></pattern>
            </defs>
            <rect width="640" height="300" fill="url(#fgrid)" />
            {links.map((l, i) => {
              const a = NODE[l.a], b = NODE[l.b];
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={l.live ? styles.linkLive : styles.link} />;
            })}
            {SYSTEMS.map((s) => {
              const p = NODE[s.id];
              const isCur = current?.sys === s.id;
              const cls = isCur ? styles.nodeActive : touched.has(s.id) ? styles.nodeDone : styles.node;
              return (
                <g key={s.id} className={cls} transform={`translate(${p.x - NW / 2} ${p.y - NH / 2})`}>
                  <rect width={NW} height={NH} />
                  <path d={`M0 10V0H10M${NW - 10} 0H${NW}V10M${NW} ${NH - 10}V${NH}H${NW - 10}M10 ${NH}H0V${NH - 10}`} className={styles.ticks} />
                  <circle cx="14" cy="16" r="3" className={styles.led} />
                  <text x="24" y="20" className={styles.code}>{s.code}</text>
                  <text x="14" y="42" className={styles.name}>{s.name.toUpperCase()}</text>
                  <text x="14" y="60" className={styles.role}>{s.role}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* trace log */}
        <div className={styles.log}>
          <div className={styles.logHead}>
            <i className="mc-led" style={{ background: phase === 'running' ? '#00ff66' : phase === 'gate' ? '#ffd166' : 'rgba(255,255,255,0.35)', boxShadow: phase === 'running' ? '0 0 6px #00ff66' : 'none' }} aria-hidden="true" />
            <span className="inst-tele">TRACE · {scenario.id}</span>
            <span className="inst-tele" style={{ marginLeft: 'auto' }}>SIMULATED</span>
          </div>
          <div className={styles.logBody} ref={logRef} aria-live="polite">
            {log.length === 0 && <div className={styles.logIdle}>$ fleet run {scenario.id} — press RUN</div>}
            {log.map((l) => (
              <div key={l.key} className={l.head ? styles.lineHead : styles.line} data-sys={l.sys}>{l.text}</div>
            ))}
            {phase === 'running' && <span className={styles.cursor} aria-hidden="true" />}
          </div>
        </div>
      </div>

      {/* telemetry */}
      <div className={styles.tele}>
        <div><span className={styles.tk}>RUN COST</span><b>{fmtUsd(usd)}</b><small>projected</small></div>
        <div><span className={styles.tk}>ELAPSED</span><b>{fmtSec(sec)}</b><small>simulated</small></div>
        <div><span className={styles.tk}>HUMAN GATES</span><b>{gates}</b><small>stopped for a person</small></div>
        <div><span className={styles.tk}>FINDINGS</span><b>{findings}</b><small>raised, not acted on</small></div>
      </div>

      {/* controls */}
      <div className={styles.controls}>
        <AnimatedBorderButton key={runLabel} variant="solid" className="mc-lg" index={phase === 'gate' ? 'OK' : '▶'} onClick={start}>{runLabel}</AnimatedBorderButton>
        <AnimatedBorderButton index="→" onClick={() => { if (phase === 'running') setPhase('paused'); advance(); }} disabled={phase === 'done'}>Step</AnimatedBorderButton>
        <AnimatedBorderButton variant="quiet" index="↺" onClick={() => reset()}>Reset</AnimatedBorderButton>
        <label className={styles.toggle}>
          <input type="checkbox" checked={autoGate} onChange={(e) => setAutoGate(e.target.checked)} />
          <span>auto-approve gates <small>(what you&apos;d never do in production)</small></span>
        </label>
      </div>

      {/* outcome */}
      {phase === 'done' && (
        <div className={styles.outcome}>
          <div className={styles.cols}>
            <div>
              <p className="inst-tele">BEFORE</p>
              <ul>{scenario.before.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
            <div>
              <p className="inst-tele"><span className="acc">●</span> AFTER</p>
              <ul>{scenario.after.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          </div>
          <div className={styles.tiles}>
            {scenario.outcome.map((o) => (
              <div key={o.label} className={styles.tile}>
                <span className={styles.tk}>{o.label}</span>
                <b>{o.value}</b>
                <small>TARGET · not yet measured</small>
              </div>
            ))}
          </div>
          <p className={styles.foot}>
            Every system in this run has a mission brief: <Link href="/work">/work</Link>. Each one opens with real flight data when it runs — and this page switches from <em>simulated</em> to <em>recorded</em> the same day.
          </p>
        </div>
      )}
    </div>
  );
}
