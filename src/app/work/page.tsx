import type { Metadata } from 'next';
import Link from 'next/link';
import { missions } from '@/content/missions';
import { SITE_URL } from '@/content/work';
import styles from './work.module.css';

const TITLE = 'Work';
const DESCRIPTION = 'Systems I build in public: an overnight agent orchestrator, an agent eval CLI, and a bounded review agent for regulated content. Each one opens when it runs.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/work' },
  openGraph: { type: 'website', url: `${SITE_URL}/work`, title: `${TITLE} · Mitchell Thomas`, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: `${TITLE} · Mitchell Thomas`, description: DESCRIPTION },
};

const STATUS_LABEL = { operational: 'OPERATIONAL', 'in-flight': 'IN FLIGHT', pending: 'PENDING' } as const;
const operational = missions.filter((m) => m.status === 'operational').length;

export default function WorkIndex() {
  return (
    <div className={styles.shell}>
      <main className={styles.container} style={{ paddingTop: '7rem' }}>
        <nav className={styles.nav} style={{ position: 'static', marginBottom: '1.5rem' }} aria-label="Work">
          <Link href="/">← Home</Link>
          <Link href="/blog">Build log</Link>
          <Link href="/now">Now</Link>
        </nav>
        <h1 className={styles.indexTitle}>
          Mission
          <br />
          manifest
        </h1>
        <p className={styles.manifest}>
          [MANIFEST_2026] — {missions.length} MISSIONS · {operational} OPERATIONAL · EACH ONE OPENS WHEN IT RUNS
        </p>
        <ol className={styles.missionList}>
          {missions.map((m) => {
            const inner = (
              <>
                <span className={styles.mId}>{m.mission}</span>
                <span>
                  <span className={styles.mName}>{m.codename}</span>
                  <span className={styles.mRole}>{m.role}</span>
                </span>
                <span className={styles.mStatus}>{m.href ? 'ENTER →' : STATUS_LABEL[m.status]}</span>
              </>
            );
            return (
              <li key={m.mission}>
                {m.href ? (
                  <Link href={m.href} className={styles.missionRow}>
                    {inner}
                  </Link>
                ) : (
                  <div className={`${styles.missionRow} ${styles.missionRowPending}`}>{inner}</div>
                )}
              </li>
            );
          })}
        </ol>
        <footer className={styles.foot}>
          <Link href="/blog">[BUILD_LOG] → /BLOG</Link>
          <a href="https://github.com/mitthoma" target="_blank" rel="noopener noreferrer">
            [SOURCE] → GITHUB.COM/MITTHOMA
          </a>
        </footer>
      </main>
    </div>
  );
}
