import type { Universe } from './types';

/**
 * MISSION_003 — REDLINE
 * Status: PENDING (T-MINUS). This is a mission brief: every flight-data tile
 * is a target with no number yet (the brief names what gets measured; the
 * targets are set at the W3 scope + eval-set milestone), every trace step is
 * a projection, every build-log entry after the first is a plan. The template
 * labels them that way. Nothing flips to MEASURED or OPERATIONAL until the
 * agent has reviewed real documents and the numbers are recorded.
 *
 * Positioning: "regulated content" — the industry is never named on the page.
 * The first deployment is a private pilot for a Timberwright retainer client;
 * the public repo is the sanitized version that follows it.
 *
 * Source of truth: Project 2027 → levelup/07-showcase-projects.md (Proof B).
 * Build tasks are not scheduled yet (08-build-plan.md lists Redline under
 * "briefs first"); the build log below carries the milestone plan from the
 * brief until a build agent is assigned.
 */
export const redline: Universe = {
  slug: 'redline',
  mission: 'MISSION_003',
  codename: 'REDLINE',
  tagline:
    'A bounded review agent for regulated content: checks copy against a rule set and reference documents, returns cited findings with severity, keeps a full audit log, and never approves on its own.',
  accent: '#00ff66',
  status: 'pending',
  repo: null,
  demo: null,
  updated: '2026-10-29',
  boot: 'redline review deck-v3.pdf --rules claims-policy',
  problem: [
    'In a regulated industry every piece of customer-facing content goes through review before it ships: does each claim have a source, is every required disclosure present, does any sentence say something the rules forbid. The reviewers are expert, the volume is relentless, and the work is mostly mechanical — find the claim, find the reference, check the table, write it up. Five years of delivering review-gated content taught me where the hours go: not in judgment, in lookup.',
    'The obvious move is to let a model do the lookup. The obvious failure is a model that approves things. A finding nobody can trace to a reference line is worse than no finding; a tool that says "looks fine" trains reviewers to stop reading; and a review history that lives in email threads will not survive the day someone asks why a claim was allowed through. The same problem, with the same failure modes, exists in finance, insurance and legal.',
    'Redline is the bounded version. It takes a document and a rule pack, retrieves the relevant reference material, and produces findings — each one cited to the exact reference line, with a severity and a rationale a reviewer can accept or reject. It has no approve action. A deterministic verifier confirms every citation exists before a finding is shown; anything it cannot verify is downgraded to a question. Every finding, every reviewer decision and every rule-pack version goes to an append-only audit table, and the accept/reject decisions feed the eval set that scores the next release. It ships first for a Timberwright retainer client, then as a sanitized public version.',
  ],
  system: {
    caption:
      'A document and a rule pack go in; cited findings and an audit trail come out. Extraction and the required-disclosure checks are deterministic; the model drafts findings and nothing else; a verifier stands between the model and the reviewer; and the only approve action in the system belongs to a human, with their name on the audit row.',
    nodes: [
      { id: 'content', label: 'Content in', note: 'PDF, DOCX, slides, HTML — extracted to text with page, slide and line anchors so every finding can point at a location.', col: 0, row: 0, span: 3 },
      { id: 'rules', label: 'Rule packs', note: 'Versioned YAML: claims substantiation, required disclosures, restricted claims, PII. Each rule names its check kind (deterministic or model-assisted) and its default severity.', col: 3, row: 0, span: 3 },
      { id: 'refs', label: 'Reference docs', note: 'The approved sources claims may cite. Indexed with pgvector; every chunk keeps its document, page and line so a citation is an address, not a paraphrase.', col: 6, row: 0, span: 3 },
      { id: 'retrieval', label: 'Retrieval', note: 'For every claim the extractor found: the top reference chunks by similarity, filtered to the rule pack\'s allowed sources. Returns anchors, never prose the model could invent.', col: 9, row: 0, span: 3 },
      { id: 'disclosures', label: 'Disclosure checks', note: 'Required-disclosure and restricted-claim rules run as deterministic presence and pattern checks over the extracted text. No model call; same answer every run.', col: 0, row: 1, span: 3 },
      { id: 'findings', label: 'Finding drafter', note: 'Claude structured outputs: one finding per claim — location, rule, cited reference anchor, severity, rationale. The schema has no "approved" value.', col: 3, row: 1, span: 3 },
      { id: 'verifier', label: 'Citation verifier', note: 'Resolves every cited anchor and checks the cited span exists and is in an allowed source. A finding that fails becomes a question for the reviewer, never a cited finding.', col: 6, row: 1, span: 3 },
      { id: 'reviewer', label: 'Reviewer UI', note: 'Findings by severity with the cited line beside the flagged line. Accept, reject, or edit — each decision is a row in the audit and a label for the eval set.', col: 9, row: 1, span: 3 },
      { id: 'audit', label: 'Audit log', note: 'Append-only: document hash, rule-pack version, reference index hash, every finding, every decision, who and when. `redline audit export` reproduces a review from its rows.', col: 3, row: 2, span: 3 },
      { id: 'evals', label: 'Eval set', note: 'Seeded violations with known answers plus reviewer decisions from real runs. Precision, recall and false-positive rate per rule; scored by Verdict as a CI gate.', col: 6, row: 2, span: 3 },
    ],
    edges: [
      { from: 'content', to: 'disclosures', label: 'text + anchors' },
      { from: 'content', to: 'retrieval', label: 'claims' },
      { from: 'rules', to: 'disclosures', label: 'deterministic rules' },
      { from: 'rules', to: 'findings', label: 'model-assisted rules' },
      { from: 'refs', to: 'retrieval', label: 'pgvector' },
      { from: 'retrieval', to: 'findings', label: 'anchors' },
      { from: 'disclosures', to: 'verifier', label: 'findings' },
      { from: 'findings', to: 'verifier', label: 'drafts' },
      { from: 'verifier', to: 'reviewer', label: 'verified / questions' },
      { from: 'reviewer', to: 'audit', label: 'decisions' },
      { from: 'verifier', to: 'audit', label: 'findings' },
      { from: 'reviewer', to: 'evals', label: 'labels' },
    ],
  },
  flightData: [
    { label: 'Precision', value: null, unit: 'on seeded set', method: 'Share of findings that are real violations, on the eval set of seeded violations with a known answer key. Target set at the W3 scope + eval-set milestone; reported per rule pack.', measured: false },
    { label: 'Recall', value: null, unit: 'on seeded set', method: 'Share of seeded violations the review found, same set. A missed required disclosure counts as a miss regardless of severity.', measured: false },
    { label: 'False-positive rate', value: null, unit: '% of findings', method: 'Findings a reviewer rejected over findings shown, from the audit table of real runs. Tracked per rule; a rule above the threshold is demoted to informational until it is fixed.', measured: false },
    { label: 'Review time', value: null, unit: 'min / document, before → after', method: 'Reviewer wall-clock per document, measured on the pilot before the tool and with it. Both numbers are published; the before number is the pilot client\'s baseline, not an estimate.', measured: false },
    { label: 'Cost per document', value: null, unit: '$ / document', method: 'Model spend for extraction-assisted claims, finding drafts and any re-runs, per document reviewed. From the trace store once the pilot runs.', measured: false },
    { label: 'Auto-approvals', value: '0', unit: 'by design', method: 'The finding schema and the CLI have no approve action; approval is a reviewer-only decision recorded with their identity. Verified by the eval harness: a run that emits an approval fails.', measured: false },
  ],
  failureModes: [
    {
      symptom: 'A finding cited "source doc 04, table 2" as the support that was missing. Table 2 was about something else entirely.',
      cause: 'The model wrote the citation from the retrieved context and the context was the nearest chunk, not a relevant one. Nothing checked that the cited span said what the finding said it said.',
      fix: 'Citations are anchors (document, page, line range) resolved by a deterministic verifier before a finding is shown. The verifier checks the span exists, is in an allowed source, and contains the referenced terms; anything that fails is shown as a question with the reason, never as a cited finding.',
      eval: 'The seeded set includes claims whose nearest reference chunk is irrelevant; the expected output is a question, not a cited finding. A cited finding with a non-resolving anchor fails the run.',
      observed: false,
    },
    {
      symptom: 'The required disclosure was on the slide. In six-point type, in a footer, in an image. The review said it was missing.',
      cause: 'Extraction dropped the footer and the disclosure check ran on the text it had.',
      fix: 'Extraction keeps layout regions (body, footer, footnote, image text via OCR) and the disclosure check reports where it looked. Required-disclosure rules are deterministic presence checks over the full extracted text, with a per-region report so a reviewer can see the footer was read.',
      eval: 'Seeded documents place disclosures in footers, footnotes and images; the expected output is no finding. A false "missing disclosure" on any of them fails CI.',
      observed: false,
    },
    {
      symptom: 'By the third week reviewers were accepting the tool\'s findings without reading them.',
      cause: 'Too many low-value findings at the same severity; the signal drowned and the reviewers adapted.',
      fix: 'Severity is calibrated from reviewer decisions: every accept/reject is a label, false-positive rate is tracked per rule, and a rule above the threshold is demoted to informational until the rule or the retrieval is fixed. The UI shows the cited line beside the flagged line so accepting requires reading both.',
      eval: 'Per-rule false-positive rate on the seeded set plus the pilot\'s audit rows; the release gate fails if any rule at HIGH severity exceeds the threshold.',
      observed: false,
    },
    {
      symptom: 'The rule pack changed in November. A finding from October was re-read against the new rules and looked wrong.',
      cause: 'Findings referenced rules by name; the rule text had moved underneath them.',
      fix: 'Rule packs are versioned and every audit row records the rule-pack version, the reference-index hash and the document hash. `redline audit export` reproduces the review exactly as it ran; re-reviewing under a new pack is an explicit new run, not a reinterpretation of the old one.',
      eval: 'Audit export test: replaying the recorded versions must regenerate the same findings byte for byte; a drift fails CI.',
      observed: false,
    },
    {
      symptom: 'A document under review contained a customer\'s personal details. They were in the model request and in the logs.',
      cause: 'PII detection was one rule among many and ran after retrieval.',
      fix: 'The PII rule pack runs first and deterministically; detected spans are redacted before any model call and stored in the audit as hashes with their location, never as text. The trace store records that a redaction happened, not what was redacted.',
      eval: 'Seeded documents contain synthetic PII; the eval asserts none of it appears in any model request, response or trace row.',
      observed: false,
    },
  ],
  trace: {
    title: 'redline review deck-v3.pdf --rules claims-policy · run #1193 (projected)',
    note: 'One review as the audit and trace store will record it: extraction, deterministic disclosure checks, retrieval against the indexed references, two drafted findings, both verified, zero approvals, one audit export. Finding and document counts follow the mission card; timings and tokens are what a healthy run should look like, not a measurement.',
    steps: [
      { t: 0, step: 'extract deck-v3.pdf · 18 slides · 212 lines · 4 regions (body, footer, footnote, image)', tool: 'extract', tokens: 0, usd: 0, ms: 1900, status: 'ok' },
      { t: 1900, step: 'PII pass · 0 spans redacted', tool: 'rules/pii', tokens: 0, usd: 0, ms: 60, status: 'ok' },
      { t: 1960, step: 'index 14 reference docs · 1,406 chunks (cached, index hash a41f…)', tool: 'pgvector', tokens: 0, usd: 0, ms: 320, status: 'ok' },
      { t: 2280, step: 'disclosure checks · 6 required · 5 present · slide 9 missing', tool: 'rules/disclosures', tokens: 0, usd: 0, ms: 45, status: 'ok' },
      { t: 2325, step: 'claims extracted · 11 · retrieval top-5 per claim', tool: 'retrieval', tokens: 0, usd: 0, ms: 740, status: 'ok' },
      { t: 3065, step: 'draft findings (structured output) · 11 claims → 1 finding, 10 supported', tool: 'claude', tokens: 14200, usd: 0.058, ms: 7400, status: 'ok' },
      { t: 10465, step: 'verify citation · slide 7 → source-doc 04, table 2 · span resolves · not supporting → HIGH', tool: 'verifier', tokens: 0, usd: 0, ms: 12, status: 'ok' },
      { t: 10477, step: 'verify citation · slide 9 → rule disclosures/02 · deterministic → MEDIUM', tool: 'verifier', tokens: 0, usd: 0, ms: 3, status: 'ok' },
      { t: 10480, step: '2 findings · 0 auto-approvals · action: reviewer', tool: 'redline', tokens: 0, usd: 0, ms: 1, status: 'gate' },
      { t: 10481, step: 'audit #1193 written · doc hash, pack claims-policy@3, index a41f…', tool: 'audit', tokens: 0, usd: 0, ms: 18, status: 'ok' },
    ],
  },
  buildLog: [
    { date: '2026-10-29', title: 'Mission brief written; universe page published as the plan of record', done: true },
    { date: '2026-11-13', title: 'W3 — scope + eval set', note: 'Pick the pilot workflow with the Timberwright client. Rule-pack schema, the seeded-violation set with its answer key, the reviewer rubric. Flight-data targets set here. Language decided here (Python if Verdict\'s judge is in by then, TypeScript otherwise).', done: false },
    { date: '2026-11-20', title: 'W4 — extract, rules, index', note: 'Extractor with page/slide/line anchors and layout regions; rule packs as versioned YAML; deterministic disclosure and PII checks; reference docs indexed with pgvector.', done: false },
    { date: '2026-11-27', title: 'W5 — findings + verifier', note: 'Structured-output finding drafter, citation verifier, severity, questions for anything unverifiable. `redline review` end to end on the seeded set.', done: false },
    { date: '2026-12-04', title: 'W6 — reviewer UI, audit, eval gate', note: 'Accept/reject UI with the cited line beside the flagged line; append-only audit table and `redline audit export`; eval harness scored by Verdict as a CI gate.', done: false },
    { date: '2026-12-11', title: 'W7 — client pilot', note: 'Private pilot on the client\'s real review queue. Review time before and after measured; audit rows become eval labels. Nothing from the pilot is published.', done: false },
    { date: '2026-12-18', title: 'W8 — sanitized public version, case study, first real flight data on this page', note: 'Public repo with synthetic reference docs and seeded set; README case study; status flips to OPERATIONAL with the pilot\'s numbers, de-identified.', done: false },
  ],
  launch: {
    compose:
      'git clone https://github.com/mitthoma/redline   # not public yet — sanitized version publishes at W8\ncd redline && docker compose up            # postgres + pgvector + reviewer UI\nredline index ./fixtures/reference/*.pdf   # reference docs → anchored chunks\nredline review ./fixtures/deck-v3.pdf --rules claims-policy\nredline audit export --run 1193            # the review, reproducible from its rows',
    readme: null,
    sourceNote: 'repo goes public with the sanitized version at W8 (github.com/mitthoma/redline — not public yet)',
    demoNote: 'recorded at W8',
    readmeNote: 'case study, W8',
    tourNote: 'The README is written as a case study: the review queue problem, the extract → check → retrieve → draft → verify pipeline, why the system has no approve action, what the seeded set is designed to catch, the audit export and what it reproduces, and how to run it against your own documents and rule pack in one command.',
  },
  media: [
    { kind: 'gif', title: 'One review, start to audit row', spec: '90s capture, 1600×1000: extraction, disclosure checks, retrieval, the two findings with their cited lines, the reviewer accepting one, the audit export. Convert to MP4 + poster.', status: 'needed' },
    { kind: 'diagram', title: 'System map', spec: 'The interactive SVG on this page, exported as a static PNG for the README and OG image.', status: 'in-progress' },
    { kind: 'image', title: 'A finding beside its citation', spec: 'Reviewer UI on a seeded document: the flagged line, the cited reference line, severity and rationale, accept/reject.', status: 'needed' },
    { kind: 'image', title: 'The verifier downgrading a finding', spec: 'A drafted finding whose anchor does not support the claim, shown as a question with the verifier\'s reason instead of a cited finding.', status: 'needed' },
    { kind: 'image', title: 'Eval report', spec: 'Verdict report for the seeded set: precision, recall and false-positive rate per rule pack, with the CI gate result.', status: 'needed' },
  ],
};
