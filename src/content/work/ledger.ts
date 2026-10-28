import type { Universe } from './types';

/**
 * MISSION_004 — LEDGER
 * Status: PENDING (T-MINUS). This is a mission brief: every flight-data tile
 * is a target with no number yet (the brief names what gets measured; the
 * targets are set at the fixture-dataset milestone), every trace step is a
 * projection, every build-log entry after the first is a plan. The template
 * labels them that way. Nothing flips to MEASURED or OPERATIONAL until the
 * tool runs against a real export and the numbers are recorded.
 *
 * Source of truth: Project 2027 → levelup/07-showcase-projects.md (Proof D).
 * Build tasks are not scheduled yet (08-build-plan.md lists Ledger under
 * "briefs first"); the build log below carries the milestone plan from the
 * brief until a build agent is assigned.
 */
export const ledger: Universe = {
  slug: 'ledger',
  mission: 'MISSION_004',
  codename: 'LEDGER',
  tagline:
    'Agentic data onboarding: point it at a client\'s messy exports and a target schema; it profiles the data, proposes mappings with confidence, writes the SQL transforms and the checks that prove them, asks a human only where it is unsure, and records lineage for every output column.',
  accent: '#00ff66',
  status: 'pending',
  repo: null,
  demo: null,
  updated: '2026-10-28',
  boot: 'ledger map ./exports/*.csv --target schema/orders.json',
  problem: [
    'The first week of every forward-deployed engagement is the same week: get the customer\'s data into the system. It arrives as CSV exports with three date formats, an XLSX someone maintains by hand, and a SQL dump from a product nobody on the call has used in two years. There is no documentation. The person who knows what `cust_nm_2` means left. Everyone who has done this has a story; almost nobody has tooling.',
    'The usual answer is a notebook and a long weekend: eyeball the columns, guess the mappings, write the transform, load it, and discover in week three that `ord_dt` was in local time for half the rows. The expensive part is not the SQL. It is that nothing records why a column landed where it did, nothing proves the load is right, and the next export starts the guessing over.',
    'Ledger is the tool for that week. It profiles every file in-process with DuckDB — types, null rates, candidate keys, PII flags — then asks a model for a mapping onto the target schema, one proposal per column with a confidence and a reason. It writes the transform and, alongside it, the checks that would catch the transform being wrong: row counts, nulls in keys, uniqueness, referential integrity, distribution drift against the source. Anything below the confidence floor becomes a question for a human instead of a silent guess. Every output column carries its lineage back to the export it came from, so the answer to "where did this number come from" is a graph, not a memory. Wrapped as a Nightwatch job, it re-runs on the next export and only asks about what changed.',
  ],
  system: {
    caption:
      'Exports go in, a loaded and verified target comes out, and a human sees only the questions. Profiling is local and deterministic; the model proposes mappings and nothing else; the transform, the checks and the lineage graph are generated artifacts a reviewer can read before anything runs against the target.',
    nodes: [
      { id: 'exports', label: 'Client exports', note: 'CSV, XLSX, Parquet, legacy SQL dumps — read in place, never modified.', col: 0, row: 0, span: 3 },
      { id: 'profile', label: 'Profiler (DuckDB)', note: '`ledger profile`: per-column types, null rates, cardinality, candidate keys, PII flags. In-process, no model call, same answer every run.', col: 3, row: 0, span: 3 },
      { id: 'mapper', label: 'Mapping proposer', note: '`ledger map --target`: Claude structured outputs — one proposal per target column with source, transform hint, confidence and reason. Below the floor becomes a question.', col: 6, row: 0, span: 3 },
      { id: 'target', label: 'Target schema', note: 'JSON schema of the destination tables, keys and constraints. The only thing the mapper is allowed to map onto.', col: 9, row: 0, span: 3 },
      { id: 'questions', label: 'Human questions', note: 'The unresolved mappings, batched: "ord_dt — which timezone?" A human answers once; the answer is stored with the mapping.', col: 9, row: 1, span: 3 },
      { id: 'transform', label: 'transform.sql', note: 'Generated SQL per target table from the accepted mappings. Dry-run produces a diff before anything is written.', col: 3, row: 1, span: 3 },
      { id: 'checks', label: 'checks.yaml + checker', note: 'Row counts, nulls in keys, uniqueness, referential integrity, distribution drift vs. source. Written with the transform, run after it; a failed check blocks the load.', col: 6, row: 1, span: 3 },
      { id: 'lineage', label: 'Lineage graph', note: 'Every output column → source file, source column, transform, mapping confidence, who approved. JSON, rendered as Mermaid; `ledger lineage <table.column>`.', col: 0, row: 1, span: 3 },
      { id: 'postgres', label: 'Target (Postgres)', note: 'Loaded only after the checks pass. The load is idempotent per export fingerprint.', col: 3, row: 2, span: 3 },
      { id: 'nightwatch', label: 'Nightwatch job', note: 'The whole pipeline as a scheduled job: re-profile the next export, re-map only what changed, gate new questions through the morning digest.', col: 6, row: 2, span: 3 },
    ],
    edges: [
      { from: 'exports', to: 'profile', label: 'read' },
      { from: 'profile', to: 'mapper', label: 'profile' },
      { from: 'target', to: 'mapper', label: 'schema' },
      { from: 'mapper', to: 'questions', label: 'low confidence' },
      { from: 'questions', to: 'mapper', label: 'answers' },
      { from: 'mapper', to: 'transform', label: 'accepted mappings' },
      { from: 'mapper', to: 'checks', label: 'expectations' },
      { from: 'transform', to: 'postgres', label: 'load' },
      { from: 'checks', to: 'postgres', label: 'verify' },
      { from: 'mapper', to: 'lineage', label: 'provenance' },
      { from: 'nightwatch', to: 'profile', label: 'schedule' },
    ],
  },
  flightData: [
    { label: 'Mapping precision', value: null, unit: 'on labeled set', method: 'Share of proposed mappings a human marks correct on the fixture dataset\'s labeled answer key. Target set at the fixture-dataset milestone; recall reported alongside.', measured: false },
    { label: 'Resolved without a human', value: null, unit: '% of columns', method: 'Target columns mapped above the confidence floor and accepted unchanged, over the total mapped. The rest are the questions a human answered.', measured: false },
    { label: 'Checks per table', value: null, unit: 'written', method: 'Checks in `checks.yaml` per target table, by kind (row count, key nulls, uniqueness, referential, drift). Counted from the generated file.', measured: false },
    { label: 'Export → verified', value: null, unit: 'minutes', method: 'Wall-clock from `ledger profile` on a fresh export to a target load with every check green, human answer time included and reported separately.', measured: false },
    { label: 'Cost per table', value: null, unit: '$ / table', method: 'Model spend (mapping proposals + any re-maps) divided by target tables loaded, from the Nightwatch trace store once the job runs there.', measured: false },
    { label: 'Silent data changes', value: '0', unit: 'allowed', method: 'Any transform that changes a value without a mapping, a lineage edge and a check behind it. Design rule, verified by the fixture run: every output column must resolve through `ledger lineage`.', measured: false },
  ],
  failureModes: [
    {
      symptom: 'The mapper confidently mapped `ord_dt` to `order.placed_at`. Half the rows were off by five hours.',
      cause: 'The source column was local time for one export system and UTC for another; the profile showed a plausible timestamp column and the model saw no reason to ask.',
      fix: 'The profiler flags timezone-ambiguous timestamps (no offset, mixed hour distributions across files) and the mapper is required to raise a question on any flagged column regardless of confidence. The answer is stored on the mapping and in lineage.',
      eval: 'Fixture dataset includes two exports with the same column in different zones; the expected output is a question, not a mapping. A silent mapping fails the run.',
      observed: false,
    },
    {
      symptom: 'The load succeeded. The row count was right. Four thousand customers had an empty email because the transform trimmed the wrong column.',
      cause: 'Transforms were generated and run; nothing compared the output distribution to the source.',
      fix: 'Checks are generated with the transform, not after: for every mapped column, a null-rate check against the source profile and a drift check on cardinality. A check failure blocks the load and names the column.',
      eval: 'A seeded transform bug in the fixture (wrong-column trim) must be caught by the generated null-rate check before the load, with the lineage edge pointing at the bad transform.',
      observed: false,
    },
    {
      symptom: 'Two source files both had a `customer_id`. They were different id spaces. The join produced plausible nonsense.',
      cause: 'Candidate keys were inferred per file; nothing checked whether the same-named key meant the same thing across files.',
      fix: 'The profiler computes overlap between same-named key columns across files and reports it; below a threshold the mapper must treat them as distinct and ask. Referential checks are generated for every foreign key the target schema declares.',
      eval: 'Fixture includes two files with colliding `customer_id` spaces; expected output is a question plus a failing referential check if the human maps them together.',
      observed: false,
    },
    {
      symptom: 'The second month\'s export added a column and renamed another. The nightly job re-mapped everything and asked eleven questions, nine of them already answered.',
      cause: 'No memory of prior mappings; every run started from the profile.',
      fix: 'Mappings are keyed by source fingerprint (file, column name, profile signature). A re-run reuses accepted mappings whose source still matches and asks only about new or changed columns.',
      eval: 'Nightwatch job test: run the fixture twice with one added and one renamed column; the second run may ask about exactly those two.',
      observed: false,
    },
    {
      symptom: 'A reviewer asked where a revenue figure came from. The answer was a Slack thread from six weeks ago.',
      cause: 'Provenance lived in people\'s heads and commit messages.',
      fix: 'Lineage is written as a first-class artifact: output column → source column → transform → mapping (confidence, reason, approver). `ledger lineage orders.total` prints the chain; the graph renders as Mermaid in the README.',
      eval: 'Every output column in the fixture load must resolve through `ledger lineage` to a source column with a non-empty reason; any dangling column fails CI.',
      observed: false,
    },
  ],
  trace: {
    title: 'ledger map ./exports/*.csv --target schema/orders.json · run #0001 (projected)',
    note: 'One onboarding run as the trace store will record it: profile, mapping proposals, one question for a human, transform + checks written, dry-run diff. File and row counts follow the mission card; timings and tokens are what a healthy run should look like, not a measurement.',
    steps: [
      { t: 0, step: 'profile 14 files · 212,340 rows · 61 columns · 3 PII flags', tool: 'duckdb', tokens: 0, usd: 0, ms: 2400, status: 'ok' },
      { t: 2400, step: 'load target schema orders.json · 4 tables · 27 columns', tool: 'schema', tokens: 0, usd: 0, ms: 15, status: 'ok' },
      { t: 2415, step: 'propose mappings (structured output) → 27 proposals, 24 above floor', tool: 'claude', tokens: 9800, usd: 0.041, ms: 6100, status: 'ok' },
      { t: 8515, step: 'cust_nm → customer.name · conf 0.97', tool: 'mapper', tokens: 0, usd: 0, ms: 1, status: 'ok' },
      { t: 8516, step: 'ord_dt → order.placed_at · conf 0.91 · tz ambiguous → question #1', tool: 'mapper', tokens: 0, usd: 0, ms: 1, status: 'gate' },
      { t: 8517, step: 'cust_id ×2 files · overlap 0.03 → question #2 (distinct id spaces?)', tool: 'profiler', tokens: 0, usd: 0, ms: 1, status: 'gate' },
      { t: 8518, step: 'write transform.sql (4 tables) + checks.yaml (23 checks)', tool: 'codegen', tokens: 3100, usd: 0.012, ms: 2900, status: 'ok' },
      { t: 11418, step: 'dry-run: 212,340 rows in · 0 nulls in keys · 3 duplicate order ids → check fails', tool: 'checker', tokens: 0, usd: 0, ms: 1800, status: 'fail' },
      { t: 13218, step: 'lineage.json written · 27 columns resolved · 2 pending answers', tool: 'lineage', tokens: 0, usd: 0, ms: 40, status: 'ok' },
      { t: 13258, step: 'run parked · 2 questions queued for the digest · load not performed', tool: 'ledger', tokens: 0, usd: 0, ms: 1, status: 'gate' },
    ],
  },
  buildLog: [
    { date: '2026-10-28', title: 'Mission brief written; universe page published as the plan of record', done: true },
    { date: '2026-12-13', title: 'Brief + fixture dataset (the weekend before W8)', note: 'A deliberately ugly public dataset (municipal open data), one invented target schema, a labeled mapping answer key, and the seeded bugs the failure modes describe. Flight-data targets set here. Repo goes public here.', done: false },
    { date: '2026-12-18', title: 'W8 — profile + map', note: '`ledger profile` on DuckDB; `ledger map --target` with structured-output proposals, confidence floor, questions file.', done: false },
    { date: '2026-12-25', title: 'W9 — apply + checks', note: '`ledger apply`: transform.sql, dry-run diff, generated checks.yaml and the checker; a failed check blocks the load.', done: false },
    { date: '2027-01-01', title: 'W10 — lineage + Nightwatch job', note: '`ledger lineage`, JSON → Mermaid; the pipeline wrapped as a Nightwatch job with mapping memory across runs.', done: false },
    { date: '2027-01-08', title: 'W11 — README case study, 10-minute demo, first real flight data on this page', note: 'Fixture run end to end with the numbers recorded. Status flips to OPERATIONAL.', done: false },
  ],
  launch: {
    compose:
      'git clone https://github.com/mitthoma/ledger   # not public yet — repo at the fixture-dataset milestone\ncd ledger && docker compose up            # target postgres + checker\nledger profile ./fixtures/exports/*.csv\nledger map ./fixtures/exports/*.csv --target fixtures/schema/orders.json\nledger apply --dry-run                    # transform.sql + checks.yaml, diff only',
    readme: null,
    sourceNote: 'repo goes public at the fixture-dataset milestone (github.com/mitthoma/ledger — not public yet)',
    demoNote: 'recorded at W11',
    readmeNote: 'case study, W11',
    tourNote: 'The README is written as a case study: the "40 tables and no documentation" problem, the profile → map → apply → lineage pipeline, what the fixture dataset is designed to break, the generated checks and what they caught, and how to run it against your own exports in one command.',
  },
  media: [
    { kind: 'gif', title: 'Export to verified load in one run', spec: '90s capture, 1600×1000: profile, mapping proposals with confidence, the two questions, transform + checks written, dry-run diff, load. Convert to MP4 + poster.', status: 'needed' },
    { kind: 'diagram', title: 'System map', spec: 'The interactive SVG on this page, exported as a static PNG for the README and OG image.', status: 'in-progress' },
    { kind: 'image', title: 'Mapping proposals with confidence', spec: 'Real `ledger map` output on the fixture: source → target, confidence, reason, and the questions it raised.', status: 'needed' },
    { kind: 'image', title: 'A check catching a seeded bug', spec: '`ledger apply --dry-run` failing on the wrong-column trim, with the lineage edge that points at the transform.', status: 'needed' },
    { kind: 'diagram', title: 'Lineage graph', spec: 'The Mermaid render of lineage.json for the fixture\'s `orders` table — every output column traced to its source.', status: 'needed' },
  ],
};
