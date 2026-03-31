import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Top accent line (cyan → violet) */
  accent?: boolean;
  eyebrow?: string;
  title?: string;
  /** Extra header slot beside title */
  headerExtra?: ReactNode;
};

export function GlassCard({
  className,
  accent = true,
  eyebrow,
  title,
  headerExtra,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[linear-gradient(145deg,rgba(22,26,36,0.88)_0%,rgba(12,14,22,0.94)_55%,rgba(10,11,18,0.97)_100%)]",
        "shadow-[0_24px_80px_-32px_rgba(0,0,0,0.88),0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      {accent ? (
        <div
          className="pointer-events-none absolute left-[12%] right-[12%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.45),rgba(167,139,250,0.4),transparent)] opacity-90 shadow-[0_0_20px_rgba(110,200,255,0.15)]"
          aria-hidden
        />
      ) : null}
      {(eyebrow || title || headerExtra) && (
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.05] px-6 pb-4 pt-6 sm:px-7">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-zinc-100">
                {title}
              </h3>
            ) : null}
          </div>
          {headerExtra ? (
            <div className="shrink-0 pt-0.5">{headerExtra}</div>
          ) : null}
        </div>
      )}
      <div className={cn("p-6 sm:p-7", !(eyebrow || title || headerExtra) && "pt-7")}>
        {children}
      </div>
    </div>
  );
}
