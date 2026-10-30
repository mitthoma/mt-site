import type { Universe } from './types';

/**
 * MISSION_006 — PARLEY
 * Status: PENDING (T-MINUS). This is a mission brief: every flight-data tile
 * is a target (the 800 ms turn budget is the one number the spec fixes; the
 * rest name what gets measured and get their targets at the turn-controller
 * spike), every trace step is a projection, every build-log entry after the
 * first is a plan. The template labels them that way. Nothing flips to
 * MEASURED or OPERATIONAL until a real call has been traced and scored.
 *
 * The fleet feeds this one: Sentinel gates its tools, Verdict scores its
 * transcripts, Nightwatch runs its nightly eval, Ledger loads the dataset the
 * second agent answers questions about.
 *
 * Source of truth: Project 2027 → levelup/07-showcase-projects.md (Proof F).
 * Build tasks are not scheduled yet (08-build-plan.md lists Parley under
 * "briefs first"); the build log below carries the milestone plan from the
 * brief until a build agent is assigned.
 */
export const parley: Universe = {
  slug: 'parley',
  mission: 'MISSION_006',
  codename: 'PARLEY',
  tagline:
    'A real-time voice agent: streams speech in, reasons and calls tools mid-conversation, streams speech out, handles barge-in, and stays under an 800 ms turn budget — every turn traced, every transcript scored.',
  accent: '#00ff66',
  status: 'pending',
  repo: null,
  demo: null,
  updated: '2026-10-30',
  boot: 'parley call --agent scheduling.yaml --budget-ms 800',
  problem: [
    'Most agent demos are a text box. The moment the interface is a phone call the problem changes shape: the user is talking while the model is still thinking, the model is talking while the user has already changed their mind, and every hundred milliseconds of silence is something the caller can feel. It stops being a prompt problem and becomes a systems problem — streaming, cancellation, budgets — which is why most portfolios have nothing in this column.',
    'The parts exist. Speech-to-text streams partial transcripts; the model streams tokens; text-to-speech streams audio; tool calls return in a few hundred milliseconds. What does not exist off the shelf is the controller that decides, on every turn, when the user has finished, when to start speaking before the model has finished, what to do when the caller interrupts, and how to call a tool mid-sentence without a dead pause. Get that controller wrong and the agent talks over people, answers the previous question, or goes quiet for three seconds while it looks something up.',
    'Parley is that controller with a trace on every turn. One agent books a slot against a calendar; the other answers questions about a dataset Ledger has loaded. Each turn records STT, model and TTS milliseconds and model spend; barge-in cancels speech within a budget; tools are called through Sentinel; every transcript is scored by Verdict against a scripted eval set; Nightwatch runs that eval every night. The number on this page will be a real one you can call from a browser, with a latency HUD showing the turn you are in.',
  ],
  system: {
    caption:
      'Audio in, audio out, and a controller in the middle that owns the clock. STT, the model and TTS all stream; the turn controller decides when a turn starts, when speech starts, and what gets cancelled on barge-in. Tools go through Sentinel; every turn goes to the trace store; every call goes to the eval set.',
    nodes: [
      { id: 'caller', label: 'Caller', note: 'A browser (WebRTC) or a real phone number through a telephony provider. Opus audio in both directions; the controller does not care which.', col: 0, row: 0, span: 3 },
      { id: 'stt', label: 'Streaming STT', note: 'Partial transcripts as the caller speaks, with word timings. Voice-activity detection runs alongside so the controller knows about silence before the transcript does.', col: 3, row: 0, span: 3 },
      { id: 'controller', label: 'Turn controller', note: 'The one stateful piece: end-of-turn detection, when to start speaking, barge-in → cancel TTS and the in-flight model stream, partial-response policy, the 800 ms budget per turn. Everything else is a stream it starts or stops.', col: 6, row: 0, span: 3 },
      { id: 'tts', label: 'Streaming TTS', note: 'Sentence-sized chunks of the model stream become audio as soon as they are complete; the first chunk is on the wire before the model has finished the reply. Cancellable mid-word.', col: 9, row: 0, span: 3 },
      { id: 'llm', label: 'Claude, streamed', note: 'Tool use with streaming: the controller reads tokens as they arrive, routes complete sentences to TTS, and intercepts tool-call blocks without waiting for the end of the message.', col: 3, row: 1, span: 3 },
      { id: 'agents', label: 'Agent specs', note: 'YAML per agent: voice, system prompt, allowed tools and their Sentinel policy, the filler policy for slow tools, the eval set that scores it. Two shipped: scheduling and ask-the-dataset.', col: 6, row: 1, span: 3 },
      { id: 'tools', label: 'Tools via Sentinel', note: 'calendar.find_slot, calendar.book, dataset.query (a Ledger-loaded table). Every call goes through the policy gateway; a gated action tells the caller it needs confirmation instead of doing it.', col: 9, row: 1, span: 3 },
      { id: 'traces', label: 'Trace store', note: 'Postgres: calls, turns, segments. Per turn: STT ms, time-to-first-token, model ms, TTS ms, tool ms, tokens, $, whether the turn was interrupted. The HUD and the flight-data tiles read from here.', col: 3, row: 2, span: 3 },
      { id: 'evals', label: 'Call evals', note: 'Forty scripted conversations with a pass/fail rubric per turn: did it book the right slot, did it stop when interrupted, did it never claim a tool result it did not get. Scored by Verdict; run nightly by Nightwatch.', col: 6, row: 2, span: 3 },
      { id: 'hud', label: 'Live HUD', note: 'On this page once the number is live: the current call\'s turns as they happen — STT · LLM · TTS bars against the 800 ms budget, tool calls, barge-ins.', col: 9, row: 2, span: 3 },
    ],
    edges: [
      { from: 'caller', to: 'stt', label: 'opus 48k' },
      { from: 'stt', to: 'controller', label: 'partials + VAD' },
      { from: 'controller', to: 'llm', label: 'turn' },
      { from: 'llm', to: 'controller', label: 'token stream' },
      { from: 'controller', to: 'tts', label: 'sentences' },
      { from: 'tts', to: 'caller', label: 'audio' },
      { from: 'agents', to: 'controller', label: 'spec' },
      { from: 'llm', to: 'tools', label: 'tool_use' },
      { from: 'tools', to: 'llm', label: 'result' },
      { from: 'controller', to: 'traces', label: 'per turn' },
      { from: 'traces', to: 'evals', label: 'transcripts' },
      { from: 'traces', to: 'hud', label: 'live' },
    ],
  },
  flightData: [
    { label: 'p95 turn latency', value: '< 800', unit: 'ms', method: 'From the caller\'s last word (VAD end-of-turn) to the first byte of agent audio, 95th percentile over all turns in the trace store. The budget the controller enforces; a turn over it is logged with which segment blew it.', measured: false },
    { label: 'p50 turn latency', value: null, unit: 'ms', method: 'Same measurement, median. Target set at the turn-controller spike once the STT and TTS providers are chosen and their real first-byte times are known.', measured: false },
    { label: 'Barge-in recovery', value: null, unit: 'ms', method: 'From the caller starting to speak over the agent to the agent\'s audio stopping, measured at the controller. Target set at the spike; the eval set has interruptions in 12 of 40 conversations.', measured: false },
    { label: 'Tool-call success in-call', value: null, unit: '% first attempt', method: 'Tool calls that return a usable result on the first attempt during a live call, from the trace store. Gated and denied calls (Sentinel) are counted separately, not as failures.', measured: false },
    { label: 'Transcript eval pass', value: null, unit: '% of 40 calls', method: 'Scripted conversations played against the agent, scored by Verdict against a per-turn rubric: right action, right slot, stopped on interruption, no claimed result that was not returned. Target set when the eval set is written at W14.', measured: false },
    { label: 'Cost per minute', value: null, unit: '$ / call-minute', method: 'STT + model + TTS + telephony spend per minute of connected call, from the trace store. Published per agent; the dataset agent will cost more than scheduling.', measured: false },
  ],
  failureModes: [
    {
      symptom: 'The caller paused to think. The agent answered the half-sentence.',
      cause: 'End-of-turn was a fixed silence timeout. A pause mid-thought and the end of a question look the same to a timer.',
      fix: 'End-of-turn combines VAD silence with the transcript: a trailing partial that is syntactically incomplete extends the window; a question mark or a completed clause shortens it. The controller logs which signal ended each turn so false triggers can be counted.',
      eval: 'Scripted conversations include mid-sentence pauses up to 1.2 s; the expected behaviour is one reply to the whole sentence. An early reply is a failed turn.',
      observed: false,
    },
    {
      symptom: 'The caller said "actually, Thursday". The agent kept talking about Wednesday for four more seconds.',
      cause: 'Barge-in detection only cancelled TTS. The model stream was still running and the next sentence was already queued.',
      fix: 'Barge-in cancels three things at once: the TTS stream, the in-flight model stream, and the sentence queue between them. The partial reply is recorded in the transcript as interrupted at the word it stopped, so the next turn\'s context says what the caller actually heard.',
      eval: 'Twelve of the forty scripted calls interrupt the agent; the rubric checks audio stopped within the recovery budget and the next reply addresses the interruption, not the abandoned sentence.',
      observed: false,
    },
    {
      symptom: 'Three seconds of dead air every time the agent checked the calendar.',
      cause: 'The controller waited for the tool result before producing any speech.',
      fix: 'Per-agent filler policy: when a tool call is intercepted the controller speaks a short acknowledgement from the spec ("let me check that") while the tool runs, then streams the real answer. Filler text is marked in the transcript so evals can check it never asserts a result.',
      eval: 'Trace assertion: no silent gap over the budget while a tool call is in flight. Rubric: filler never states a slot, price or fact.',
      observed: false,
    },
    {
      symptom: 'The agent confirmed a booking. There was no booking.',
      cause: 'The tool call failed; the model, mid-stream, had already started the confirmation sentence.',
      fix: 'The controller holds any sentence that follows a tool call until the result is back, and tool results are the only source of outcome language — the spec forbids the model from stating an outcome the tool did not return. A Sentinel gate on calendar.book means a real booking also needs the caller\'s explicit yes.',
      eval: 'Scripted calls with a failing calendar tool; the pass condition is the agent reporting the failure and offering an alternative. Any confirmation of an unbooked slot fails the whole call.',
      observed: false,
    },
    {
      symptom: 'The dataset agent answered a question about a column it had been told was off limits.',
      cause: 'The restriction lived in the system prompt. The caller asked twice.',
      fix: 'Tool access is enforced by Sentinel\'s policy on dataset.query — restricted columns are denied at the gateway, not by the prompt. The denial comes back as a tool result the agent can relay ("I can\'t share that"), and the audit row records the attempt.',
      eval: 'Red-team transcripts in the eval set ask for restricted fields in six ways; a pass requires a denial in the audit log and no restricted value in the transcript.',
      observed: false,
    },
  ],
  trace: {
    title: 'parley call --agent scheduling.yaml --budget-ms 800 · call 02:14 (projected)',
    note: 'One scheduling call as the trace store will record it: connect, nine turns, one tool call with filler, one barge-in, the booking gated behind an explicit yes, transcript scored 8/8. The turn-01 segment times, the tool call, the barge-in and the summary line follow the mission card; the rest is what a healthy call should look like, not a measurement.',
    steps: [
      { t: 0, step: 'ring · connected · codec opus · 48k · agent scheduling.yaml · budget 800 ms', tool: 'webrtc', tokens: 0, usd: 0, ms: 410, status: 'ok' },
      { t: 410, step: 'greeting · tts first byte 160 ms', tool: 'tts', tokens: 0, usd: 0.002, ms: 1800, status: 'ok' },
      { t: 6200, step: 'turn 01 · "can I get something next week" · stt 210 · llm 340 · tts 180 = 730 ms', tool: 'controller', tokens: 1850, usd: 0.011, ms: 730, status: 'ok' },
      { t: 9800, step: 'turn 02 · tool_use intercepted mid-stream · calendar.find_slot(week=+1) via sentinel · allow', tool: 'sentinel', tokens: 0, usd: 0, ms: 9, status: 'ok' },
      { t: 9809, step: 'filler · "let me check that" · tool 480 ms → 2 options', tool: 'calendar.find_slot', tokens: 0, usd: 0, ms: 480, status: 'ok' },
      { t: 10289, step: 'turn 02 · reply streams · stt 190 · llm 410 · tts 170 = 770 ms', tool: 'controller', tokens: 2310, usd: 0.014, ms: 770, status: 'ok' },
      { t: 14100, step: 'turn 03 · barge-in detected at word 11 · tts cancelled · llm stream cancelled · queue cleared · 140 ms to silence', tool: 'controller', tokens: 940, usd: 0.005, ms: 140, status: 'ok' },
      { t: 14240, step: 'turn 03 · "actually, Thursday" · stt 180 · llm 320 · tts 170 = 670 ms', tool: 'controller', tokens: 2020, usd: 0.012, ms: 670, status: 'ok' },
      { t: 61000, step: 'turn 08 · calendar.book(thu 14:00) · sentinel gate → needs caller confirmation', tool: 'sentinel', tokens: 0, usd: 0, ms: 11, status: 'gate' },
      { t: 64900, step: 'turn 09 · "yes" · gate released · booked · confirmation spoken from the tool result', tool: 'calendar.book', tokens: 1480, usd: 0.009, ms: 740, status: 'ok' },
      { t: 134000, step: 'hang-up · 9 turns · p95 760 ms · 1 barge-in · 2 tool calls · $0.053', tool: 'traces', tokens: 0, usd: 0, ms: 22, status: 'ok' },
      { t: 134022, step: 'transcript scored · verdict run scheduling-eval · 8/8', tool: 'verdict', tokens: 3600, usd: 0.012, ms: 2900, status: 'ok' },
    ],
  },
  buildLog: [
    { date: '2026-10-30', title: 'Mission brief written; universe page published as the plan of record', done: true },
    { date: '2027-01-10', title: 'Turn-controller spike (the weekend before W12)', note: 'Pick the STT and TTS providers by measured first-byte time; prototype end-of-turn + barge-in on a local loop; set the p50 and barge-in targets from what the providers actually do. Repo goes public here.', done: false },
    { date: '2027-01-15', title: 'W12 — streaming loop end to end', note: 'Browser WebRTC in, streaming STT → Claude streamed → streaming TTS out, with the controller owning start, stop and cancel. Trace per turn to Postgres.', done: false },
    { date: '2027-01-22', title: 'W13 — tools + barge-in', note: 'Tool-call interception mid-stream, filler policy, calendar tools behind Sentinel, barge-in cancelling all three streams. Scheduling agent complete.', done: false },
    { date: '2027-01-29', title: 'W14 — traces + evals', note: 'Forty scripted conversations with the per-turn rubric; Verdict scores them; Nightwatch runs the eval nightly. Dataset agent over a Ledger-loaded table.', done: false },
    { date: '2027-02-05', title: 'W15 — number live + HUD', note: 'Telephony provider wired to a real number; the live latency HUD on this page; call limits and spend caps in the agent spec.', done: false },
    { date: '2027-02-12', title: 'W16 — README case study, demo, first real flight data on this page', note: 'Recorded demo call, README with the measured tiles, status flips to OPERATIONAL.', done: false },
  ],
  launch: {
    compose:
      'git clone https://github.com/mitthoma/parley   # not public yet — repo opens at the turn-controller spike\ncd parley && docker compose up            # postgres + controller + web client\nparley call --agent agents/scheduling.yaml --budget-ms 800   # local WebRTC call in the browser\nparley eval --agent agents/scheduling.yaml --set evals/scheduling   # 40 scripted calls → Verdict\nparley traces --call last                 # every turn: stt · llm · tts · tool · $',
    readme: null,
    sourceNote: 'repo goes public at the turn-controller spike (github.com/mitthoma/parley — not public yet)',
    demoNote: 'recorded at W16',
    readmeNote: 'case study, W16',
    tourNote: 'The README is written as a case study: why a voice agent is a systems problem and not a prompt problem, the turn controller and the three things barge-in has to cancel, the filler policy and why outcome language only comes from tool results, the eval set and what the rubric catches, the trace schema behind the HUD, and how to run a local call in one command.',
  },
  media: [
    { kind: 'video', title: 'One call, with the HUD', spec: '90s screen + audio capture, 1600×1000: the browser call, the HUD bars per turn against the 800 ms budget, the barge-in, the gated booking. MP4 + poster.', status: 'needed' },
    { kind: 'diagram', title: 'System map', spec: 'The interactive SVG on this page, exported as a static PNG for the README and OG image.', status: 'in-progress' },
    { kind: 'audio', title: 'A barge-in, as heard', spec: '20 s clip: the agent mid-sentence, the caller interrupting, the agent stopping and answering the interruption.', status: 'needed' },
    { kind: 'image', title: 'Turn trace', spec: 'Trace viewer for one call: nine turns, each segmented into STT · first token · model · TTS · tool, with the one that went over budget highlighted.', status: 'needed' },
    { kind: 'image', title: 'Eval report', spec: 'Verdict report for the 40 scripted calls: pass rate per rubric item, the interrupted-call subset, the failing-tool subset.', status: 'needed' },
  ],
};
