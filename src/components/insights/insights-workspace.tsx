"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui";
import { INSIGHT_CARDS } from "@/data/insights";
import {
  computeDraftTotals,
  computeSessionRollup,
  computeTemplateUsage,
  countDraftsByStatus,
} from "@/lib/insights-metrics";
import { cn } from "@/lib/cn";
import { useSignalStore } from "@/store/use-signal-store";
import type { DraftStatus } from "@/types";

const STATUS_ORDER: DraftStatus[] = [
  "draft",
  "review",
  "ready",
  "archived",
];

const STATUS_LABEL: Record<DraftStatus, string> = {
  draft: "Draft",
  review: "In review",
  ready: "Ready",
  archived: "Archived",
};

function trendBadge(trend: string) {
  if (trend === "up")
    return "text-emerald-400/90 border-emerald-400/25 bg-emerald-500/10";
  if (trend === "down")
    return "text-rose-400/90 border-rose-400/25 bg-rose-500/10";
  return "text-zinc-500 border-white/[0.08] bg-white/[0.04]";
}

export function InsightsWorkspace() {
  const sessions = useSignalStore((s) => s.sessions);
  const drafts = useSignalStore((s) => s.drafts);

  const templateUsage = useMemo(
    () => computeTemplateUsage(sessions, drafts),
    [sessions, drafts],
  );
  const draftStatus = useMemo(() => countDraftsByStatus(drafts), [drafts]);
  const draftTotals = useMemo(() => computeDraftTotals(drafts), [drafts]);
  const rollup = useMemo(() => computeSessionRollup(sessions), [sessions]);

  const maxUsageScore = useMemo(() => {
    const m = templateUsage[0]?.score ?? 1;
    return Math.max(m, 1);
  }, [templateUsage]);

  const maxLaneMinutes = useMemo(() => {
    const m = Math.max(0, ...rollup.byLane.map((x) => x.minutes));
    return Math.max(m, 1);
  }, [rollup.byLane]);

  const statusTotal = Object.values(draftStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-14 lg:gap-16">
      <header className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
            Insights
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.35rem]">
            How the desk has been running — from your device only.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">
            Numbers below are derived from saved sessions and drafts in{" "}
            <span className="text-zinc-400">localStorage</span>. Story-first layout,
            not a generic analytics grid.
          </p>
        </div>
        <div className="rounded-3xl border border-white/[0.07] bg-[linear-gradient(145deg,rgba(20,24,34,0.75)_0%,rgba(10,12,18,0.92)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:translate-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            At a glance
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-zinc-600">
                Sessions
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl text-zinc-100">
                {rollup.totalSessions}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-zinc-600">
                Deep time
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl text-zinc-100">
                {rollup.totalDeepMinutes}
                <span className="ml-1 text-sm font-sans font-normal text-zinc-500">
                  min
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-zinc-600">
                Drafts
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl text-zinc-100">
                {draftTotals.total}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-zinc-600">
                Words logged
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl text-zinc-100">
                {draftTotals.totalWords.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {/* Template usage — horizontal bars */}
      <section className="relative">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
              Template signal
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-normal text-zinc-100">
              Most-used lanes (sessions + drafts)
            </h2>
          </div>
          <p className="max-w-sm text-xs text-zinc-600">
            Sessions weighted 2× vs. drafts to reflect “time in lane.” Unlinked
            work doesn’t appear here.
          </p>
        </div>
        {templateUsage.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-white/[0.1] bg-white/[0.02] px-5 py-10 text-center text-sm text-zinc-500">
            No template usage yet — run Generate with a lane or save drafts tied to
            templates.
          </p>
        ) : (
          <ul className="space-y-5">
            {templateUsage.slice(0, 8).map((row, i) => (
              <li
                key={row.templateId}
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0a0b10]/80 p-5 sm:p-6",
                  i === 0 && "border-cyan-400/15 shadow-[0_0_40px_-12px_rgba(56,200,255,0.12)]",
                )}
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 bg-[linear-gradient(90deg,rgba(56,200,255,0.12),rgba(167,139,250,0.06),transparent)] opacity-90"
                  style={{
                    width: `${Math.max(8, (row.score / maxUsageScore) * 100)}%`,
                  }}
                  aria-hidden
                />
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="lane">{row.lane}</Badge>
                      <span className="text-[10px] font-mono text-zinc-600">
                        {row.templateId}
                      </span>
                    </div>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-zinc-100">
                      {row.title}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-6 text-sm tabular-nums text-zinc-400">
                    <span>
                      <span className="text-zinc-600">Sessions </span>
                      {row.sessionCount}
                    </span>
                    <span>
                      <span className="text-zinc-600">Drafts </span>
                      {row.draftCount}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Draft activity */}
        <section className="lg:col-span-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
            Draft activity
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-normal text-zinc-100">
            Status runway
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            A single strip of where your work sits — not a donut chart.
          </p>
          <div className="mt-6 grid gap-4">
            {statusTotal === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/[0.08] bg-black/20 px-4 py-6 text-center text-sm text-zinc-600">
                No drafts in local shelf yet.
              </p>
            ) : (
              <div className="flex h-4 overflow-hidden rounded-full">
                {STATUS_ORDER.map((st) => {
                  const n = draftStatus[st];
                  const pct = statusTotal ? (n / statusTotal) * 100 : 0;
                  if (n === 0) return null;
                  return (
                    <div
                      key={st}
                      className={cn(
                        "h-full min-w-[4px] transition-all",
                        st === "draft" && "bg-zinc-600/70",
                        st === "review" && "bg-cyan-500/50",
                        st === "ready" && "bg-emerald-500/45",
                        st === "archived" && "bg-zinc-700/50",
                      )}
                      style={{ width: `${pct}%` }}
                      title={`${STATUS_LABEL[st]}: ${n}`}
                    />
                  );
                })}
              </div>
            )}
            <ul className="space-y-2">
              {STATUS_ORDER.map((st) => (
                <li
                  key={st}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="text-zinc-400">{STATUS_LABEL[st]}</span>
                  <span className="tabular-nums text-zinc-200">
                    {draftStatus[st]}
                  </span>
                </li>
              ))}
            </ul>
            <p className="border-t border-white/[0.06] pt-4 text-xs text-zinc-600">
              {draftTotals.pinned} pinned ·{" "}
              {draftTotals.totalWords.toLocaleString()} words across drafts.
            </p>
          </div>
        </section>

        {/* Session history summary */}
        <section className="lg:col-span-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
            Session history
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-normal text-zinc-100">
            Where time pooled
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Deep minutes by lane — proportional bars, no charting library.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-4 text-xs text-zinc-600">
              <span>
                Completed:{" "}
                <span className="font-medium text-zinc-300">
                  {rollup.completedSessions}
                </span>
              </span>
              <span>
                Interrupted / paused:{" "}
                <span className="font-medium text-zinc-300">
                  {rollup.interruptedOrPaused}
                </span>
              </span>
              <span>
                Outputs logged:{" "}
                <span className="font-medium text-zinc-300">
                  {rollup.totalOutputs}
                </span>
              </span>
            </div>
            <ul className="space-y-4">
              {rollup.byLane.map((row, i) => (
                <li key={row.lane}>
                  <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                    <span className="font-medium text-zinc-300">{row.lane}</span>
                    <span className="tabular-nums text-zinc-500">
                      {row.minutes} min · {row.sessions} sessions
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className={cn(
                        "h-full rounded-full bg-[linear-gradient(90deg,rgba(56,200,255,0.55),rgba(167,139,250,0.45))]",
                        i === 0 && "shadow-[0_0_16px_rgba(110,200,255,0.25)]",
                      )}
                      style={{
                        width: `${Math.max(
                          6,
                          (row.minutes / maxLaneMinutes) * 100,
                        )}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            {sessions.length === 0 ? (
              <p className="text-sm text-zinc-600">No sessions in local history.</p>
            ) : null}
          </div>
        </section>
      </div>

      {/* Smart insight cards */}
      <section>
        <div className="mb-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
            Narrative signals
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-normal text-zinc-100">
            Smart insight cards
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Qualitative copy from mock catalog — pairs with your local metrics above.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {INSIGHT_CARDS.map((ins, i) => (
            <article
              key={ins.id}
              className={cn(
                "relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[linear-gradient(155deg,rgba(18,22,32,0.92)_0%,rgba(10,12,18,0.97)_100%)] p-6 sm:p-8 lg:p-10",
                i % 2 === 1 && "lg:ml-8 lg:max-w-[92%]",
                i % 2 === 0 && "lg:mr-8 lg:max-w-[92%]",
              )}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.35),transparent)]"
                aria-hidden
              />
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="neutral">{ins.category}</Badge>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    trendBadge(ins.trend),
                  )}
                >
                  {ins.trend}
                </span>
                <span className="text-xs text-zinc-600">{ins.period}</span>
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-normal leading-snug text-zinc-100 sm:text-2xl">
                {ins.title}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400">
                {ins.summary}
              </p>
              {ins.metricValue ? (
                <p className="mt-6 border-t border-white/[0.06] pt-5 text-sm text-zinc-400">
                  <span className="text-zinc-600">{ins.metricLabel}: </span>
                  <span className="font-semibold text-zinc-200">
                    {ins.metricValue}
                  </span>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
