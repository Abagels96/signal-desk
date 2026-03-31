import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionHeaderProps = {
  className?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Actions align to the trailing edge; offset for editorial asymmetry on large screens */
  action?: ReactNode;
};

export function SectionHeader({
  className,
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:items-end lg:gap-10",
        className,
      )}
    >
      <div className="max-w-2xl lg:pl-1">
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500 light:text-zinc-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-normal tracking-tight text-zinc-50 sm:text-3xl light:text-zinc-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 light:text-zinc-600">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className="flex shrink-0 flex-wrap items-center justify-start gap-2 lg:justify-end lg:pb-0.5 lg:translate-y-0.5">
          {action}
        </div>
      ) : null}
    </header>
  );
}
