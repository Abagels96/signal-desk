import type { Session } from "@/types";

/** Calendar day key (UTC) for grouping session activity */
function dayKey(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

function countsAsActive(s: Session): boolean {
  return s.outcome === "completed" || s.outcome === undefined;
}

/**
 * Consecutive days with at least one qualifying session, counting backward from
 * the most recent active day (not necessarily “today”).
 */
export function computeActivityStreak(sessions: Session[]): number {
  const days = new Set<string>();
  for (const s of sessions) {
    if (!countsAsActive(s)) continue;
    days.add(dayKey(s.startedAt));
  }
  if (days.size === 0) return 0;

  const sorted = [...days].sort();
  const lastDay = sorted[sorted.length - 1];
  let streak = 0;
  const cursor = new Date(lastDay + "T12:00:00.000Z");
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

export function sumDeepWorkMinutes(sessions: Session[]): number {
  return sessions.reduce((acc, s) => acc + (s.deepWorkMinutes ?? 0), 0);
}

export function completedSessionCount(sessions: Session[]): number {
  return sessions.filter(countsAsActive).length;
}
