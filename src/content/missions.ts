/**
 * Showcase projects ("missions") for the Selected Work section and /work/<slug>.
 *
 * Only real, public, running systems get `status: 'operational'` and a `href`.
 * Everything else renders as launch-pending — no fake links, no fake numbers.
 * Source of truth for scope and sequencing: Project 2027 → levelup/07-showcase-projects.md
 */

export type MissionStatus = 'operational' | 'in-flight' | 'pending';

export interface Mission {
  /** MISSION_001 … */
  mission: string;
  codename: string;
  /** one-line role of the system */
  role: string;
  tech: string;
  /** build window or ship year, shown in the card corner */
  window: string;
  status: MissionStatus;
  /** set when /work/<slug> exists (a mission brief may be published before the system is operational) */
  href?: string;
  /** lines typed into the card's mini terminal */
  terminal: string[];
}

export const missions: Mission[] = [
  {
    mission: 'MISSION_001',
    codename: 'NIGHTWATCH',
    role: 'Overnight agent orchestrator — scheduled multi-agent jobs with traces, cost accounting, evals, and human gates.',
    tech: 'TYPESCRIPT / NODE 24 / POSTGRES / CLAUDE API / DOCKER',
    window: 'T-MINUS',
    status: 'in-flight',
    href: '/work/nightwatch',
    terminal: [
      '$ nightwatch run site-audit --budget 0.50',
      '[plan] 6 steps · tools: git, lighthouse, gh',
      '[step 1/6] clone mt-site ......... 1.8s',
      '[step 2/6] build + lint .......... 41.2s',
      '[step 3/6] lighthouse /, /blog ... perf 97',
      '[gate]  propose: open PR #42 → awaiting human',
      '',
      '$ nightwatch trace run_8f3c --cost',
      'tokens_in 41,882 · tokens_out 3,104 · $0.071',
      'eval: 12/12 golden · 0 regressions',
    ],
  },
  {
    mission: 'MISSION_002',
    codename: 'VERDICT',
    role: 'Agent eval & cost CLI — golden tasks, calibrated LLM-as-judge, $/task budgets, and a CI regression gate.',
    tech: 'PYTHON 3.12 / TYPER / PYDANTIC / GITHUB ACTIONS',
    window: 'T-MINUS',
    status: 'pending',
    terminal: [
      '$ verdict run agent.yaml --tasks golden/',
      'running 48 tasks ............ 00:51',
      'pass 44/48 · judge κ 0.83 · $0.92 total',
      '',
      '$ verdict gate --max-regression 2%',
      'baseline 91.7% → current 91.7%',
      '[ok] no regression · exit 0',
    ],
  },
  {
    mission: 'MISSION_003',
    codename: 'REDLINE',
    role: 'Bounded review agent for regulated content — cited findings, severity, audit log; never approves on its own.',
    tech: 'RAG / PGVECTOR / STRUCTURED OUTPUTS / AUDIT LOG',
    window: 'T-MINUS',
    status: 'pending',
    terminal: [
      '$ redline review deck-v3.pdf --rules claims-policy',
      'indexing 14 reference docs ..... ok',
      '[finding] slide 7 · claim unsubstantiated',
      '   → ref: source-doc 04, table 2 (not supported)',
      '   severity: HIGH · action: reviewer',
      '[finding] slide 9 · required disclosure missing',
      '2 findings · 0 auto-approvals · audit #1193',
    ],
  },
  {
    mission: 'MISSION_004',
    codename: 'LEDGER',
    role: 'Agentic data onboarding — maps a client\'s messy exports onto a target schema, writes the transforms and the checks that prove them, keeps lineage.',
    tech: 'TYPESCRIPT / DUCKDB / POSTGRES / STRUCTURED OUTPUTS / DATA CHECKS',
    window: 'T-MINUS',
    status: 'pending',
    terminal: [
      '$ ledger map ./exports/*.csv --target schema/orders.json',
      'profiling 14 files · 212k rows .......... ok',
      '[map] cust_nm → customer.name     conf 0.97',
      '[map] ord_dt  → order.placed_at   conf 0.91 · tz? → ask',
      '[check] 212,340 rows · 0 nulls in keys · 3 dup ids',
      'transform.sql + checks.yaml written · 1 question for a human',
    ],
  },
  {
    mission: 'MISSION_005',
    codename: 'SENTINEL',
    role: 'Policy gateway between agents and their tools — least privilege per job, injection defense, data boundaries, and an audit log that would survive a regulator.',
    tech: 'TYPESCRIPT / MCP PROXY / POLICY ENGINE / POSTGRES AUDIT / RED-TEAM SUITE',
    window: 'T-MINUS',
    status: 'pending',
    terminal: [
      '$ sentinel serve --policy jobs/site-audit.yaml',
      'proxying 11 tools · 3 gated · 2 denied',
      '[allow] gh.pulls.create     scope: repo:mt-site',
      '[deny]  fs.read /etc/*      reason: outside workspace',
      '[flag]  tool output contains instruction-like text → quarantined',
      'audit #4471 written · 0 policy bypasses',
    ],
  },
  {
    mission: 'MISSION_006',
    codename: 'PARLEY',
    role: 'Real-time voice agent — streaming speech in, tool calls mid-conversation, speech out, under an 800 ms turn budget, with transcript evals.',
    tech: 'TYPESCRIPT / WEBRTC / STREAMING STT·TTS / TOOL USE / LATENCY TRACES',
    window: 'T-MINUS',
    status: 'pending',
    terminal: [
      '$ parley call --agent scheduling.yaml --budget-ms 800',
      'ring ... connected · codec opus · 48k',
      '[turn 01] stt 210ms · llm 340ms · tts 180ms = 730ms ok',
      '[tool] calendar.find_slot → 2 options',
      '[turn 02] barge-in detected · cancelled tts',
      'call 02:14 · 9 turns · p95 760ms · transcript eval 8/8',
    ],
  },
];

export const operationalMissions = missions.filter((m) => m.status === 'operational');
