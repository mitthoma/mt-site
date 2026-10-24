import { compile, run } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import type { ComponentType } from 'react';
// Imported here (inside the app bundle) so MDX renders with the same React copy
// the App Router uses. next-mdx-remote is externalized by Next and would pull
// node_modules/react instead, which throws "React Element from an older version".
import * as runtime from 'react/jsx-runtime';

/** Compile an MDX string (frontmatter already stripped) into a renderable component. */
export async function renderMdx(source: string): Promise<ComponentType> {
  const compiled = await compile(source, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm],
  });
  const mod = await run(String(compiled), { ...runtime, baseUrl: import.meta.url });
  return mod.default as ComponentType;
}
