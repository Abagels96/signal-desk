import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, hint, error, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex w-full flex-col gap-2">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-3xl border border-white/[0.08] bg-[#0c0d12]/90 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            "transition-colors focus:border-cyan-400/35 focus:outline-none focus:ring-2 focus:ring-cyan-400/15",
            error && "border-rose-500/40 focus:border-rose-400/40 focus:ring-rose-400/15",
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-rose-400/90" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-zinc-600">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
