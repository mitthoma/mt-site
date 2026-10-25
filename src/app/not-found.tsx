import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './blog/blog.module.css';

export const metadata: Metadata = {
  title: '404 — No such file or directory',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={styles.shell}>
      <main className={styles.container}>
        <p className={styles.prompt}>mitchell@localhost:~$ ls ./that-page</p>
        <p className={styles.prompt} role="status">
          ls: cannot access &apos;./that-page&apos;: No such file or directory
        </p>
        <h1 className={styles.title}>404</h1>
        <p className={styles.lede}>
          Nothing lives at this address. It may have moved when the site was rebuilt, or the link
          was never right. Everything that exists is one of these:
        </p>
        <nav className={styles.footer} aria-label="Where to go instead">
          <Link href="/" className={styles.navLink}>
            ← Home
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
          <Link href="/now" className={styles.navLink}>
            Now
          </Link>
          <a
            href="https://github.com/mitthoma"
            className={styles.navLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </main>
    </div>
  );
}
