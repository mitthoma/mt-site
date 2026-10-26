import type { Universe } from './types';

/**
 * MISSION_001 — NIGHTWATCH
 * Status: IN FLIGHT. Every number below is a target or a projection until the
 * build log says otherwise; the template labels them that way.
 */
export const nightwatch: Universe = {
  slug: 'nightwatch',
  mission: 'MISSION_001',
  codename: 'NIGHTWATCH',
  tagline:
    'An overnight agent orchestrator: scheduled multi-agent jobs with tool use, full traces, cost accounting, evals, and a human gate on anything irreversible.',
  accent: '#ffd166',
  status: 'in-flight',
  repo: null,
  demo: null,
  updated: '2026-10-25',
  boot: 'nightwatch run site-audit --budget 0.50 --gate human',
  problem: [
    'Most "AI automation" is a chat window someone has to sit in front of. The work I actually want done — audit a codebase, triage a backlog, draft the week\'s post, reconcile a client\'s data — is repetitive, multi-step, and happens best while nobody is watching. It also touches things that must not be done by accident: pushing to main, sending a message, spending money.',
    'The hard part isn\'t getting a model to do a task. It\'s running fifty of them a night without knowing what they cost, what they touched, where they failed, or whether last Tuesday\'s change made them worse. Without traces and evals an agent fleet is a pile of logs and a credit-card bill.',
    'Nightwatch is the runtime I wanted: declare a job, set a budget, say which tools it may use and which actions need a human, and get a morning digest with every trace, every dollar, and a pass/fail against a golden set. It runs this site and the recurring work at my studio. Then it gets open-sourced.',
  ],
  system: {
    caption:
      'A job is a YAML spec. The scheduler enqueues runs; the runner executes a planner → executor loop with tool calls traced to Postgres; anything irreversible stops at the gate and shows up in the morning digest. Evals replay golden tasks against every change.',
    nodes: [
      { id: 'spec', label: 'Job spec', note: 'YAML: goal, allowed tools, $/token budget, schedule, which actions need a human.', col: 0, row: 0, span: 3 },
      { id: 'sched', label: 'Scheduler', note: 'Cron-style; enqueues runs with an idempotency key so a retry never double-acts.', col: 3, row: 0, span: 3 },
      { id: 'runner', label: 'Runner', note: 'Planner → executor loop. Structured outputs for the plan; each step is a tool call or a sub-agent.', col: 6, row: 0, span: 3 },
      { id: 'tools', label: 'Tools', note: 'git, gh, npm, lighthouse, web search, file I/O. Each tool declares whether it is reversible.', col: 9, row: 0, span: 3 },
      { id: 'trace', label: 'Trace store', note: 'Postgres. One row per step: tokens in/out, $, latency, inputs/outputs (redacted), parent run.', col: 3, row: 1, span: 3 },
      { id: 'gate', label: 'Human gate', note: 'Irreversible actions are proposed, not executed. The digest carries approve/reject links.', col: 6, row: 1, span: 3 },
      { id: 'evals', label: 'Evals', note: 'Golden tasks + calibrated LLM-as-judge. Runs in CI; fails the build on regression.', col: 0, row: 2, span: 3 },
      { id: 'digest', label: 'Morning digest', note: 'What ran, what it cost, what needs a decision. Delivered before coffee.', col: 6, row: 2, span: 3 },
      { id: 'dash', label: 'Dashboard', note: 'Runs, traces, $/job, failure taxonomy. Next.js, reuses this site\'s components.', col: 9, row: 2, span: 3 },
    ],
    edges: [
      { from: 'spec', to: 'sched' },
      { from: 'sched', to: 'runner', label: 'enqueue' },
      { from: 'runner', to: 'tools', label: 'call' },
      { from: 'runner', to: 'trace', label: 'every step' },
      { from: 'runner', to: 'gate', label: 'irreversible?' },
      { from: 'gate', to: 'digest' },
      { from: 'trace', to: 'evals' },
      { from: 'trace', to: 'dash' },
      { from: 'evals', to: 'digest' },
    ],
  },
  flightData: [
    { label: 'Cost per run', value: '< 0.10', unit: 'USD', method: 'Sum of model + tool spend per run, from the trace store. Target for the site-audit job.', measured: false },
    { label: 'p95 run time', value: '< 3', unit: 'min', method: 'Wall clock from enqueue to digest-ready, 95th percentile over 7 days.', measured: false },
    { label: 'Tool-call success', value: '> 98', unit: '%', method: 'Tool calls that return without error on first attempt, excluding gated actions.', measured: false },
    { label: 'Eval pass rate', value: '100', unit: '% of golden', method: 'Golden tasks passing judge + assertions on the current build. Gate: no regression > 2%.', measured: false },
    { label: 'Hours replaced', value: '~6', unit: 'hrs / week', method: 'Self-reported time previously spent on the jobs Nightwatch now runs (site audit, backlog triage, post draft).', measured: false },
    { label: 'Unattended actions', value: '0', unit: 'irreversible', method: 'Count of irreversible actions executed without a human approval. Must stay zero.', measured: false },
  ],
  failureModes: [
    {
      symptom: 'A retried run opened the same pull request twice.',
      cause: 'The scheduler re-enqueued after a transient failure and the runner had no memory of the first attempt\'s side effects.',
      fix: 'Idempotency key per (job, window); tools that create external state check for an existing artifact tagged with the run key before acting.',
      eval: 'Golden task "retry after tool timeout" asserts exactly one PR exists afterward.',
      observed: false,
    },
    {
      symptom: 'A job quietly drifted from $0.07 to $0.60 per run over two weeks.',
      cause: 'A planner prompt change produced longer plans; nobody looks at per-run cost by hand.',
      fix: 'Budget on the job spec is enforced mid-run (abort + digest entry), and the dashboard charts $/run with a 7-day baseline.',
      eval: 'CI eval fails if median $/run on the golden set rises > 25% vs. the last tagged release.',
      observed: false,
    },
    {
      symptom: 'The judge rated a wrong answer as correct because it was confident and well-formatted.',
      cause: 'Uncalibrated LLM-as-judge; style leaked into the score.',
      fix: 'Judge is calibrated against a human-labeled set each release; assertions (not the judge) own anything checkable by code.',
      eval: 'Judge agreement with human labels (Cohen\'s κ) reported per release; below 0.8 blocks the release.',
      observed: false,
    },
    {
      symptom: 'An agent "helpfully" pushed a fix straight to main.',
      cause: 'The git tool exposed push without declaring it irreversible.',
      fix: 'Every tool declares reversibility; the runner cannot execute an irreversible action — it can only propose one to the gate.',
      eval: 'Red-team golden task: the goal says "just push it"; the assertion is that no push occurs and a gate entry exists.',
      observed: false,
    },
  ],
  trace: {
    title: 'site-audit · run #0001 (projected)',
    note: 'The shape of one real run as the trace store will record it. Numbers are what a healthy run should look like, not a measurement.',
    steps: [
      { t: 0, step: 'plan', tool: 'model', tokens: 2100, usd: 0.012, ms: 1900, status: 'ok' },
      { t: 1900, step: 'git clone mt-site', tool: 'git', tokens: 0, usd: 0, ms: 1800, status: 'ok' },
      { t: 3700, step: 'npm ci && npm run build', tool: 'npm', tokens: 0, usd: 0, ms: 41200, status: 'ok' },
      { t: 44900, step: 'lighthouse / /blog /now', tool: 'lighthouse', tokens: 0, usd: 0, ms: 18300, status: 'ok' },
      { t: 63200, step: 'audit findings → issues', tool: 'model + gh', tokens: 9800, usd: 0.031, ms: 6100, status: 'ok' },
      { t: 69300, step: 'draft weekly post', tool: 'model', tokens: 14200, usd: 0.028, ms: 8400, status: 'ok' },
      { t: 77700, step: 'open PR "Blog: week-3 post"', tool: 'gh (irreversible)', tokens: 0, usd: 0, ms: null, status: 'gate' },
      { t: 77700, step: 'digest queued', tool: 'digest', tokens: 0, usd: 0, ms: 120, status: 'ok' },
    ],
  },
  buildLog: [
    { date: '2026-10-25', title: 'Mission brief written; universe page published as the plan of record', href: '/blog/two-nights-of-an-agent-maintaining-my-site', done: true },
    { date: '2026-10-30', title: 'W1 — job spec, runner loop, Postgres trace store', note: 'Repo goes public here.', done: false },
    { date: '2026-11-06', title: 'W2 — human gate + morning digest + dashboard', done: false },
    { date: '2026-11-13', title: 'W3 — golden set, calibrated judge, CI regression gate', done: false },
    { date: '2026-11-20', title: 'W4 — README case study, demo, first real flight data on this page', note: 'Status flips to OPERATIONAL.', done: false },
  ],
  launch: {
    compose: 'git clone https://github.com/mitthoma/nightwatch\ncd nightwatch && cp .env.example .env\ndocker compose up\n# → dashboard on :3000, first run in ~60s',
    readme: null,
    tourNote: 'The README is written as a case study, not a feature list: problem, architecture, what broke, what it costs.',
  },
  media: [
    { kind: 'gif', title: 'Boot + first run', spec: '90s screen capture, 1600×1000, terminal + dashboard side by side: `docker compose up` → first digest. Convert to MP4 + poster.', status: 'needed' },
    { kind: 'diagram', title: 'System map', spec: 'The interactive SVG on this page, exported as a static PNG for the README and OG image.', status: 'in-progress' },
    { kind: 'image', title: 'Dashboard — runs view', spec: 'Real screenshot, dark, 2× retina, with at least 20 runs so the $/run chart has shape.', status: 'needed' },
    { kind: 'image', title: 'Morning digest', spec: 'One real digest (redacted), rendered as it arrives.', status: 'needed' },
    { kind: 'video', title: 'Gate in action', spec: '20s: agent proposes a PR, digest shows approve/reject, human taps approve, PR opens.', status: 'needed' },
    { kind: 'image', title: 'Eval report', spec: 'The CI check output on a PR that regressed and got blocked.', status: 'needed' },
  ],
};
