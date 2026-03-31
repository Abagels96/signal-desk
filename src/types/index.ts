/** Signal Desk — shared domain types (MVP; front-end + localStorage only). */

export type Template = {
  id: string;
  title: string;
  /** Editorial / workflow lane shown in the shell */
  lane: string;
  blurb: string;
  tags: string[];
  /** Optional ICP or reader */
  audience?: string;
  /** Rough time-to-first-draft guidance */
  estMinutes?: number;
  /** Pre-filled prompt when opening Generate from this template */
  promptSeed?: string;
};

export type DraftStatus = "draft" | "review" | "ready" | "archived";

export type Draft = {
  id: string;
  title: string;
  body: string;
  status: DraftStatus;
  templateId?: string;
  updatedAt: string;
  wordCount: number;
  /** Pinned drafts surface first in lists */
  pinned?: boolean;
};

export type SessionOutcome = "completed" | "interrupted" | "paused";

export type Session = {
  id: string;
  startedAt: string;
  endedAt?: string;
  focusLabel: string;
  lane: string;
  templateId?: string;
  outputCount: number;
  deepWorkMinutes: number;
  outcome?: SessionOutcome;
  notes?: string;
};

export type InsightCategory =
  | "content"
  | "productivity"
  | "workflow"
  | "quality";

export type InsightTrend = "up" | "down" | "neutral";

export type Insight = {
  id: string;
  title: string;
  summary: string;
  category: InsightCategory;
  trend: InsightTrend;
  metricLabel?: string;
  metricValue?: string;
  period: string;
};

export type MockOutputKind =
  | "outline"
  | "email"
  | "memo"
  | "social"
  | "script"
  | "brief"
  | "bullets"
  | "press";

/** Stand-in for model generations — no API calls in MVP */
export type MockOutput = {
  id: string;
  title: string;
  body: string;
  kind: MockOutputKind;
  templateId?: string;
  createdAt: string;
};
