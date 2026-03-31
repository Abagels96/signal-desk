/** Prefix for static assets when `BASE_PATH` is set (GitHub Pages project site). */
export function publicAsset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!base) return p;
  return `${base}${p}`;
}
