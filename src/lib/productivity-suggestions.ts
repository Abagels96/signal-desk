/**
 * Deterministic “AI-style” suggestions — local mock only, no API.
 * Picks copy from a bank using a string seed (e.g. recent session focus).
 */

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const SUGGESTION_BANK = [
  "Lead with the budget line item your CFO already worries about — then show how your workflow reduces it.",
  "If the draft could apply to any company, you haven’t named the tradeoff yet.",
  "Swap three adjectives for one concrete verb in the opening paragraph.",
  "Put the dissent on the page: what would make a smart stakeholder say no?",
  "End with one decision owner and one date — not a list of ‘next steps.’",
  "Batch similar edits: voice pass first, then proof, then formatting.",
  "Cap this pass at 45 minutes; park everything else in Parking.",
  "Ask: what would we cut if we had to ship in two hours?",
  "Mirror your ICP’s vocabulary — lift phrases from real calls, not the website.",
  "Make the CTA ladder honest: one action per email, no nested asks.",
  "If two sections argue the same point, merge or delete the weaker one.",
  "Add one line of evidence that would survive a skeptical exec skim.",
] as const;

export function pickProductivitySuggestions(seed: string, count = 4): string[] {
  const h0 = hashString(seed || "signal-desk");
  const out: string[] = [];
  const n = SUGGESTION_BANK.length;
  for (let i = 0; i < count; i++) {
    let idx = (h0 + i * 17) % n;
    let line = SUGGESTION_BANK[idx];
    let guard = 0;
    while (out.includes(line) && guard < n) {
      idx = (idx + 1) % n;
      line = SUGGESTION_BANK[idx];
      guard++;
    }
    out.push(line);
  }
  return out;
}

/** Build a seed from store sessions + drafts titles (optional strings). */
export function buildSuggestionSeed(parts: string[]): string {
  return parts.filter(Boolean).join("|").slice(0, 400);
}
