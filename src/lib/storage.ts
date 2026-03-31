const PREFIX = "signal-desk:";

export const STORAGE_KEYS = {
  draftsIndex: `${PREFIX}drafts-index`,
  prefs: `${PREFIX}prefs`,
  /** Zustand persist blob for `useSignalStore` */
  signalStore: `${PREFIX}signal-store-v1`,
} as const;

export type StorageKey = string;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** True when localStorage can be used (browser + not disabled) */
export function isLocalStorageAvailable(): boolean {
  if (!isBrowser()) return false;
  try {
    const k = `${PREFIX}__probe`;
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

function safeGet(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* quota or privacy mode */
  }
}

function safeRemove(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function getString(key: StorageKey): string | null {
  return safeGet(key);
}

export function setString(key: StorageKey, value: string): void {
  safeSet(key, value);
}

export function removeItem(key: StorageKey): void {
  safeRemove(key);
}

/** Remove every key that starts with `prefix` (e.g. clear app namespace) */
export function clearKeysByPrefix(prefix: string): void {
  if (!isBrowser()) return;
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(prefix)) toRemove.push(k);
    }
    for (const k of toRemove) window.localStorage.removeItem(k);
  } catch {
    /* ignore */
  }
}

export function readJson<T>(key: string, fallback: T): T {
  const raw = safeGet(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  safeSet(key, JSON.stringify(value));
}
