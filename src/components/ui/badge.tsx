import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "neutral" | "signal" | "lane" | "warn" | "success";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClass: Record<BadgeVariant, string> = {
  neutral:
    "border-white/[0.08] bg-white/[0.04] text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] light:border-zinc-300/70 light:bg-zinc-100/90 light:text-zinc-600 light:shadow-none",
  signal:
    "border-cyan-400/20 bg-cyan-500/10 text-cyan-100/90 shadow-[0_0_20px_rgba(56,200,255,0.12)] light:border-cyan-500/35 light:bg-cyan-50 light:text-cyan-900 light:shadow-[0_0_16px_rgba(56,189,248,0.15)]",
  lane:
    "border-violet-400/20 bg-violet-500/10 text-violet-100/90 shadow-[0_0_18px_rgba(167,139,250,0.12)] light:border-violet-500/35 light:bg-violet-50 light:text-violet-900 light:shadow-[0_0_16px_rgba(139,92,246,0.12)]",
  warn:
    "border-amber-400/25 bg-amber-500/10 text-amber-100/90 light:border-amber-500/35 light:bg-amber-50 light:text-amber-950",
  success:
    "border-emerald-400/20 bg-emerald-500/10 text-emerald-100/90 light:border-emerald-500/35 light:bg-emerald-50 light:text-emerald-950",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        variantClass[variant],
        className,
      )}
      {...props}
    />
  );
}
