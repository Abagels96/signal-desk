import { cn } from "@/lib/cn";

type GlowRailProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlowRail({ className, children }: GlowRailProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-col gap-1 rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,rgba(18,22,32,0.92)_0%,rgba(10,12,18,0.96)_100%)] p-3 shadow-[0_0_0_1px_rgba(120,200,255,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md",
        "before:pointer-events-none before:absolute before:inset-y-3 before:left-0 before:w-px before:rounded-full before:bg-[linear-gradient(180deg,transparent,rgba(96,200,255,0.55),rgba(180,120,255,0.45),transparent)] before:opacity-90 before:shadow-[0_0_18px_rgba(96,200,255,0.35)] before:content-['']",
        className,
      )}
    >
      {children}
    </div>
  );
}
