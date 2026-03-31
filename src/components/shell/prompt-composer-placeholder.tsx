import { cn } from "@/lib/cn";

type PromptComposerPlaceholderProps = {
  className?: string;
};

export function PromptComposerPlaceholder({
  className,
}: PromptComposerPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[linear-gradient(165deg,rgba(28,32,44,0.95)_0%,rgba(12,14,22,0.98)_45%,rgba(8,9,14,1)_100%)] p-1 shadow-[0_0_0_1px_rgba(110,200,255,0.06),0_32px_100px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-px w-[150%] bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.5),rgba(167,139,250,0.45),transparent)] opacity-80"
        aria-hidden
      />
      <div className="rounded-[1.6rem] border border-white/[0.04] bg-black/20 p-6 sm:p-8 lg:p-10">
        <label className="mb-4 block">
          <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
            Compose signal
          </span>
          <textarea
            readOnly
            rows={6}
            placeholder="Describe the piece, audience, and constraints. Mock only — nothing is sent."
            className="min-h-[9rem] w-full resize-y rounded-2xl border border-white/[0.07] bg-[#0a0b10]/80 px-5 py-5 text-base leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-400/35 focus:outline-none focus:ring-2 focus:ring-cyan-400/15 sm:min-h-[11rem] sm:text-lg"
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
          <p className="max-w-md text-sm text-zinc-500">
            Oversized composer shell for MVP. Wire forms and persistence when you
            add real flows.
          </p>
          <div className="flex gap-2">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
              Draft
            </span>
            <span className="rounded-full bg-[linear-gradient(135deg,rgba(56,180,220,0.25),rgba(140,100,220,0.22))] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-100 shadow-[0_0_24px_rgba(110,200,255,0.2)]">
              Run (mock)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
