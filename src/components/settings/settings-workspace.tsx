"use client";

import { Download, Moon, RotateCcw, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";
import { STORAGE_KEYS } from "@/lib/storage";
import { cn } from "@/lib/cn";
import { useSignalStore } from "@/store/use-signal-store";

export function SettingsWorkspace() {
  const appearance = useSignalStore((s) => s.appearance);
  const setAppearance = useSignalStore((s) => s.setAppearance);
  const resetDemoData = useSignalStore((s) => s.resetDemoData);
  const drafts = useSignalStore((s) => s.drafts);

  const [resetHint, setResetHint] = useState<string | null>(null);

  const handleReset = () => {
    if (
      !window.confirm(
        "Reset demo data? Drafts, sessions, and template favorites return to seed values. Appearance is kept.",
      )
    ) {
      return;
    }
    resetDemoData();
    setResetHint("Demo data restored.");
    window.setTimeout(() => setResetHint(null), 4000);
  };

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
          Settings
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-zinc-50">
          Local preferences
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          No accounts — everything below is stored in your browser (
          <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-zinc-400">
            {STORAGE_KEYS.signalStore}
          </code>
          ).
        </p>
      </header>

      <section className="rounded-3xl border border-white/[0.08] bg-[linear-gradient(155deg,rgba(18,22,32,0.88)_0%,rgba(10,12,18,0.95)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Appearance
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Mock toggle — canvas stays editorial-dark; “System” sets a flag for future
          theming.
        </p>
        <div
          className="mt-4 inline-flex rounded-2xl border border-white/[0.1] bg-black/30 p-1"
          role="group"
          aria-label="Appearance"
        >
          <button
            type="button"
            onClick={() => setAppearance("dark")}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition",
              appearance === "dark"
                ? "bg-white/[0.1] text-zinc-100 shadow-[0_0_20px_rgba(110,200,255,0.12)]"
                : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            <Moon className="size-3.5 opacity-80" aria-hidden />
            Canvas dark
          </button>
          <button
            type="button"
            onClick={() => setAppearance("system")}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition",
              appearance === "system"
                ? "bg-white/[0.1] text-zinc-100 shadow-[0_0_20px_rgba(167,139,250,0.12)]"
                : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            <Sun className="size-3.5 opacity-80" aria-hidden />
            System
          </button>
        </div>
        <p className="mt-3 font-mono text-[10px] text-zinc-600">
          data-signal-appearance={appearance}
        </p>
      </section>

      <section className="rounded-3xl border border-white/[0.08] bg-[linear-gradient(155deg,rgba(18,22,32,0.88)_0%,rgba(10,12,18,0.95)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Data
        </h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-300">Export drafts</p>
            <p className="text-xs text-zinc-600">
              {drafts.length} draft{drafts.length === 1 ? "" : "s"} stored locally.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled
            className="shrink-0 gap-2 opacity-70"
            title="Placeholder for a future JSON export"
          >
            <Download className="size-4" aria-hidden />
            Export (soon)
          </Button>
        </div>
        <p className="mt-3 text-xs text-zinc-600">
          Placeholder — no file is written in the MVP. Use reset below to restore
          bundled seed data.
        </p>
      </section>

      <section className="rounded-3xl border border-white/[0.08] bg-[linear-gradient(155deg,rgba(18,22,32,0.88)_0%,rgba(10,12,18,0.95)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Demo
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Restore seeded drafts, sessions, and template favorites. Your appearance
          choice stays.
        </p>
        <Button
          type="button"
          variant="danger"
          size="sm"
          className="mt-4 gap-2"
          onClick={handleReset}
        >
          <RotateCcw className="size-4" aria-hidden />
          Reset demo data
        </Button>
        {resetHint ? (
          <p className="mt-3 text-sm text-emerald-400/90">{resetHint}</p>
        ) : null}
      </section>
    </div>
  );
}
