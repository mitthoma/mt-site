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
  /** set only when /work/<slug> exists */
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
      '$ redline review deck-v3.pdf --rules pharma-promo',
      'indexing 14 reference docs ..... ok',
      '[finding] slide 7 · claim unsubstantiated',
      '   → ref: Smith 2024, table 2 (p<0.05 not met)',
      '   severity: HIGH · action: reviewer',
      '[finding] slide 9 · fair balance missing',
      '2 findings · 0 auto-approvals · audit #1193',
    ],
  },
];

export const operationalMissions = missions.filter((m) => m.status === 'operational');
