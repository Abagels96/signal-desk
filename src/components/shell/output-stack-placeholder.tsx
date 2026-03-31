import { cn } from "@/lib/cn";

const MOCK_CARDS = [
  {
    title: "Beat sheet",
    body: "Open with tension → define stakes → land the turn. (Placeholder output.)",
  },
  {
    title: "Voice notes",
    body: "Keep sentences under 22 words; favor concrete verbs over adjectives.",
  },
  {
    title: "Cut list",
    body: "Remove hedges in paras 2–4; merge duplicate proof in section B.",
  },
] as const;

type OutputStackPlaceholderProps = {
  className?: string;
};

export function OutputStackPlaceholder({
  className,
}: OutputStackPlaceholderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {MOCK_CARDS.map((card, i) => (
        <article
          key={card.title}
          className="relative rounded-2xl border border-white/[0.06] bg-[linear-gradient(120deg,rgba(20,24,34,0.9)_0%,rgba(12,14,22,0.95)_100%)] p-5 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.75)]"
        >
          <div
            className="pointer-events-none absolute inset-y-4 right-0 w-px rounded-full bg-[linear-gradient(180deg,transparent,rgba(110,200,255,0.35),transparent)] opacity-70"
            aria-hidden
          />
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold tracking-tight text-zinc-100">
              {card.title}
            </h3>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">{card.body}</p>
        </article>
      ))}
    </div>
  );
}
