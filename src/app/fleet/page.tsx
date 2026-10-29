import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/content/work';
import FleetDemo from './FleetDemo';
import styles from './fleet.module.css';

const TITLE = 'The Fleet';
const DESCRIPTION = 'Six agent systems working one client problem end to end — scheduling, policy, data, review, evals, voice — with a human at every irreversible step. Interactive, simulated run.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/fleet' },
  openGraph: { type: 'website', url: `${SITE_URL}/fleet`, title: `${TITLE} · Mitchell Thomas`, description: DESCRIPTION, images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Mitchell Thomas — Senior Full-Stack & AI Engineer' }] },
  twitter: { card: 'summary_large_image', title: `${TITLE} · Mitchell Thomas`, description: DESCRIPTION },
};

const PRODUCTS = [
  { code: 'P01', name: 'Overnight operations', uses: 'Nightwatch · Sentinel · Ledger · Redline · Verdict', text: 'Nightly audit, inventory reconcile, and content checks for a client\'s site and systems. Every change proposed; none applied without approval. A 60-second digest each morning.' },
  { code: 'P02', name: 'Compliance pre-review', uses: 'Redline · Ledger · Nightwatch · Sentinel · Verdict', text: 'Findings in minutes with citations to the rule, an audit log an examiner can read, and re-checks when rules change. The agent reviews; a person approves.' },
  { code: 'P03', name: 'Customer data onboarding', uses: 'Ledger · Nightwatch · Sentinel · Verdict', text: 'Messy exports mapped to a target schema with generated transforms, checks, and lineage — re-run nightly until cutover. For the SaaS, not the end customer.' },
  { code: 'P04', name: 'Voice front door', uses: 'Parley · Ledger · Sentinel · Nightwatch · Verdict', text: 'A phone agent that sees the real schedule and inventory, books what policy allows, hands off what it doesn\'t, and leaves a scored transcript of every call.' },
  { code: 'P05', name: 'Agent control plane', uses: 'Nightwatch · Sentinel · Verdict', text: 'Scheduled jobs, a policy gateway, and eval/cost gates, deployed in your environment — the answer to "what can it touch, what did it do, what does it cost, is it getting worse."' },
  { code: 'P06', name: 'Agent assurance', uses: 'Verdict · Sentinel', text: 'For agents already in production: a red-team pass against the tool surface, an eval harness around the real tasks, a report with numbers, and a CI gate left behind.' },
];

export default function FleetPage() {
  return (
    <div className={styles.shell}>
      <main className={styles.container}>
        <nav className={styles.nav} aria-label="Fleet">
          <Link href="/">← Home</Link>
          <Link href="/work">Missions</Link>
          <Link href="/blog">Build log</Link>
        </nav>
        <h1 className={styles.title}>The<br />fleet</h1>
        <p className={styles.manifest}>[FLEET_2026] — 6 SYSTEMS · 1 CLIENT PROBLEM · HUMAN AT EVERY IRREVERSIBLE STEP</p>
        <p className={styles.lede}>
          One system is a demo. Six that hand off to each other — and stop for a person at the right moments — are a way to run a business. Pick a client problem and run it: watch who does what, where the gates are, and what a night costs.
        </p>
        <p className={styles.sim}><span>▲</span> Simulation — a scripted run of the designed fleet. Values are targets from the mission briefs, not measurements.</p>

        <FleetDemo />

        <section className={styles.products} aria-labelledby="products-h">
          <p id="products-h" className={styles.productsHead}>[OFFERINGS] — what the same six systems become when pointed at a client</p>
          <div className={styles.productGrid}>
            {PRODUCTS.map((p) => (
              <div key={p.code} className={p.code === 'P01' ? `${styles.product} mc-card` : styles.product}>
                <small>{p.code} · {p.uses}</small>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
