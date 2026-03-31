import { MOCK_AI_OUTPUTS } from "@/data/mock-outputs";
import { getTemplateById } from "@/data/templates";
import type { MockOutput, MockOutputKind } from "@/types";
import { countWords } from "@/lib/utils";

/** Deterministic hash for picking seeds from prompt + template */
function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickIndex(seed: string, modulo: number): number {
  if (modulo <= 0) return 0;
  return hashString(seed) % modulo;
}

function newOutputId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `out-mock-${crypto.randomUUID()}`;
  }
  return `out-mock-${Date.now()}-${pickIndex(String(Math.random()), 1e9)}`;
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Assemble a plausible body when no seed fits */
function assembleSyntheticBody(prompt: string, templateTitle?: string): string {
  const trimmed = prompt.trim() || "General brief";
  const focus = trimmed.slice(0, 280);
  const lines = [
    `Signal summary: ${focus}`,
    templateTitle
      ? `Lane context: ${templateTitle} — prioritize clarity over completeness in pass one.`
      : "Lane: general — prioritize clarity over completeness in pass one.",
    "Next: tighten scope, name one decision owner, and list what you are explicitly not doing.",
  ];
  return lines.join("\n\n");
}

export type OutputLength = "short" | "medium" | "long";

export type MockGenerateInput = {
  prompt: string;
  templateId?: string;
  kind?: MockOutputKind;
  /** Affects seed selection and a trailing voice note */
  tone?: string;
  /** Post-process body heuristics */
  length?: OutputLength;
};

function truncateHint(s: string, max = 64): string {
  const t = s.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t || "empty prompt";
  return `${t.slice(0, max - 1)}…`;
}

/* ——— Refinements (deterministic heuristics, no API) ——— */

const CASUAL_MAP: Record<string, string> = {
  therefore: "so",
  however: "but",
  regarding: "on",
  utilize: "use",
  facilitate: "help",
  additional: "extra",
  demonstrate: "show",
  purchase: "buy",
};

const FORMAL_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CASUAL_MAP).map(([k, v]) => [v, k]),
);

function swapWords(text: string, map: Record<string, string>): string {
  return text.replace(/\b[a-z]+\b/gi, (w) => {
    const lower = w.toLowerCase();
    const rep = map[lower];
    if (!rep) return w;
    if (w[0] === w[0].toUpperCase()) {
      return rep.charAt(0).toUpperCase() + rep.slice(1);
    }
    return rep;
  });
}

export function refineShorten(text: string): string {
  const sentences = splitSentences(text);
  if (sentences.length <= 1) {
    const words = text.trim().split(/\s+/);
    const target = Math.max(8, Math.floor(words.length * 0.45));
    return words.slice(0, target).join(" ") + (words.length > target ? "…" : "");
  }
  const take = Math.max(1, Math.ceil(sentences.length * 0.4));
  return sentences.slice(0, take).join(" ");
}

export function refineExpand(text: string): string {
  const base = text.trim();
  const bridge =
    "\n\nIn practice: translate this into one decision, one owner, and one date. If stakeholders disagree, capture the dissent in a single sentence so it cannot be ignored later.";
  const context =
    "\n\nConsider also: what evidence would change your mind, and what would you stop doing if this ships?";
  return `${base}${bridge}${context}`;
}

function applyLengthHint(body: string, length: OutputLength): string {
  switch (length) {
    case "short":
      return refineShorten(body);
    case "long":
      return refineExpand(body);
    default:
      return body;
  }
}

/**
 * Mock “generation”: prefers seeded `MOCK_AI_OUTPUTS` when template/kind align;
 * otherwise builds a deterministic synthetic block from the prompt.
 */
export function mockGenerate(input: MockGenerateInput): MockOutput {
  const { prompt, templateId, kind, tone, length = "medium" } = input;
  const seedKey = `${templateId ?? ""}|${kind ?? ""}|${tone ?? ""}|${length}|${prompt}`;

  let pool = [...MOCK_AI_OUTPUTS];
  if (templateId) {
    const byTpl = pool.filter((o) => o.templateId === templateId);
    if (byTpl.length) pool = byTpl;
  }
  if (kind && pool.length > 1) {
    const byKind = pool.filter((o) => o.kind === kind);
    if (byKind.length) pool = byKind;
  }

  if (pool.length) {
    const chosen = pool[pickIndex(seedKey, pool.length)];
    let body = `${chosen.body}\n\n— Mock pass (seeded variant for: ${truncateHint(prompt)})`;
    if (tone) {
      body += `\n\nVoice: ${tone}.`;
    }
    body = applyLengthHint(body, length);
    return {
      ...chosen,
      id: newOutputId(),
      createdAt: new Date().toISOString(),
      body,
    };
  }

  const tpl = templateId ? getTemplateById(templateId) : undefined;
  const title = tpl
    ? `${tpl.title} — draft`
    : `Workspace output — ${truncateHint(prompt, 48)}`;

  let body = assembleSyntheticBody(prompt, tpl?.title);
  if (tone) {
    body += `\n\nVoice: ${tone}.`;
  }
  body = applyLengthHint(body, length);

  return {
    id: newOutputId(),
    title,
    body,
    kind: kind ?? "brief",
    templateId,
    createdAt: new Date().toISOString(),
  };
}

export function refineMoreCasual(text: string): string {
  return swapWords(text, CASUAL_MAP);
}

export function refineMoreProfessional(text: string): string {
  return swapWords(text, FORMAL_MAP);
}

export function refineToBullets(text: string): string {
  const parts = splitSentences(text);
  const chunks = parts.length ? parts : text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const lines = (chunks.length ? chunks : [text]).map((line, i) => {
    const clean = line.replace(/^[•\-\*]\s*/, "").trim();
    return `• ${clean || `Point ${i + 1}`}`;
  });
  return lines.join("\n");
}

export function refineRepurposeSocial(text: string): string {
  const hook =
    splitSentences(text)[0]?.trim() ||
    text.trim().slice(0, 120) ||
    "Signal check-in";
  const body = text.trim().replace(/\s+/g, " ");
  const hashtags = extractHashtagCandidates(body).slice(0, 4);
  const tagLine = hashtags.length ? `\n\n${hashtags.map((h) => `#${h}`).join(" ")}` : "";
  const core = body.length > 260 ? `${body.slice(0, 240).trim()}…` : body;
  return `${hook}\n\n${core}${tagLine}`;
}

function extractHashtagCandidates(text: string): string[] {
  const stop = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "your",
    "are",
    "was",
    "has",
  ]);
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 4 && !stop.has(w)),
    ),
  ).slice(0, 6);
}

export type RefinementId =
  | "shorten"
  | "expand"
  | "more_casual"
  | "more_professional"
  | "bullets"
  | "social";

const refiners: Record<RefinementId, (t: string) => string> = {
  shorten: refineShorten,
  expand: refineExpand,
  more_casual: refineMoreCasual,
  more_professional: refineMoreProfessional,
  bullets: refineToBullets,
  social: refineRepurposeSocial,
};

export function applyRefinement(text: string, id: RefinementId): string {
  return refiners[id](text);
}

/** Word count helper for UI badges */
export function outputWordCount(text: string): number {
  return countWords(text);
}
