import { getTemplateById } from "@/data/templates";
import type { Draft, DraftStatus, Session } from "@/types";

export type TemplateUsageRow = {
  templateId: string;
  title: string;
  lane: string;
  sessionCount: number;
  draftCount: number;
  /** Weight sessions slightly higher than drafts for “most used” */
  score: number;
};

/**
 * Aggregate template usage from local sessions + drafts (templateId optional).
 */
export function computeTemplateUsage(
  sessions: Session[],
  drafts: Draft[],
): TemplateUsageRow[] {
  const map = new Map<
    string,
    { sessionCount: number; draftCount: number }
  >();

  for (const s of sessions) {
    if (!s.templateId) continue;
    const cur = map.get(s.templateId) ?? { sessionCount: 0, draftCount: 0 };
    cur.sessionCount += 1;
    map.set(s.templateId, cur);
  }
  for (const d of drafts) {
    if (!d.templateId) continue;
    const cur = map.get(d.templateId) ?? { sessionCount: 0, draftCount: 0 };
    cur.draftCount += 1;
    map.set(d.templateId, cur);
  }

  const rows: TemplateUsageRow[] = [];
  for (const [templateId, c] of map) {
    const t = getTemplateById(templateId);
    rows.push({
      templateId,
      title: t?.title ?? templateId,
      lane: t?.lane ?? "—",
      sessionCount: c.sessionCount,
      draftCount: c.draftCount,
      score: c.sessionCount * 2 + c.draftCount,
    });
  }

  return rows.sort((a, b) => b.score - a.score);
}

export function countDraftsByStatus(drafts: Draft[]): Record<DraftStatus, number> {
  const init: Record<DraftStatus, number> = {
    draft: 0,
    review: 0,
    ready: 0,
    archived: 0,
  };
  for (const d of drafts) {
    init[d.status] += 1;
  }
  return init;
}

export type SessionRollup = {
  totalSessions: number;
  completedSessions: number;
  interruptedOrPaused: number;
  totalDeepMinutes: number;
  totalOutputs: number;
  byLane: { lane: string; minutes: number; sessions: number }[];
};

export function computeSessionRollup(sessions: Session[]): SessionRollup {
  let completedSessions = 0;
  let interruptedOrPaused = 0;
  let totalDeepMinutes = 0;
  let totalOutputs = 0;
  const laneMap = new Map<string, { minutes: number; sessions: number }>();

  for (const s of sessions) {
    totalDeepMinutes += s.deepWorkMinutes ?? 0;
    totalOutputs += s.outputCount ?? 0;
    if (s.outcome === "completed" || s.outcome === undefined) {
      completedSessions += 1;
    } else {
      interruptedOrPaused += 1;
    }
    const cur = laneMap.get(s.lane) ?? { minutes: 0, sessions: 0 };
    cur.minutes += s.deepWorkMinutes ?? 0;
    cur.sessions += 1;
    laneMap.set(s.lane, cur);
  }

  const byLane = [...laneMap.entries()]
    .map(([lane, v]) => ({ lane, ...v }))
    .sort((a, b) => b.minutes - a.minutes);

  return {
    totalSessions: sessions.length,
    completedSessions,
    interruptedOrPaused,
    totalDeepMinutes,
    totalOutputs,
    byLane,
  };
}

export type DraftTotals = {
  total: number;
  totalWords: number;
  pinned: number;
};

export function computeDraftTotals(drafts: Draft[]): DraftTotals {
  let totalWords = 0;
  let pinned = 0;
  for (const d of drafts) {
    totalWords += d.wordCount ?? 0;
    if (d.pinned) pinned += 1;
  }
  return { total: drafts.length, totalWords, pinned };
}
