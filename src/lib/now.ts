import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const NOW_FILE = path.join(process.cwd(), 'src', 'content', 'now.mdx');

export interface NowPage {
  /** ISO date, e.g. 2026-10-25. Shown on the page and used as sitemap lastModified. */
  updated: string;
  content: string;
}

/** The /now page: one short MDX file, edited weekly from the daily log. */
export function getNow(): NowPage {
  const raw = fs.readFileSync(NOW_FILE, 'utf8');
  const { data, content } = matter(raw);
  const updated = typeof data.updated === 'string' ? data.updated : '';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(updated) || Number.isNaN(Date.parse(updated))) {
    throw new Error('now: src/content/now.mdx needs a frontmatter "updated" in YYYY-MM-DD form');
  }

  return { updated, content };
}
