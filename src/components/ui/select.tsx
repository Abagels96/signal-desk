import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, id, label, hint, error, children, ...props }, ref) => {
    const selectId = id ?? props.name;
    return (
      <div className="flex w-full flex-col gap-2">
        {label ? (
          <label
            htmlFor={selectId}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 light:text-zinc-600"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none rounded-3xl border border-white/[0.08] bg-[var(--sd-input-bg)] py-3 pl-4 pr-11 text-sm text-foreground light:border-zinc-200/90",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] light:shadow-[inset_0_1px_0_rgba(0,0,0,0.04)]",
              "transition-colors focus:border-cyan-400/35 focus:outline-none focus:ring-2 focus:ring-cyan-400/15 light:focus:border-cyan-500/40 light:focus:ring-cyan-500/20",
              error && "border-rose-500/40 focus:border-rose-400/40 focus:ring-rose-400/15",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <span
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 light:text-zinc-600"
            aria-hidden
          >
            <ChevronDown className="size-4 opacity-80" strokeWidth={2} />
          </span>
        </div>
        {error ? (
          <p className="text-xs text-rose-400/90 light:text-rose-700" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-zinc-600 light:text-zinc-500">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
