"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSignalStore } from "@/store/use-signal-store";
import type { AppearanceMode } from "@/store/use-signal-store";

const MODES: {
  mode: AppearanceMode;
  label: string;
  Icon: typeof Sun;
}[] = [
  { mode: "light", label: "Light", Icon: Sun },
  { mode: "dark", label: "Dark", Icon: Moon },
  { mode: "system", label: "System", Icon: Monitor },
];

/** Compact theme switcher for the site header (syncs with Settings + AppearanceSync). */
export function AppearanceHeaderControls() {
  const appearance = useSignalStore((s) => s.appearance);
  const setAppearance = useSignalStore((s) => s.setAppearance);

  return (
    <div
      className="flex shrink-0 items-center rounded-2xl border border-white/[0.1] bg-black/30 p-0.5 light:border-zinc-200/90 light:bg-white/90"
      role="group"
      aria-label="Theme"
    >
      {MODES.map(({ mode, label, Icon }) => {
        const active = appearance === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => setAppearance(mode)}
            title={label}
            aria-label={`${label} theme`}
            aria-pressed={active}
            className={cn(
              "flex size-9 items-center justify-center rounded-[10px] transition-colors sm:size-9",
              active
                ? "bg-white/[0.12] text-zinc-100 shadow-[0_0_16px_rgba(110,200,255,0.14)] light:bg-zinc-900 light:text-zinc-50 light:shadow-[0_0_14px_rgba(59,130,246,0.2)]"
                : "text-zinc-500 hover:text-zinc-300 light:text-zinc-600 light:hover:text-zinc-900",
            )}
          >
            <Icon className="size-4 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
