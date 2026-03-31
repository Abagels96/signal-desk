"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui";
import { getTemplateLanes, MOCK_TEMPLATES } from "@/data/templates";
import { cn } from "@/lib/cn";

const ALL = "all" as const;

export function TemplatesGallery() {
  const lanes = useMemo(() => getTemplateLanes(), []);
  const [lane, setLane] = useState<string | typeof ALL>(ALL);

  const filtered = useMemo(() => {
    if (lane === ALL) return MOCK_TEMPLATES;
    return MOCK_TEMPLATES.filter((t) => t.lane === lane);
  }, [lane]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500 light:text-zinc-600">
            Template library
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-zinc-50 light:text-zinc-900 sm:text-4xl">
            Lanes & briefs
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 light:text-zinc-600">
            Pick a lane, then open a preconfigured composition pass in Generate —
            all catalog data is local mock.
          </p>
        </div>
      </div>

      <div
        className="-mx-1 flex gap-2 overflow-x-auto overflow-y-hidden pb-1 pl-1 pr-3 [-webkit-overflow-scrolling:touch] sm:flex-wrap sm:overflow-visible sm:pb-0 sm:pl-0 sm:pr-0"
        role="tablist"
        aria-label="Filter by category"
      >
        <button
          type="button"
          role="tab"
          aria-selected={lane === ALL}
          onClick={() => setLane(ALL)}
          className={cn(
            "shrink-0 touch-manipulation rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition sm:py-2",
            lane === ALL
              ? "border-cyan-400/35 bg-cyan-500/15 text-cyan-100 shadow-[0_0_24px_rgba(56,200,255,0.12)] light:border-cyan-500/35 light:bg-cyan-50 light:text-cyan-900 light:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
              : "border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300 light:border-zinc-200/80 light:bg-white/80 light:text-zinc-600 light:hover:border-zinc-300 light:hover:text-zinc-900",
          )}
        >
          All lanes
        </button>
        {lanes.map((l) => (
          <button
            key={l}
            type="button"
            role="tab"
            aria-selected={lane === l}
            onClick={() => setLane(l)}
            className={cn(
              "shrink-0 touch-manipulation rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition sm:py-2",
              lane === l
                ? "border-violet-400/35 bg-violet-500/12 text-violet-100 shadow-[0_0_22px_rgba(167,139,250,0.12)] light:border-violet-500/35 light:bg-violet-50 light:text-violet-950 light:shadow-[0_0_18px_rgba(139,92,246,0.18)]"
                : "border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300 light:border-zinc-200/80 light:bg-white/80 light:text-zinc-600 light:hover:border-zinc-300 light:hover:text-zinc-900",
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((t, i) => (
          <li
            key={t.id}
            className={cn(
              i % 5 === 0 && "sm:col-span-2 xl:col-span-1",
              i % 7 === 3 && "xl:translate-y-2",
            )}
          >
            <article
              className={cn(
                "group relative flex min-h-[17rem] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[linear-gradient(155deg,rgba(22,26,36,0.92)_0%,rgba(12,14,22,0.96)_45%,rgba(8,9,14,0.98)_100%)]",
                "shadow-[0_28px_90px_-40px_rgba(0,0,0,0.88),inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:border-white/[0.12] hover:shadow-[0_36px_100px_-36px_rgba(0,0,0,0.9)]",
                "light:border-zinc-200/80 light:bg-[linear-gradient(155deg,rgba(255,255,255,0.97)_0%,rgba(250,250,250,0.99)_45%,rgba(244,244,245,1)_100%)]",
                "light:shadow-[0_24px_80px_-36px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(0,0,0,0.04)] light:hover:border-zinc-300 light:hover:shadow-[0_28px_90px_-32px_rgba(0,0,0,0.12)]",
              )}
            >
              <Link
                href={`/generate?template=${encodeURIComponent(t.id)}`}
                className="absolute inset-0 z-0 rounded-3xl outline-none ring-cyan-400/0 transition focus-visible:ring-2 focus-visible:ring-cyan-400/35 light:focus-visible:ring-cyan-500/40"
                aria-label={`Open ${t.title} in Generate`}
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.4),rgba(167,139,250,0.25),transparent)] opacity-90"
                aria-hidden
              />
              <div className="pointer-events-none relative z-10 flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="lane">{t.lane}</Badge>
                  {typeof t.estMinutes === "number" ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.06] bg-black/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500 light:border-zinc-200/80 light:bg-zinc-100/90 light:text-zinc-600">
                      <Clock className="size-3 opacity-70" aria-hidden />
                      {t.estMinutes} min
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug tracking-tight text-zinc-50 group-hover:text-white sm:text-[1.35rem] light:text-zinc-900 light:group-hover:text-zinc-950">
                  {t.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500 light:text-zinc-600">
                  {t.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {t.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500 light:border-zinc-200/80 light:bg-zinc-100/80 light:text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="relative z-20 mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-5 light:border-zinc-200/80">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200/90 light:text-cyan-800">
                    Open in Generate
                    <ArrowUpRight className="size-4 opacity-80" aria-hidden />
                  </span>
                  <Link
                    href={`/templates/${t.id}`}
                    className="pointer-events-auto text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 transition hover:text-zinc-300 light:text-zinc-600 light:hover:text-zinc-900"
                  >
                    Lane brief
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-500 light:text-zinc-600">
          No templates in this lane.
        </p>
      ) : null}
    </div>
  );
}
