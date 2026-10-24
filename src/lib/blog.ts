import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const SITE_URL = 'https://mitchell-codes.com';
export const BLOG_TITLE = 'Mitchell Thomas — Blog';
export const BLOG_DESCRIPTION =
  'Weekly technical notes on agentic systems, LLM integration, and shipping full-stack software in regulated industries.';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. 2026-10-24 */
  date: string;
  tags: string[];
  /** Drafts are skipped in production builds but render locally. */
  draft: boolean;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

function isValidDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

function readPostFile(file: string): Post {
  const slug = file.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
  const { data, content } = matter(raw);

  if (typeof data.title !== 'string' || !data.title.trim()) {
    throw new Error(`blog: ${file} is missing a frontmatter "title"`);
  }
  if (!isValidDate(data.date)) {
    throw new Error(`blog: ${file} needs a frontmatter "date" in YYYY-MM-DD form`);
  }

  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title.trim(),
    description: typeof data.description === 'string' ? data.description.trim() : '',
    date: data.date,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    content,
  };
}

/** All publishable posts, newest first. Drafts are included outside production. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const includeDrafts = process.env.NODE_ENV !== 'production';
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx$/.test(f))
    .map(readPostFile)
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function postUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
