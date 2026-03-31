/**
 * Search, filtering, and formatting helpers (client-safe; no DOM required).
 */

/** Lowercase, collapse whitespace, strip diacritics lightly for matching */
export function normalizeForSearch(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Split query into non-empty tokens */
export function tokenizeSearch(query: string): string[] {
  return normalizeForSearch(query)
    .split(/\s+/)
    .filter(Boolean);
}

/** True if every token appears in haystack (normalized substring match) */
export function matchesQuery(haystack: string, query: string): boolean {
  const tokens = tokenizeSearch(query);
  if (tokens.length === 0) return true;
  const n = normalizeForSearch(haystack);
  return tokens.every((t) => n.includes(t));
}

/** Filter records where any listed string field matches all query tokens */
export function searchRecords<T>(
  items: T[],
  query: string,
  fields: Array<(item: T) => string | undefined>,
): T[] {
  const q = normalizeForSearch(query);
  if (!q) return [...items];
  return items.filter((item) => {
    const blob = fields
      .map((fn) => fn(item) ?? "")
      .join(" ");
    return matchesQuery(blob, query);
  });
}

/** Generic filter with optional query across string fields */
export function filterWithSearch<T>(
  items: T[],
  options: {
    query: string;
    fields: Array<(item: T) => string | undefined>;
    /** Extra predicates (all must pass) */
    where?: (item: T) => boolean;
  },
): T[] {
  let out = options.where ? items.filter(options.where) : [...items];
  out = searchRecords(out, options.query, options.fields);
  return out;
}

export function countWords(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

export function truncate(
  text: string,
  maxChars: number,
  ellipsis = "…",
): string {
  if (text.length <= maxChars) return text;
  const cut = Math.max(0, maxChars - ellipsis.length);
  return text.slice(0, cut).trimEnd() + ellipsis;
}

export function formatWordCount(n: number): string {
  if (n === 1) return "1 word";
  return `${n.toLocaleString()} words`;
}

export type IsoDateStyle = "short" | "medium" | "long";

export function formatIsoDate(iso: string, style: IsoDateStyle = "medium"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const opts: Intl.DateTimeFormatOptions =
    style === "short"
      ? { year: "2-digit", month: "numeric", day: "numeric" }
      : style === "long"
        ? {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        : {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          };
  return d.toLocaleString(undefined, opts);
}

/** One-line preview for cards */
export function formatPreview(text: string, maxWords = 24): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return words.slice(0, maxWords).join(" ") + "…";
}

/** Simple slug for URLs or keys */
export function slugify(text: string): string {
  return normalizeForSearch(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
