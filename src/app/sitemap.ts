import type { MetadataRoute } from 'next';
import { SITE_URL, getAllPosts, postUrl } from '@/lib/blog';

export { SITE_URL };

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date ? new Date(`${posts[0].date}T00:00:00Z`) : new Date();

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((post) => ({
      url: postUrl(post.slug),
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
