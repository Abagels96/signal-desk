import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CommandChipProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: ReactNode;
  /** Keyboard hint, e.g. ⌘K */
  kbd?: string;
  /** Emphasis: default soft glow, active stronger */
  emphasis?: "default" | "active";
};

export function CommandChip({
  className,
  children,
  kbd,
  emphasis = "default",
  type = "button",
  ...props
}: CommandChipProps) {
  return (
    <button
      type={type}
      className={cn(
        "group inline-flex items-center gap-2 rounded-3xl border px-3.5 py-2 text-left text-[13px] font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sd-ring-offset)] light:focus-visible:ring-cyan-500/30",
        emphasis === "active"
          ? "border-cyan-400/30 bg-cyan-500/15 text-zinc-50 shadow-[0_0_28px_rgba(56,200,255,0.18)] light:border-cyan-500/40 light:bg-cyan-100/80 light:text-cyan-950 light:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          : "border-white/[0.09] bg-white/[0.04] text-zinc-300 shadow-[0_0_18px_rgba(110,200,255,0.06)] hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-zinc-100 light:border-zinc-200/80 light:bg-white/90 light:text-zinc-700 light:shadow-[0_0_14px_rgba(0,0,0,0.06)] light:hover:border-zinc-300 light:hover:bg-white light:hover:text-zinc-900",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{children}</span>
      {kbd ? (
        <kbd
          className={cn(
            "ml-auto shrink-0 rounded-lg border border-white/[0.08] bg-black/30 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-500",
            "group-hover:border-white/[0.12] group-hover:text-zinc-400 light:border-zinc-300/80 light:bg-zinc-100/90 light:text-zinc-600 light:group-hover:border-zinc-400 light:group-hover:text-zinc-700",
          )}
        >
          {kbd}
        </kbd>
      ) : null}
    </button>
  );
}
