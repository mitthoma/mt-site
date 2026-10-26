import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_URL, getUniverse, universes, universeUrl } from '@/content/work';
import type { Stat, TraceStep } from '@/content/work/types';
import styles from '../work.module.css';
import SystemMap from './SystemMap';
import BootLine from './BootLine';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return universes.map((u) => ({ slug: u.slug }));
}

export const dynamicParams = false;

const STATUS_LABEL = { operational: 'OPERATIONAL', 'in-flight': 'IN FLIGHT', pending: 'PENDING' } as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const u = getUniverse(slug);
  if (!u) return {};
  const title = `${u.codename} — ${u.mission}`;
  return {
    title,
    description: u.tagline,
    alternates: { canonical: `/work/${u.slug}` },
    openGraph: { type: 'article', url: universeUrl(u.slug), title: `${title} · Mitchell Thomas`, description: u.tagline },
    twitter: { card: 'summary_large_image', title: `${title} · Mitchell Thomas`, description: u.tagline },
  };
}

function fmtMs(ms: number | null) {
  if (ms === null) return '—';
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}
function fmtUsd(v: number | null) {
  return v === null ? '—' : `$${v.toFixed(3)}`;
}
function fmtTok(v: number | null) {
  return v === null ? '—' : v.toLocaleString();
}

function StatTile({ s }: { s: Stat }) {
  return (
    <div className={styles.tile}>
      <span className={`${styles.tileKind} ${s.measured ? styles.tileKindMeasured : ''}`}>{s.measured ? 'MEASURED' : 'TARGET'}</span>
      <div className={styles.tileLabel}>{s.label}</div>
      <div className={styles.tileValue}>
        {s.value ?? '—'}
        {s.unit && s.value !== null ? <small>{s.unit}</small> : null}
      </div>
      <div className={styles.tileMethod}>{s.method}</div>
    </div>
  );
}

function TraceRow({ s, total }: { s: TraceStep; total: number }) {
  const left = total ? (s.t / total) * 100 : 0;
  const width = s.ms && total ? Math.max(1.5, (s.ms / total) * 100) : 1.5;
  return (
    <div className={styles.traceRow}>
      <span className={styles.traceT}>{fmtMs(s.t)}</span>
      <span className={styles.traceBar}>
        <i style={{ left: `${left}%`, width: `${width}%` }} aria-hidden="true" />
        <span>{s.step}</span>
      </span>
      <span>{s.tool}</span>
      <span className={styles.num}>{fmtTok(s.tokens)}</span>
      <span className={styles.num}>{fmtUsd(s.usd)}</span>
      <span className={`${styles.num} ${styles[`st_${s.status}`]}`}>{s.status === 'ok' ? fmtMs(s.ms) : s.status.toUpperCase()}</span>
    </div>
  );
}

export default async function UniversePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const u = getUniverse(slug);
  if (!u) notFound();

  const totalMs = u.trace.steps.reduce((m, s) => Math.max(m, s.t + (s.ms ?? 0)), 0);
  const spent = u.trace.steps.reduce((a, s) => a + (s.usd ?? 0), 0);
  const tokens = u.trace.steps.reduce((a, s) => a + (s.tokens ?? 0), 0);
  const sectionIds = ['problem', 'system', 'flight-data', 'failure-modes', 'trace', 'build-log', 'launch', 'media'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: u.codename,
    description: u.tagline,
    url: universeUrl(u.slug),
    codeRepository: u.repo ?? undefined,
    programmingLanguage: u.language ?? 'TypeScript',
    dateModified: u.updated,
    author: { '@type': 'Person', name: 'Mitchell Thomas', url: SITE_URL },
  };

  return (
    <div className={styles.shell} style={{ ['--accent' as string]: u.accent }}>
      <main className={styles.container}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* 1 — Boot sequence */}
        <header className={styles.boot}>
          <nav className={styles.nav} aria-label="Work">
            <Link href="/work">← All missions</Link>
            <Link href="/">Home</Link>
            <Link href="/blog">Build log</Link>
          </nav>
          <div className={`${styles.bootTop} ${styles.reveal}`}>
            <span>{u.mission}</span>
            <span className={styles.statusPill}>
              <span className={styles.dot} aria-hidden="true" />
              {STATUS_LABEL[u.status]}
            </span>
            <span>UPDATED {u.updated}</span>
          </div>
          <h1 className={`${styles.codename} ${styles.reveal}`} style={{ animationDelay: '80ms' }}>
            <span>{u.codename.slice(0, 1)}</span>
            {u.codename.slice(1)}
          </h1>
          <p className={`${styles.tagline} ${styles.reveal}`} style={{ animationDelay: '160ms' }}>
            {u.tagline}
          </p>
          <BootLine command={u.boot} />
          <div className={`${styles.readout} ${styles.reveal}`} style={{ animationDelay: '320ms' }} aria-label="Status readout">
            {u.flightData.slice(0, 4).map((s) => (
              <div key={s.label} className={styles.readoutCell}>
                <small>{s.label.toUpperCase()}</small>
                <strong>
                  {s.value ?? '—'}
                  {s.unit && s.value !== null ? ` ${s.unit}` : ''}
                  {!s.measured ? <span className={styles.projTag}>TARGET</span> : null}
                </strong>
              </div>
            ))}
          </div>
        </header>

        {/* 2 — The problem */}
        <section id={sectionIds[0]} className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>01</span>
            <h2 className={styles.sectionTitle}>The problem</h2>
          </div>
          <div className={styles.prose}>
            {u.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* 3 — System map */}
        <section id={sectionIds[1]} className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>02</span>
            <h2 className={styles.sectionTitle}>System map</h2>
          </div>
          <p className={styles.caption}>{u.system.caption} Hover or tab through a component.</p>
          <SystemMap nodes={u.system.nodes} edges={u.system.edges} />
        </section>

        {/* 4 — Flight data */}
        <section id={sectionIds[2]} className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>03</span>
            <h2 className={styles.sectionTitle}>Flight data</h2>
          </div>
          <p className={styles.caption}>
            {u.status === 'operational'
              ? 'Measured on the current build. Each tile says how.'
              : 'Targets the build is held to. Each tile becomes MEASURED, with the method shown, the night real data lands.'}
          </p>
          <div className={styles.tiles}>
            {u.flightData.map((s) => (
              <StatTile key={s.label} s={s} />
            ))}
          </div>
        </section>

        {/* 5 — Failure modes */}
        <section id={sectionIds[3]} className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>04</span>
            <h2 className={styles.sectionTitle}>Failure modes</h2>
          </div>
          <p className={styles.caption}>
            What goes wrong with systems like this, what {u.codename} does about it, and the eval that proves the fix holds. ANTICIPATED entries are designed-for; OBSERVED entries happened in a real run.
          </p>
          <div className={styles.failures}>
            {u.failureModes.map((f, i) => (
              <div key={i} className={styles.failure}>
                <div className={styles.fKey}>
                  Symptom
                  <span className={styles.fBadge}>{f.observed ? 'OBSERVED' : 'ANTICIPATED'}</span>
                </div>
                <div className={styles.fVal}>{f.symptom}</div>
                <div className={styles.fKey}>Cause</div>
                <div className={styles.fVal}>{f.cause}</div>
                <div className={styles.fKey}>Fix</div>
                <div className={styles.fVal}>{f.fix}</div>
                <div className={`${styles.fKey} ${styles.fKeyAccent}`}>Eval</div>
                <div className={styles.fVal}>{f.eval}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 6 — Trace */}
        <section id={sectionIds[4]} className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>05</span>
            <h2 className={styles.sectionTitle}>Trace</h2>
          </div>
          <p className={styles.caption}>{u.trace.note}</p>
          <div className={styles.trace}>
            <div className={styles.traceHead}>
              <span>
                <b>{u.trace.title}</b>
              </span>
              <span>
                {fmtTok(tokens)} tokens · {fmtUsd(spent)} · {fmtMs(totalMs)} wall
              </span>
            </div>
            <div className={styles.traceRows}>
              <div className={`${styles.traceRow} ${styles.header}`}>
                <span>t+</span>
                <span>step</span>
                <span>tool</span>
                <span className={styles.num}>tokens</span>
                <span className={styles.num}>cost</span>
                <span className={styles.num}>time</span>
              </div>
              {u.trace.steps.map((s, i) => (
                <TraceRow key={i} s={s} total={totalMs} />
              ))}
            </div>
          </div>
        </section>

        {/* 7 — Build log */}
        <section id={sectionIds[5]} className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>06</span>
            <h2 className={styles.sectionTitle}>Build log</h2>
          </div>
          <ol className={styles.log}>
            {u.buildLog.map((e, i) => (
              <li key={i} className={styles.logItem}>
                <span className={styles.logDate}>{e.date}</span>
                <span className={`${styles.logMark} ${e.done ? styles.logMarkDone : ''}`} aria-label={e.done ? 'done' : 'planned'}>
                  {e.done ? '■' : '□'}
                </span>
                <span className={styles.logTitle}>
                  {e.href ? <Link href={e.href}>{e.title}</Link> : e.title}
                  {e.note ? <span className={styles.logNote}>{e.note}</span> : null}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* 8 — Launch pad */}
        <section id={sectionIds[6]} className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>07</span>
            <h2 className={styles.sectionTitle}>Launch pad</h2>
          </div>
          <p className={styles.caption}>{u.launch.tourNote}</p>
          <div className={styles.launch}>
            <pre className={styles.code}>{u.launch.compose}</pre>
            <div className={styles.launchLinks}>
              {u.repo ? (
                <a className={styles.launchLink} href={u.repo} target="_blank" rel="noopener noreferrer">
                  [SOURCE] → {u.repo.replace('https://', '')}
                </a>
              ) : (
                <span className={`${styles.launchLink} ${styles.launchLinkDisabled}`}>[SOURCE] → {u.launch.sourceNote ?? 'repo goes public at W1'}</span>
              )}
              {u.demo ? (
                <a className={styles.launchLink} href={u.demo} target="_blank" rel="noopener noreferrer">
                  [DEMO] → 90s walkthrough
                </a>
              ) : (
                <span className={`${styles.launchLink} ${styles.launchLinkDisabled}`}>[DEMO] → {u.launch.demoNote ?? 'recorded at W4'}</span>
              )}
              {u.launch.readme ? (
                <a className={styles.launchLink} href={u.launch.readme} target="_blank" rel="noopener noreferrer">
                  [README] → code tour
                </a>
              ) : (
                <span className={`${styles.launchLink} ${styles.launchLinkDisabled}`}>[README] → {u.launch.readmeNote ?? 'case study, W4'}</span>
              )}
            </div>
          </div>
        </section>

        {/* 9 — Media manifest (shown while in flight) */}
        {u.status !== 'operational' ? (
          <section id={sectionIds[7]} className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex}>08</span>
              <h2 className={styles.sectionTitle}>Media manifest</h2>
            </div>
            <p className={styles.caption}>What this page needs before it flips to OPERATIONAL. Each item is captured from the real system, never mocked.</p>
            <div className={styles.media}>
              {u.media.map((m, i) => (
                <div key={i} className={styles.mediaItem}>
                  <span className={styles.mediaKind}>{m.kind}</span>
                  <span className={styles.mediaTitle}>
                    {m.title}
                    <span className={styles.mediaSpec}>{m.spec}</span>
                  </span>
                  <span className={styles.mediaStatus}>{m.status.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <footer className={styles.foot}>
          <Link href="/work">[ALL_MISSIONS]</Link>
          <Link href="/blog">[BUILD_LOG] → /BLOG</Link>
          <a href="https://github.com/mitthoma" target="_blank" rel="noopener noreferrer">
            [SOURCE] → GITHUB.COM/MITTHOMA
          </a>
        </footer>
      </main>
    </div>
  );
}
