import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_DESCRIPTION, BLOG_TITLE, SITE_URL, formatDate, getAllPosts } from '@/lib/blog';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': `${SITE_URL}/blog/rss.xml` },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Mitchell Thomas — Senior Full-Stack & AI Engineer' }],
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className={styles.shell}>
      <main className={styles.container}>
        <p className={styles.prompt}>mitchell@localhost:~$ ls ./blog</p>
        <nav className={styles.nav} aria-label="Blog">
          <Link href="/">← Home</Link>
          <a href="/blog/rss.xml">RSS</a>
          <a href="https://github.com/mitthoma" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.lede}>{BLOG_DESCRIPTION}</p>

        {posts.length === 0 ? (
          <p className={styles.empty}>[EMPTY_DIR] — first post lands next week.</p>
        ) : (
          <ul className={styles.list}>
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className={styles.card}>
                  <span className={styles.cardIndex}>
                    POST_{String(posts.length - i).padStart(3, '0')} · {formatDate(post.date)} ·{' '}
                    {post.readingMinutes} min
                    {post.draft ? ' · DRAFT' : ''}
                  </span>
                  <span className={styles.cardTitle} style={{ display: 'block' }}>
                    {post.title}
                  </span>
                  {post.description && (
                    <span className={styles.cardDesc} style={{ display: 'block' }}>
                      {post.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
