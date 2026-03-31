import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border border-white/10 bg-[linear-gradient(135deg,rgba(70,190,230,0.32),rgba(150,110,220,0.26))] text-zinc-50 shadow-[0_0_28px_rgba(110,200,255,0.14)] hover:brightness-110 focus-visible:ring-cyan-400/35 active:brightness-95",
  secondary:
    "border border-white/[0.1] bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08] focus-visible:ring-white/20",
  ghost:
    "border border-transparent bg-transparent text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100 focus-visible:ring-white/15",
  danger:
    "border border-rose-500/25 bg-rose-950/40 text-rose-100 hover:bg-rose-950/60 focus-visible:ring-rose-400/35",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "min-h-9 rounded-2xl px-3.5 py-2 text-xs font-semibold",
  md: "min-h-11 rounded-2xl px-5 py-2.5 text-sm font-semibold",
  lg: "min-h-12 rounded-3xl px-7 py-3 text-sm font-semibold tracking-tight",
};

const baseButtonClass =
  "inline-flex items-center justify-center gap-2 transition select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080c] disabled:pointer-events-none disabled:opacity-45";

/** Use with `<Link>` for anchor-styled buttons */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(baseButtonClass, variantClass[variant], sizeClass[size], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", type = "button", ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={buttonClasses(variant, size, className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";
