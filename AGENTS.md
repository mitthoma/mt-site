# AGENTS.md — how this repo is maintained

This is the source for [mitchell-codes.com](https://mitchell-codes.com), Mitchell Thomas's personal site. It is maintained by Mitchell plus a nightly agent that audits the site, opens issues for real problems, and proposes changes as pull requests. This file is the contract for any agent (or human) working here.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind + a few `styled-components`; custom motion with `animejs` and `lenis`
- Contact form → `src/app/api/contact/route.ts` → Resend (`RESEND_API_KEY`)
- Deploys on Vercel from `main`

## Commands

```bash
npm ci
npm run lint          # eslint (next lint)
npx tsc --noEmit      # typecheck
npm run build         # must pass before any push
npm run dev           # http://localhost:3000
```

CI (`.github/workflows/ci.yml`) runs lint → typecheck → build on every PR and on `main`.

## Source of truth for copy

Headline, positioning, experience bullets, and metrics come from Mitchell's maintained resume, not from guesswork. Do not invent numbers, client names, or outcomes. If a claim needs a number that isn't on record, leave a `TODO(needs-number)` in the PR description rather than the page.

Positioning line used everywhere: **Senior Full-Stack & AI Engineer — agentic systems, LLM integration, regulated industries.**

## Design rules

- Keep the terminal / brutalist aesthetic: dark palette, monospace labels (`PROJECT_001`, `[ARCHIVE_…]`), restrained glitch/motion flourishes, the music player.
- Modern means fewer gimmicks per viewport, fast first paint, and content that proves the headline. Prefer removing a flourish over adding one.
- Mobile first: 16px side gutters, no horizontal scroll, every interactive element reachable by keyboard with a visible focus state and an accessible name.
- One concern per PR. Never mix content changes with changes to `src/app/layout.tsx`, `src/app/globals.css`, `next.config.mjs`, or `package.json`.

## Agent rules

- Branch from fresh `main` as `site-agent/<short-slug>`. Build must pass locally before pushing.
- Open a PR for every change. Do not merge. Mitchell merges from his morning review. (Content-only PRs — MDX, copy, data files — may be set to auto-merge once CI is green, only when the maintainer has enabled that policy.)
- PR description: what changed, why (tie to a backlog item or an audit finding), how to verify, screenshot or preview note for anything visual, Lighthouse before/after when layout is touched.
- Labels: `site-agent` on every agent PR/issue; `content-only` when it only touches copy/MDX/data; `audit` for findings.
- At most one small styling/modernization PR per night. Never a redesign dump.
- Never: force-push, rewrite history, delete content without a replacement, touch secrets or env, change domain/DNS, add tracking beyond the existing GA tag, publish anything marked confidential.
- Commits end with a `Co-Authored-By: Claude …` trailer.
- GitHub access from agent sessions is REST-only: use `gh api repos/mitthoma/mt-site/...` (not `gh pr list`, which needs GraphQL).

## Content model (being added)

- `/blog` — MDX posts in `src/content/blog/`, with listing, RSS, and OG images. Weekly technical posts publish here first.
- `/work/<slug>` — one case-study page per shipped project: problem, architecture, failure modes, numbers, repo link.
- `/now` — one paragraph, updated weekly: building, learning, looking for.

## Known debt (tracked as issues)

- Dependency vulnerabilities on Next 14.2.5; upgrade path to 14.2.x latest → 15.
- `public/fonts` (37 MB) is unreferenced and includes trial/personal-use licensed files; `public/audio` ships 9 tracks, 4 are used.
- Contact route has no rate limiting or bot protection.
- Hero has no `<h1>`; metadata lacks OG/Twitter/canonical/sitemap/robots/structured data.
