/**
 * THE FLEET — scripted scenarios showing how the six missions work together on
 * one client problem. This is a SIMULATION of the designed system: every line
 * is what the fleet is built to do, every number is a target from the mission
 * briefs, and the page says so. Nothing here is a measured result.
 */

export type SystemId = 'nightwatch' | 'sentinel' | 'verdict' | 'ledger' | 'redline' | 'parley';

export interface FleetSystem {
  id: SystemId;
  code: string;
  name: string;
  role: string;
  href: string;
}

export const SYSTEMS: FleetSystem[] = [
  { id: 'nightwatch', code: 'M01', name: 'Nightwatch', role: 'schedules & runs jobs', href: '/work/nightwatch' },
  { id: 'verdict',    code: 'M02', name: 'Verdict',    role: 'evals & cost gates',   href: '/work' },
  { id: 'redline',    code: 'M03', name: 'Redline',    role: 'bounded content review', href: '/work' },
  { id: 'ledger',     code: 'M04', name: 'Ledger',     role: 'data in, with checks',  href: '/work' },
  { id: 'sentinel',   code: 'M05', name: 'Sentinel',   role: 'what agents may touch', href: '/work' },
  { id: 'parley',     code: 'M06', name: 'Parley',     role: 'real-time voice',       href: '/work' },
];

export interface Step {
  /** system doing the work */
  sys: SystemId;
  /** optional system that handed off to this one (draws the link) */
  from?: SystemId;
  title: string;
  lines: string[];
  /** projected model + tool spend for the step, USD */
  usd?: number;
  /** simulated wall-clock for the step, seconds */
  sec?: number;
  /** step stops at a human gate */
  gate?: boolean;
  /** findings / exceptions raised for a human */
  findings?: number;
}

export interface Scenario {
  id: string;
  codename: string;
  client: string;
  problem: string;
  /** the ask, in the client's words */
  brief: string;
  before: string[];
  after: string[];
  /** projected outcome lines — all TARGET */
  outcome: { label: string; value: string }[];
  steps: Step[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'retainer-ops',
    codename: 'OVERNIGHT OPS',
    client: 'A marketplace client on a Timberwright retainer',
    problem: 'Inventory in a spreadsheet, listings on the site, copy nobody re-reads, and no one watching any of it at 2 a.m.',
    brief: '"Can you just keep it all correct without me having to think about it?"',
    before: ['Owner reconciles inventory by hand on Sundays', 'Price and stock drift silently between the sheet and the site', 'Site issues found by customers first'],
    after: ['Nightly reconcile + audit while they sleep', 'Every change proposed, none applied without approval', 'A 60-second digest each morning with cost and findings'],
    outcome: [
      { label: 'Owner time / week', value: '~3 h → ~20 min' },
      { label: 'Cost / night', value: '< $0.40' },
      { label: 'Unattended irreversible actions', value: '0' },
      { label: 'Drift caught before a customer', value: 'target 100%' },
    ],
    steps: [
      { sys: 'nightwatch', title: 'Scheduler wakes the client\'s job set', usd: 0, sec: 1,
        lines: ['$ nightwatch run client-ops --budget 0.40 --gate human', '[plan] 4 jobs · tools: ledger, http, cms (gated), gh (gated)', 'idempotency key: client-ops/2026-11-03'] },
      { sys: 'sentinel', from: 'nightwatch', title: 'Policy loads before any tool is reachable', usd: 0, sec: 1,
        lines: ['sentinel: policy client-ops.yaml → 9 tools proxied', '[allow] ledger.*          scope: client/inventory', '[gate]  cms.update_price  reason: customer-visible', '[deny]  cms.delete_*      reason: never unattended'] },
      { sys: 'ledger', from: 'sentinel', title: 'Reconcile the inventory sheet against the live catalog', usd: 0.06, sec: 48,
        lines: ['$ ledger map ./exports/inventory.xlsx --target schema/catalog.json', 'profiling 1 file · 1,842 rows .......... ok', '[check] 1,842 rows · 0 nulls in sku · 2 dup skus', '[diff]  14 price drifts · 6 out-of-stock still listed'], findings: 20 },
      { sys: 'nightwatch', from: 'ledger', title: 'Site audit job runs in parallel', usd: 0.09, sec: 71,
        lines: ['[step 2/4] clone site · build · lint ........ 41.2s', '[step 3/4] 212 pages crawled · 3 broken links · 1 missing alt', '[step 4/4] perf budget ok · LCP 1.9s'], findings: 4 },
      { sys: 'redline', from: 'nightwatch', title: 'New product copy checked against the client\'s own rules', usd: 0.11, sec: 33,
        lines: ['$ redline review new-listings.md --rules client-claims', '[finding] listing 7 · "guaranteed" · unsubstantiated claim', '   → ref: brand-guide.md §3.2', '1 finding · severity MED · action: owner'], findings: 1 },
      { sys: 'verdict', from: 'nightwatch', title: 'Tonight\'s run scored against the golden set', usd: 0.04, sec: 22,
        lines: ['$ verdict gate --baseline last-7d --max-regression 2%', 'golden 24/24 · judge κ 0.86 · $0.30 total', '[ok] no regression · exit 0'] },
      { sys: 'sentinel', from: 'nightwatch', title: 'Fourteen price updates stop at the gate', usd: 0, sec: 2, gate: true,
        lines: ['[gate] cms.update_price ×14 → GATE_PENDING', 'approval #2291 written · run parked', 'audit: 31 tool calls · 0 policy bypasses'] },
      { sys: 'nightwatch', from: 'sentinel', title: 'Morning digest — the owner reads for 60 seconds', usd: 0.01, sec: 3,
        lines: ['digest → 25 findings · 14 awaiting approval · $0.31 tonight', '[approve-all drift] [review listing 7] [open 3 link fixes as PR]', 'next run: tonight 02:00'] },
    ],
  },
  {
    id: 'compliance',
    codename: 'PRE-REVIEW',
    client: 'A marketing team in a regulated industry',
    problem: 'Every ad, email, and landing page has to clear rules before it ships. The review queue is a person with a PDF of the regulations and a backlog.',
    brief: '"Review is the bottleneck. We need findings in minutes, with citations, and a trail we can show an auditor."',
    before: ['3–5 day review turnaround', 'Findings in email threads, no audit trail', 'Rules change; nobody re-checks old content'],
    after: ['Findings in minutes, every one cited to the rule', 'Reviewer accepts/rejects — the agent never approves', 'Audit log an examiner can read; old content re-checked when rules change'],
    outcome: [
      { label: 'Review turnaround', value: 'days → minutes' },
      { label: 'Cost / document', value: '< $0.25' },
      { label: 'Findings with citation', value: '100%' },
      { label: 'Auto-approvals', value: '0, by design' },
    ],
    steps: [
      { sys: 'ledger', title: 'Rule packs and reference docs loaded with provenance', usd: 0.05, sec: 40,
        lines: ['$ ledger map ./rules/*.pdf --target schema/rulepack.json', 'profiling 6 files · 412 clauses .......... ok', '[lineage] every clause → source page · version 2026-10'] },
      { sys: 'sentinel', from: 'ledger', title: 'Review agent gets read-only everything', usd: 0, sec: 1,
        lines: ['sentinel: policy review.yaml', '[allow] cms.read, drive.read, rules.read', '[deny]  cms.publish, cms.update   reason: review ≠ approve', '[flag]  instruction-like text in documents → quarantined'] },
      { sys: 'nightwatch', from: 'sentinel', title: 'Queue drains every 15 minutes', usd: 0, sec: 2,
        lines: ['$ nightwatch run content-review --every 15m --budget 2.00', '[queue] 9 new items · 2 revised · 0 stale'] },
      { sys: 'redline', from: 'nightwatch', title: 'Each item reviewed against the pack', usd: 0.19, sec: 58,
        lines: ['$ redline review email-q4.html --rules pack-2026-10', 'indexing 6 reference docs ..... ok', '[finding] para 2 · comparative claim · needs substantiation', '   → ref: rule 14.2(b), p.31', '[finding] footer · required disclosure missing', '2 findings · HIGH/MED · 0 auto-approvals · audit #1193'], findings: 2 },
      { sys: 'verdict', from: 'redline', title: 'Reviewer decisions feed the eval set', usd: 0.06, sec: 30,
        lines: ['$ verdict run redline --tasks seeded-violations/', 'precision 0.96 · recall 0.91 · 48 tasks', '[gate] no regression vs last pack version · exit 0'] },
      { sys: 'sentinel', from: 'redline', title: 'Publish stays with a person', usd: 0, sec: 1, gate: true,
        lines: ['[gate] cms.publish → never granted to the agent', 'reviewer @marketing-lead: accept 1 · reject 1 (false positive)', 'audit export → 2026-10-review.jsonl'] },
      { sys: 'nightwatch', from: 'sentinel', title: 'Rule change triggers a re-check of live content', usd: 0.22, sec: 90,
        lines: ['[trigger] rulepack 2026-11 loaded → re-review 140 live items', '7 items now out of policy · owners notified · $0.21'], findings: 7 },
    ],
  },
  {
    id: 'voice',
    codename: 'FRONT DOOR',
    client: 'A multi-location service business',
    problem: 'Calls go to voicemail during the busiest hours. Generic voice bots can\'t see the real schedule or inventory and can\'t be trusted not to promise things.',
    brief: '"Answer the phone, book what can be booked, never make something up, and show me every call."',
    before: ['~30% of calls to voicemail at peak', 'Bookings keyed in by hand from messages', 'No record of what was promised'],
    after: ['Every call answered; real schedule, real inventory', 'Policy says what the agent may do — and what it must hand off', 'Every turn traced; transcripts scored nightly'],
    outcome: [
      { label: 'Calls answered', value: 'target 100%' },
      { label: 'Turn latency p95', value: '< 800 ms' },
      { label: 'Cost / minute', value: 'TARGET' },
      { label: 'Promises outside policy', value: '0' },
    ],
    steps: [
      { sys: 'ledger', title: 'Schedule and inventory loaded from the client\'s systems', usd: 0.04, sec: 35,
        lines: ['$ ledger map ./exports/schedule.csv ./exports/stock.csv --target schema/ops.json', '[map] appt_dt → slot.start  conf 0.98', '[check] 3,410 rows · 0 nulls in keys · ok'] },
      { sys: 'sentinel', from: 'ledger', title: 'Policy for a voice agent', usd: 0, sec: 1,
        lines: ['sentinel: policy front-door.yaml', '[allow] calendar.find_slot, stock.lookup', '[gate]  calendar.book       reason: customer commitment', '[deny]  payments.*          reason: never by voice', '[rule]  "unsure → hand off to a person"'] },
      { sys: 'parley', from: 'sentinel', title: 'Inbound call, 09:14', usd: 0.03, sec: 134,
        lines: ['ring ... connected · codec opus · 48k', '[turn 01] stt 210ms · llm 340ms · tts 180ms = 730ms ok', '"do you have the 40-gallon in stock at the north location?"', '[tool] stock.lookup(north, 40gal) → 3'] },
      { sys: 'parley', title: 'Booking proposed, not made', usd: 0.02, sec: 60, gate: true,
        lines: ['[tool] calendar.find_slot → Tue 10:30, Wed 14:00', '[turn 05] barge-in detected · cancelled tts', '[gate] calendar.book(Tue 10:30) → GATE_PENDING → front desk', 'call 02:14 · 9 turns · p95 760ms'] },
      { sys: 'nightwatch', from: 'parley', title: 'Nightly: transcripts scored, data re-synced', usd: 0.12, sec: 80,
        lines: ['$ nightwatch run front-door-nightly', '[step 1/3] ledger re-sync schedule+stock ...... ok', '[step 2/3] 41 calls · 38 resolved · 3 handed off'] },
      { sys: 'verdict', from: 'nightwatch', title: 'Transcript evals gate tomorrow\'s prompt', usd: 0.08, sec: 44,
        lines: ['$ verdict run parley --tasks transcripts-2026-11-03/', 'rubric pass 40/41 · 1 flagged: over-promised ETA', '[gate] regression 0% · exit 0 · prompt v12 stays'], findings: 1 },
      { sys: 'sentinel', from: 'nightwatch', title: 'Audit for the owner', usd: 0, sec: 2,
        lines: ['audit: 41 calls · 9 gated bookings · 0 payments attempted', '0 policy bypasses · export → calls-2026-11-03.jsonl'] },
    ],
  },
];
