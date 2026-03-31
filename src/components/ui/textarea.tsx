import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, hint, error, ...props }, ref) => {
    const areaId = id ?? props.name;
    return (
      <div className="flex w-full flex-col gap-2">
        {label ? (
          <label
            htmlFor={areaId}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 light:text-zinc-600"
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={areaId}
          className={cn(
            "min-h-[120px] w-full resize-y rounded-3xl border border-white/[0.08] bg-[var(--sd-input-bg)] px-4 py-3.5 text-sm leading-relaxed text-foreground placeholder:text-zinc-500 light:border-zinc-200/90 light:placeholder:text-zinc-500",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] light:shadow-[inset_0_1px_0_rgba(0,0,0,0.04)]",
            "transition-colors focus:border-cyan-400/35 focus:outline-none focus:ring-2 focus:ring-cyan-400/15 light:focus:border-cyan-500/40 light:focus:ring-cyan-500/20",
            error && "border-rose-500/40 focus:border-rose-400/40 focus:ring-rose-400/15",
            className,
          )}
          {...props}
        />
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

Textarea.displayName = "Textarea";
