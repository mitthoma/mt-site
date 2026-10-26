import type { Universe } from './types';
import { nightwatch } from './nightwatch';
import { verdict } from './verdict';

export const universes: Universe[] = [nightwatch, verdict];

export function getUniverse(slug: string): Universe | undefined {
  return universes.find((u) => u.slug === slug);
}

export const SITE_URL = 'https://mitchell-codes.com';
export const universeUrl = (slug: string) => `${SITE_URL}/work/${slug}`;
