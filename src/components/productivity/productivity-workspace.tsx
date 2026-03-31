"use client";

import { CalendarRange, Orbit, Sparkles, Target } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui";
import {
  MOCK_DAILY_PLAN_CARDS,
  MOCK_FOCUS_BOARD,
  MOCK_TASK_BREAKDOWN,
  MOCK_WEEKLY_MODULES,
} from "@/data/productivity-mock";
import {
  buildSuggestionSeed,
  pickProductivitySuggestions,
} from "@/lib/productivity-suggestions";
import { cn } from "@/lib/cn";
import { useSignalStore } from "@/store/use-signal-store";

const accentRing: Record<string, string> = {
  cyan: "border-cyan-400/20 shadow-[0_0_32px_rgba(56,200,255,0.08)]",
  violet: "border-violet-400/20 shadow-[0_0_28px_rgba(167,139,250,0.1)]",
  amber: "border-amber-400/20 shadow-[0_0_26px_rgba(251,191,36,0.08)]",
};

export function ProductivityWorkspace() {
  const sessions = useSignalStore((s) => s.sessions);
  const drafts = useSignalStore((s) => s.drafts);

  const suggestionSeed = useMemo(() => {
    const fromSessions = sessions.slice(0, 4).map((x) => x.focusLabel);
    const fromDrafts = drafts.slice(0, 2).map((d) => d.title);
    return buildSuggestionSeed([...fromSessions, ...fromDrafts]);
  }, [sessions, drafts]);

  const suggestions = useMemo(
    () => pickProductivitySuggestions(suggestionSeed, 4),
    [suggestionSeed],
  );

  return (
    <div className="flex flex-col gap-12 lg:gap-14">
      <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
            Strategy workspace
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.4rem]">
            Plan the week like a creative director, not a dashboard.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">
            Daily wedges, a focus board, and mock “coach” lines — all local. No
            charts, no vanity metrics; just lanes, commitments, and what you’re
            explicitly not doing.
          </p>
        </div>
        <div className="rounded-3xl border border-white/[0.07] bg-[linear-gradient(145deg,rgba(20,24,34,0.85)_0%,rgba(10,12,18,0.95)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:translate-y-1">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            <Sparkles className="size-4 text-cyan-400/80" aria-hidden />
            Signal coach
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Suggestions below are assembled from your recent session focus and
            draft titles — deterministic mock logic, not an API.
          </p>
        </div>
      </header>

      {/* AI-style suggestions */}
      <section aria-labelledby="coach-heading">
        <h2 id="coach-heading" className="sr-only">
          Productivity suggestions
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {suggestions.map((line, i) => (
            <li
              key={`${i}-${line.slice(0, 12)}`}
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0c12]/90 p-5 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.85)]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.35),transparent)]"
                aria-hidden
              />
              <span className="font-mono text-[10px] text-zinc-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{line}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Daily planning cards */}
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
              Daily planning
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-normal text-zinc-100">
              Wedges & moves
            </h2>
          </div>
          <Badge variant="signal">Mock schedule</Badge>
        </div>
        <ul className="grid gap-6 lg:grid-cols-3">
          {MOCK_DAILY_PLAN_CARDS.map((card, i) => (
            <li
              key={card.id}
              className={cn(i === 1 && "lg:-translate-y-1")}
            >
              <article
                className={cn(
                  "flex h-full flex-col rounded-3xl border bg-[linear-gradient(155deg,rgba(18,22,32,0.95)_0%,rgba(10,12,18,0.98)_100%)] p-6 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.88)]",
                  accentRing[card.accent],
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="lane">{card.lane}</Badge>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                    {card.window}
                  </span>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-zinc-50">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">{card.intent}</p>
                <ol className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
                  {card.moves.map((m, j) => (
                    <li
                      key={m}
                      className="flex gap-3 text-sm leading-snug text-zinc-400"
                    >
                      <span className="font-mono text-xs text-zinc-600">
                        {j + 1}.
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Focus board */}
        <section className="lg:col-span-7">
          <div className="mb-6 flex items-center gap-3">
            <Target className="size-5 text-cyan-400/70" aria-hidden />
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
                Focus board
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-normal text-zinc-100">
                Commit · motion · parking
              </h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {MOCK_FOCUS_BOARD.map((col) => (
              <div
                key={col.id}
                className="flex flex-col rounded-3xl border border-white/[0.07] bg-[#090a10]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-zinc-100">
                  {col.title}
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                  {col.subtitle}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm leading-snug text-zinc-400"
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Task breakdown */}
        <section className="lg:col-span-5 lg:pt-2">
          <div className="mb-6 flex items-center gap-3">
            <Orbit className="size-5 text-violet-400/70" aria-hidden />
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
                Task breakdown
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-normal text-zinc-100">
                Suggested cadence
              </h2>
            </div>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(22,26,36,0.85)_0%,rgba(12,14,22,0.95)_100%)] p-6 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.85)]">
            <p className="text-sm font-medium text-zinc-300">
              {MOCK_TASK_BREAKDOWN.headline}
            </p>
            <ol className="mt-5 space-y-3">
              {MOCK_TASK_BREAKDOWN.steps.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-3 border-l border-violet-400/20 pl-4 text-sm leading-relaxed text-zinc-400"
                >
                  <span className="shrink-0 font-mono text-xs text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* Weekly modules */}
      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarRange className="size-5 text-amber-400/70" aria-hidden />
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
                Weekly planning
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-normal text-zinc-100">
                Modules & checkpoints
              </h2>
            </div>
          </div>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {MOCK_WEEKLY_MODULES.map((m, i) => (
            <li
              key={m.id}
              className={cn(i === 1 && "md:-translate-y-2")}
            >
              <article className="flex h-full flex-col rounded-3xl border border-white/[0.08] bg-[linear-gradient(200deg,rgba(16,18,26,0.95)_0%,rgba(8,9,14,0.98)_100%)] p-6 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.88)]">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-[family-name:var(--font-display)] text-5xl font-normal leading-none text-zinc-700/90">
                    {m.day}
                  </span>
                  <Badge variant="neutral">{m.theme}</Badge>
                </div>
                <p className="mt-4 text-sm font-medium text-zinc-300">
                  {m.outcome}
                </p>
                <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-5">
                  {m.checkpoints.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-2 text-[13px] text-zinc-500"
                    >
                      <span
                        className="size-1.5 shrink-0 rounded-full bg-cyan-400/50"
                        aria-hidden
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
