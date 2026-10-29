import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, formatDate } from '@/lib/blog';
import { getNow } from '@/lib/now';
import { renderMdx } from '@/lib/mdx';
import styles from '../blog/blog.module.css';

const TITLE = 'Now';
const DESCRIPTION =
  "What Mitchell Thomas is building, learning, and looking for right now. Updated weekly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/now' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/now`,
    title: `${TITLE} · Mitchell Thomas`,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Mitchell Thomas — Senior Full-Stack & AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} · Mitchell Thomas`,
    description: DESCRIPTION,
  },
};

export default async function NowPage() {
  const now = getNow();
  const Content = await renderMdx(now.content);

  return (
    <div className={styles.shell}>
      <main className={styles.container}>
        <p className={styles.prompt}>mitchell@localhost:~$ cat ./now.mdx</p>
        <nav className={styles.nav} aria-label="Now">
          <Link href="/">← Home</Link>
          <Link href="/blog">Blog</Link>
          <a href="https://github.com/mitthoma" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
        <h1 className={styles.title}>Now</h1>
        <p className={styles.lede}>
          What I&apos;m building, learning, and looking for — one paragraph each, updated weekly.{' '}
          <a
            href="https://nownownow.com/about"
            className={styles.navLink}
            style={{ color: '#fff', borderBottomColor: '#4b5563' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            It&apos;s a /now page.
          </a>
        </p>
        <p className={styles.meta}>
          Updated <time dateTime={now.updated}>{formatDate(now.updated)}</time>
        </p>
        <div className={styles.body}>
          <Content />
        </div>
        <footer className={styles.footer}>
          <Link href="/" className={styles.navLink}>
            ← Home
          </Link>
          <a
            href="https://github.com/mitthoma/mt-site/blob/main/src/content/now.mdx"
            className={styles.navLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source on GitHub
          </a>
        </footer>
      </main>
    </div>
  );
}
