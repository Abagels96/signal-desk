import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type EmptyStateProps = {
  className?: string;
  /** Optional icon or illustration slot */
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-3xl border border-dashed border-white/[0.1] bg-[linear-gradient(160deg,rgba(18,22,32,0.5)_0%,rgba(10,12,18,0.65)_100%)] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
        "light:border-zinc-300/70 light:bg-[linear-gradient(160deg,rgba(250,250,250,0.95)_0%,rgba(244,244,245,0.98)_100%)] light:shadow-[inset_0_1px_0_rgba(0,0,0,0.03)]",
        className,
      )}
    >
      {icon ? (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 shadow-[0_0_24px_rgba(110,200,255,0.08)] light:border-zinc-200/80 light:bg-zinc-100/80 light:text-zinc-600 light:shadow-[0_0_20px_rgba(56,189,248,0.12)]">
          {icon}
        </div>
      ) : null}
      <div className="max-w-md">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-normal tracking-tight text-zinc-100 light:text-zinc-900">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-zinc-500 light:text-zinc-600">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </div>
  );
}
