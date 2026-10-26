/**
 * Content model for /work/<slug> "universe" pages.
 *
 * Honesty rule: a `Stat` is either measured (`measured: true`, with the
 * method) or a projection/target. The template labels projections as such
 * and renders null values as "—". Never put a projected number in a
 * measured stat.
 */

export type MissionStatus = 'operational' | 'in-flight' | 'pending';

export interface Stat {
  label: string;
  value: string | null;
  unit?: string;
  /** how the number is (or will be) measured — rendered in small type */
  method: string;
  measured: boolean;
}

export interface SystemNode {
  id: string;
  label: string;
  /** one-line note shown on hover/focus */
  note: string;
  /** grid position, 12-column layout, row index */
  col: number;
  row: number;
  /** width in columns (default 3) */
  span?: number;
}

export interface SystemEdge {
  from: string;
  to: string;
  label?: string;
}

export interface FailureMode {
  symptom: string;
  cause: string;
  fix: string;
  eval: string;
  /** true when this was observed in a real run; false when anticipated by design */
  observed: boolean;
}

export interface TraceStep {
  t: number; // ms from start
  step: string;
  tool: string;
  tokens: number | null;
  usd: number | null;
  ms: number | null;
  status: 'ok' | 'gate' | 'retry' | 'fail';
}

export interface BuildLogEntry {
  date: string; // YYYY-MM-DD
  title: string;
  note?: string;
  href?: string; // blog post or PR
  done: boolean;
}

export interface MediaItem {
  kind: 'gif' | 'video' | 'image' | 'diagram' | 'audio';
  title: string;
  spec: string;
  status: 'needed' | 'in-progress' | 'ready';
  src?: string;
}

export interface Universe {
  slug: string;
  mission: string; // MISSION_001
  codename: string; // NIGHTWATCH
  tagline: string; // one-line role
  accent: string; // hex
  status: MissionStatus;
  /** primary language, for structured data (default TypeScript) */
  language?: string;
  repo: string | null;
  demo: string | null;
  updated: string; // YYYY-MM-DD
  /** typed boot line in the hero */
  boot: string;
  problem: string[]; // paragraphs
  system: { nodes: SystemNode[]; edges: SystemEdge[]; caption: string };
  flightData: Stat[];
  failureModes: FailureMode[];
  trace: { title: string; note: string; steps: TraceStep[] };
  buildLog: BuildLogEntry[];
  launch: {
    compose: string;
    readme: string | null;
    tourNote: string;
    /** labels for the disabled launch links while the brief is in flight */
    sourceNote?: string;
    demoNote?: string;
    readmeNote?: string;
  };
  media: MediaItem[];
}
