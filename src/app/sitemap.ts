import type { MetadataRoute } from 'next';

export const SITE_URL = 'https://mitchell-codes.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ];
}
