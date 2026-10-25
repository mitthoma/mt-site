import type { MetadataRoute } from 'next';
import { SITE_URL, getAllPosts, postUrl } from '@/lib/blog';
import { getNow } from '@/lib/now';
import { universes, universeUrl } from '@/content/work';

export { SITE_URL };

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date ? new Date(`${posts[0].date}T00:00:00Z`) : new Date();
  const now = getNow();

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: 'weekly', priority: 0.8 },
    {
      url: `${SITE_URL}/now`,
      lastModified: new Date(`${now.updated}T00:00:00Z`),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    { url: `${SITE_URL}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...universes.map((u) => ({
      url: universeUrl(u.slug),
      lastModified: new Date(`${u.updated}T00:00:00Z`),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: postUrl(post.slug),
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
