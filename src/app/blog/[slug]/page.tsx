import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_URL, formatDate, getAllPosts, getPost, postUrl } from '@/lib/blog';
import { renderMdx } from '@/lib/mdx';
import styles from '../blog.module.css';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: postUrl(post.slug),
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [SITE_URL],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const Content = await renderMdx(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    url: postUrl(post.slug),
    mainEntityOfPage: postUrl(post.slug),
    image: `${postUrl(post.slug)}/opengraph-image`,
    author: { '@type': 'Person', name: 'Mitchell Thomas', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Mitchell Thomas', url: SITE_URL },
  };

  return (
    <div className={styles.shell}>
      <main className={styles.container}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <p className={styles.prompt}>mitchell@localhost:~$ cat ./blog/{post.slug}.mdx</p>
        <nav className={styles.nav} aria-label="Blog">
          <Link href="/blog">← All posts</Link>
          <Link href="/">Home</Link>
          <a href="/blog/rss.xml">RSS</a>
        </nav>
        <article>
          <header>
            <h1 className={styles.title}>{post.title}</h1>
            {post.description && <p className={styles.lede}>{post.description}</p>}
            <p className={styles.meta}>
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
              {post.tags.length > 0 && (
                <span className={styles.tags}>
                  {post.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </span>
              )}
            </p>
          </header>
          <div className={styles.body}>
            <Content />
          </div>
        </article>
        <footer className={styles.footer}>
          <Link href="/blog" className={styles.navLink}>
            ← All posts
          </Link>
          <a
            href={`https://github.com/mitthoma/mt-site/blob/main/src/content/blog/${post.slug}.mdx`}
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
