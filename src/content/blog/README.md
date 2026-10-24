# Blog posts

One `.mdx` file per post. The file name is the URL slug: `my-post.mdx` → `/blog/my-post`.

Frontmatter (required unless noted):

```yaml
---
title: "Post title"
description: "One or two sentences. Used for the listing card, meta description, OG image, and RSS."
date: "2026-10-24"          # YYYY-MM-DD; posts are sorted by this, newest first
tags: ["agents", "nextjs"]  # optional
draft: true                 # optional; drafts render locally but are skipped in production builds
---
```

Body is MDX with GitHub-flavored markdown (tables, task lists, strikethrough). Headings start at `##` — the post title is the page's `h1`.

Rendering lives in `src/lib/blog.ts` (frontmatter, listing) and `src/lib/mdx.tsx` (compile). RSS is at `/blog/rss.xml`; each post gets its own OG image at `/blog/<slug>/opengraph-image` and an `Article` JSON-LD block.
