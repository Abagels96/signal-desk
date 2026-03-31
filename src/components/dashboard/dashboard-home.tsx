"use client";

import {
  Activity,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Badge, buttonClasses, GlassCard } from "@/components/ui";
import { INSIGHT_CARDS } from "@/data/insights";
import { MOCK_TEMPLATES } from "@/data/templates";
import {
  completedSessionCount,
  computeActivityStreak,
  sumDeepWorkMinutes,
} from "@/lib/cockpit-stats";
import { cn } from "@/lib/cn";
import { useSignalStore } from "@/store/use-signal-store";
import { formatIsoDate } from "@/lib/utils";

const RIBBON_INSIGHTS = INSIGHT_CARDS.slice(0, 5);

export function DashboardHome() {
  const sessions = useSignalStore((s) => s.sessions);
  const favoriteTemplateIds = useSignalStore((s) => s.favoriteTemplateIds);
  const toggleFavoriteTemplate = useSignalStore((s) => s.toggleFavoriteTemplate);
  const drafts = useSignalStore((s) => s.drafts);

  const streak = useMemo(() => computeActivityStreak(sessions), [sessions]);
  const totalMinutes = useMemo(() => sumDeepWorkMinutes(sessions), [sessions]);
  const completed = useMemo(() => completedSessionCount(sessions), [sessions]);
  const recentSessions = useMemo(() => [...sessions].slice(0, 6), [sessions]);

  const favoriteTemplates = useMemo(
    () =>
      favoriteTemplateIds
        .map((id) => MOCK_TEMPLATES.find((t) => t.id === id))
        .filter((t): t is NonNullable<typeof t> => Boolean(t)),
    [favoriteTemplateIds],
  );

  const pinnedDrafts = useMemo(() => {
    return [...drafts]
      .filter((d) => d.pinned)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 3);
  }, [drafts]);

  const deepHours = Math.round((totalMinutes / 60) * 10) / 10;

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      {/* Hero + streak band */}
      <section className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        <div className="relative lg:col-span-7">
          <div
            className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-4 top-1/3 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl"
            aria-hidden
          />
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500">
            Operations cockpit
          </p>
          <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-normal leading-[1.06] tracking-tight text-zinc-50 sm:text-5xl">
            Run the desk. Ship the signal.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-500">
            Your creative control room — sessions, templates, and drafts stay on
            device. Tune lanes, then push work into Generate.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/generate"
              className={buttonClasses("primary", "lg")}
            >
              <Sparkles className="size-4 opacity-90" />
              Generate
            </Link>
            <Link href="/templates" className={buttonClasses("secondary", "lg")}>
              Templates
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
                Runway streak
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl text-zinc-100">
                {streak}
                <span className="ml-1 text-sm font-sans font-normal text-zinc-500">
                  days
                </span>
              </dd>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
                Sessions
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl text-zinc-100">
                {completed}
              </dd>
            </div>
            <div className="col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:col-span-1">
              <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
                Deep time
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl text-zinc-100">
                {deepHours}
                <span className="ml-1 text-sm font-sans font-normal text-zinc-500">
                  hrs
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-1">
          <GlassCard
            eyebrow="Momentum"
            title="Productivity streak"
            accent
            className="border-cyan-500/10 shadow-[0_0_40px_-12px_rgba(56,200,255,0.12)]"
            headerExtra={
              <Activity className="size-5 text-cyan-300/80" aria-hidden />
            }
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-[family-name:var(--font-display)] text-5xl font-normal leading-none tracking-tight text-zinc-50">
                  {streak}
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Consecutive days with a completed session (from your latest
                  activity).
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3 text-right">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
                  Logged focus
                </p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-200">
                  {totalMinutes}
                  <span className="text-sm font-normal text-zinc-500"> min</span>
                </p>
              </div>
            </div>
            <Link
              href="/productivity"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300/90 hover:text-cyan-200"
            >
              Open productivity
              <ArrowRight className="size-4" />
            </Link>
          </GlassCard>

          {pinnedDrafts.length > 0 ? (
            <div className="rounded-3xl border border-white/[0.07] bg-[linear-gradient(145deg,rgba(18,22,32,0.75)_0%,rgba(10,12,18,0.9)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                Pinned drafts
              </p>
              <ul className="mt-3 space-y-2">
                {pinnedDrafts.map((d) => (
                  <li key={d.id}>
                    <Link
                      href="/drafts"
                      className="block truncate rounded-xl px-2 py-1.5 text-sm text-zinc-300 transition hover:bg-white/[0.04] hover:text-zinc-100"
                    >
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* Recent sessions + favorites */}
      <section className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <GlassCard
          eyebrow="Telemetry"
          title="Recent sessions"
          accent
          className="lg:col-span-7 lg:row-span-2"
          headerExtra={
            <Badge variant="signal" className="hidden sm:inline-flex">
              Live store
            </Badge>
          }
        >
          <ul className="space-y-0 divide-y divide-white/[0.06]">
            {recentSessions.map((s) => (
              <li key={s.id} className="flex flex-col gap-2 py-4 first:pt-0 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="lane">{s.lane}</Badge>
                    {s.outcome === "completed" ? (
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400/80">
                        Completed
                      </span>
                    ) : s.outcome === "interrupted" ? (
                      <span className="text-[10px] uppercase tracking-wider text-amber-400/80">
                        Interrupted
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm font-medium text-zinc-200">
                    {s.focusLabel}
                  </p>
                  {s.notes ? (
                    <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                      {s.notes}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 opacity-70" />
                    {formatIsoDate(s.startedAt, "short")}
                  </span>
                  <span className="tabular-nums text-zinc-400">
                    {s.deepWorkMinutes} min · {s.outputCount} outputs
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/productivity"
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-200"
          >
            Session history
            <ArrowRight className="size-4" />
          </Link>
        </GlassCard>

        <div className="flex flex-col gap-4 lg:col-span-5 lg:-translate-y-1">
          <div className="rounded-3xl border border-white/[0.07] bg-[linear-gradient(165deg,rgba(22,26,36,0.85)_0%,rgba(12,14,22,0.92)_100%)] p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                  Shortcuts
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-zinc-100">
                  Favorite templates
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Star lanes you run often — stored locally.
                </p>
              </div>
              <Layers className="size-4 text-zinc-600" aria-hidden />
            </div>
            <ul className="mt-3 space-y-2">
              {favoriteTemplates.map((t, i) => (
                <li
                  key={t.id}
                  className={cn(
                    "group",
                    i % 2 === 1 && "lg:translate-x-1",
                  )}
                >
                  <div className="flex items-start gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 transition hover:border-white/[0.1]">
                    <button
                      type="button"
                      onClick={() => toggleFavoriteTemplate(t.id)}
                      className="mt-0.5 rounded-lg p-1 text-amber-400/90 hover:bg-white/[0.06]"
                      aria-label={`Remove ${t.title} from favorites`}
                    >
                      <Star className="size-4 fill-current" />
                    </button>
                    <Link href={`/templates/${t.id}`} className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                        {t.lane}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-zinc-200 group-hover:text-white">
                        {t.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                        {t.blurb}
                      </p>
                    </Link>
                    <ArrowRight className="size-4 shrink-0 text-zinc-600 opacity-0 transition group-hover:opacity-100" />
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/templates"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300/90 hover:text-cyan-200"
            >
              Browse catalog
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Insight ribbon */}
      <section className="relative">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
              Narrative signals
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-normal tracking-tight text-zinc-50">
              Insight ribbon
            </h2>
          </div>
          <Link
            href="/insights"
            className="text-sm font-medium text-zinc-400 hover:text-zinc-200"
          >
            View insights
          </Link>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-[linear-gradient(90deg,#07080c,transparent)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[linear-gradient(270deg,#07080c,transparent)]" />
          <div className="flex gap-4 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory">
            {RIBBON_INSIGHTS.map((ins) => (
              <article
                key={ins.id}
                className="min-w-[min(100%,18rem)] min-h-[11rem] shrink-0 snap-start rounded-3xl border border-white/[0.07] bg-[linear-gradient(155deg,rgba(20,24,34,0.9)_0%,rgba(12,14,22,0.95)_100%)] p-5 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.75)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="neutral">{ins.category}</Badge>
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-wider",
                      ins.trend === "up" && "text-emerald-400/90",
                      ins.trend === "down" && "text-rose-400/90",
                      ins.trend === "neutral" && "text-zinc-500",
                    )}
                  >
                    {ins.trend}
                  </span>
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-normal leading-snug text-zinc-100">
                  {ins.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">
                  {ins.summary}
                </p>
                {ins.metricValue ? (
                  <p className="mt-3 text-xs font-medium text-zinc-400">
                    <span className="text-zinc-600">{ins.metricLabel}: </span>
                    {ins.metricValue}
                    <span className="text-zinc-600"> · {ins.period}</span>
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-zinc-600">{ins.period}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
