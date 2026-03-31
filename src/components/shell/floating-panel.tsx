import { cn } from "@/lib/cn";

type FloatingPanelProps = {
  className?: string;
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export function FloatingPanel({
  className,
  title,
  eyebrow,
  children,
}: FloatingPanelProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-white/[0.07] bg-[linear-gradient(145deg,rgba(22,26,36,0.85)_0%,rgba(12,14,22,0.92)_55%,rgba(10,11,18,0.95)_100%)] p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl",
        className,
      )}
    >
      {(eyebrow || title) && (
        <header className="mb-5 flex flex-col gap-1">
          {eyebrow ? (
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-zinc-100">
              {title}
            </h2>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}
