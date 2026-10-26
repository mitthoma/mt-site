import type { Universe } from './types';

/**
 * MISSION_002 — VERDICT
 * Status: PENDING (T-MINUS). This is a mission brief: every number below is a
 * target, every trace step a projection, every build-log entry after the first
 * is a plan. The template labels them that way. Nothing flips to MEASURED or
 * OPERATIONAL until the tool runs and the numbers are recorded.
 *
 * Source of truth: Project 2027 → levelup/07-showcase-projects.md (Proof C)
 * and levelup/08-build-plan.md (VD-01 … VD-08).
 */
export const verdict: Universe = {
  slug: 'verdict',
  mission: 'MISSION_002',
  codename: 'VERDICT',
  tagline:
    'An agent eval & cost CLI: run any agent against golden tasks, score with a calibrated LLM-as-judge, track $/task and latency, and fail CI on regression.',
  accent: '#00ff66',
  status: 'pending',
  language: 'Python',
  repo: null,
  demo: null,
  updated: '2026-10-26',
  boot: 'verdict gate --baseline runs/main.jsonl --max-regression 2%',
  problem: [
    'Every team shipping an agent ends up with the same folder: a handful of "known good" prompts, a script that runs them, and a spreadsheet of pass/fail someone updates by hand. It works until the second engineer changes a prompt, the scores move, and nobody can say whether the agent got worse or the judge got moodier.',
    'The problem is not writing the harness. It is the parts everyone skips: a judge whose scores are calibrated against human labels instead of trusted on vibes, cost and latency recorded per task so a "better" agent that costs 4× is visible, and a gate in CI that turns a regression into a failed check instead of a Slack thread.',
    'Verdict is the small, framework-agnostic version of that: point it at an HTTP endpoint or a Python callable, give it a directory of tasks, and get a run file, a report, and an exit code. It is the eval layer Nightwatch and the rest of the fleet are held to, and it ships as a pip install so it can be anyone\'s.',
  ],
  system: {
    caption:
      'Tasks are YAML files with inputs, expected outputs, code assertions, and an optional judge rubric. `verdict run` drives the agent, records every task to a JSONL run store with cost and latency, scores with assertions first and the judge second, and `verdict gate` compares the run to a baseline and sets the exit code.',
    nodes: [
      { id: 'tasks', label: 'Task set', note: 'YAML per task: input, expected, assertions[], judge rubric. A golden set is just a directory.', col: 0, row: 0, span: 3 },
      { id: 'cli', label: 'Typer CLI', note: 'verdict run · compare · gate · calibrate · report. Exit codes are the API.', col: 3, row: 0, span: 3 },
      { id: 'adapter', label: 'Agent adapter', note: 'HTTP endpoint or module:callable. Verdict owns the clock and the token/$ accounting around the call.', col: 6, row: 0, span: 3 },
      { id: 'agent', label: 'Your agent', note: 'Any framework, any language. Verdict never imports it; it calls it.', col: 9, row: 0, span: 3 },
      { id: 'assert', label: 'Assertions', note: 'contains / regex / json-schema / equals / custom Python. Anything checkable by code is checked by code.', col: 0, row: 1, span: 3 },
      { id: 'judge', label: 'Calibrated judge', note: 'LLM-as-judge with a rubric; agreement with human labels (κ) reported per release. Judge spend tracked separately.', col: 3, row: 1, span: 3 },
      { id: 'store', label: 'Run store', note: 'JSONL per run: task_id, output, usd, ms, tokens, assertion results, judge score. Diffable, committable.', col: 6, row: 1, span: 3 },
      { id: 'gate', label: 'Gate', note: 'Compares a run to a baseline; fails on pass-rate regression, cost or latency over budget.', col: 9, row: 1, span: 3 },
      { id: 'report', label: 'Report', note: 'Rich table in the terminal; Markdown + HTML for the PR comment.', col: 3, row: 2, span: 3 },
      { id: 'action', label: 'GitHub Action', note: 'Composite action in /action: run + gate on every PR, report as a check.', col: 9, row: 2, span: 3 },
    ],
    edges: [
      { from: 'tasks', to: 'cli' },
      { from: 'cli', to: 'adapter', label: 'per task' },
      { from: 'adapter', to: 'agent', label: 'call' },
      { from: 'adapter', to: 'assert', label: 'output' },
      { from: 'assert', to: 'judge', label: 'if rubric' },
      { from: 'adapter', to: 'store', label: '$ · ms · tokens' },
      { from: 'judge', to: 'store' },
      { from: 'store', to: 'gate', label: 'vs baseline' },
      { from: 'store', to: 'report' },
      { from: 'gate', to: 'action', label: 'exit code' },
    ],
  },
  flightData: [
    { label: 'Judge agreement', value: '> 0.8', unit: 'κ', method: 'Cohen\'s κ between judge scores and human labels on the calibration set, reported per release. Target for the first tagged release.', measured: false },
    { label: 'Run time', value: '< 60', unit: 's / 50 tasks', method: 'Wall clock for `verdict run` over a 50-task golden set with a fixture-recorded agent, excluding the agent\'s own latency.', measured: false },
    { label: 'Judge cost', value: '< 0.02', unit: 'USD / task', method: 'Judge model spend per task, tracked separately from agent spend in the run store.', measured: false },
    { label: 'Gate false alarms', value: '0', unit: 'on identical runs', method: '`verdict gate` comparing a run against itself must never fail. Checked in Verdict\'s own CI.', measured: false },
    { label: 'Install to first report', value: '< 5', unit: 'min', method: 'From `pip install` to a rendered report on the bundled example agent, timed on a clean machine.', measured: false },
    { label: 'Adopters', value: null, unit: 'stars', method: 'GitHub stars and PyPI downloads after release. Not a target — a thing to watch.', measured: false },
  ],
  failureModes: [
    {
      symptom: 'The judge scored a wrong answer as correct because it was confident and well-formatted.',
      cause: 'Uncalibrated LLM-as-judge; style leaked into the score and nobody had a number for how often.',
      fix: '`verdict calibrate` scores the judge against a human-labeled set and reports κ. Assertions, not the judge, own anything checkable by code.',
      eval: 'Calibration set in the repo; CI fails the release if κ drops below the threshold on the pinned judge model.',
      observed: false,
    },
    {
      symptom: 'A prompt change raised the pass rate by 3% and tripled cost per task. The PR merged.',
      cause: 'Pass rate was the only number anyone looked at; cost and latency lived in a different dashboard.',
      fix: 'Cost and latency are first-class fields on every run row; `verdict gate` fails on budget overrun, not just on pass-rate regression.',
      eval: 'Golden run in Verdict\'s own CI with a deliberately expensive fixture agent; gate must fail it.',
      observed: false,
    },
    {
      symptom: 'The gate flapped: the same commit passed, then failed, then passed.',
      cause: 'Non-deterministic agent output plus a judge with temperature; a 2% threshold on a 48-task set is one task.',
      fix: 'Judge runs at temperature 0 with a pinned model; the gate compares pass counts with a minimum task floor and reports the exact tasks that flipped.',
      eval: 'Repeat-run test: ten gates against the same run must all agree.',
      observed: false,
    },
    {
      symptom: 'Tests needed an API key, so nobody ran them.',
      cause: 'Judge and agent calls went straight to the network in the test suite.',
      fix: 'Recorded fixtures for every model call; the test suite runs offline by default and a `--live` flag re-records.',
      eval: 'CI runs with no secrets configured and must pass.',
      observed: false,
    },
  ],
  trace: {
    title: 'verdict run · golden/ · run #0001 (projected)',
    note: 'The shape of one run as the run store will record it — a 48-task golden set against a fixture-recorded agent. Numbers are what a healthy run should look like, not a measurement.',
    steps: [
      { t: 0, step: 'load 48 tasks from golden/', tool: 'cli', tokens: 0, usd: 0, ms: 80, status: 'ok' },
      { t: 80, step: 'agent calls ×48 (4 parallel)', tool: 'adapter → http', tokens: 61200, usd: 0.184, ms: 38400, status: 'ok' },
      { t: 38480, step: 'assertions ×48', tool: 'assert', tokens: 0, usd: 0, ms: 140, status: 'ok' },
      { t: 38620, step: 'judge ×31 (tasks with a rubric)', tool: 'judge', tokens: 27900, usd: 0.056, ms: 12100, status: 'ok' },
      { t: 50720, step: 'task 17: agent timeout → retry', tool: 'adapter', tokens: 1400, usd: 0.004, ms: 2600, status: 'retry' },
      { t: 53320, step: 'write runs/2026-11-13.jsonl', tool: 'store', tokens: 0, usd: 0, ms: 30, status: 'ok' },
      { t: 53350, step: 'gate vs baseline: 44/48 → 44/48, +0.0%', tool: 'gate', tokens: 0, usd: 0, ms: 20, status: 'ok' },
      { t: 53370, step: 'report.md + report.html', tool: 'report', tokens: 0, usd: 0, ms: 210, status: 'ok' },
    ],
  },
  buildLog: [
    { date: '2026-10-26', title: 'Mission brief written; universe page published as the plan of record', done: true },
    { date: '2026-11-06', title: 'W2 — scaffold, task + run model, JSONL run store', note: 'VD-01, VD-02. Repo goes public here.', done: false },
    { date: '2026-11-13', title: 'W3 — assertions, budgets, calibrated judge', note: 'VD-03, VD-04. Recorded fixtures so tests run without a key.', done: false },
    { date: '2026-11-20', title: 'W4 — compare + gate, Markdown/HTML report, GitHub Action', note: 'VD-05, VD-06.', done: false },
    { date: '2026-11-27', title: 'W5 — README case study, PyPI 0.1.0, launch post', note: 'VD-07.', done: false },
    { date: '2026-12-04', title: 'W6 — first real flight data on this page; Verdict scores Nightwatch\'s golden jobs', note: 'VD-08. Status flips to OPERATIONAL.', done: false },
  ],
  launch: {
    compose:
      'pip install verdict-ai            # not public yet — PyPI at W5\nverdict run http://localhost:8080/agent --tasks golden/\nverdict gate --baseline runs/main.jsonl --max-regression 2%\n# → exit 0 on no regression; report.md for the PR',
    readme: null,
    sourceNote: 'repo goes public at W2 (github.com/mitthoma/verdict — not public yet)',
    demoNote: 'recorded at W5',
    readmeNote: 'case study, W5',
    tourNote: 'The README is written as a case study: the eval problem, what the judge gets wrong and how calibration catches it, what a run costs, and how to wire the gate into CI in one workflow step.',
  },
  media: [
    { kind: 'gif', title: 'Run → gate in one terminal', spec: '60s capture, 1600×1000: `verdict run` over the golden set, the Rich table, then `verdict gate` failing a regressed run. Convert to MP4 + poster.', status: 'needed' },
    { kind: 'diagram', title: 'System map', spec: 'The interactive SVG on this page, exported as a static PNG for the README and OG image.', status: 'in-progress' },
    { kind: 'image', title: 'Calibration report', spec: 'Real `verdict calibrate` output: κ, confusion matrix, the tasks where judge and human disagree.', status: 'needed' },
    { kind: 'image', title: 'Failed check on a PR', spec: 'The GitHub Action blocking a PR that regressed, with the Markdown report as the check summary.', status: 'needed' },
    { kind: 'image', title: 'HTML report', spec: 'One real report, dark, 2× retina: pass rate, $/task, p95 latency, per-task table.', status: 'needed' },
  ],
};
