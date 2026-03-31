import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SEED_DRAFTS } from "@/data/drafts";
import { RECENT_SESSIONS } from "@/data/sessions";
import { STORAGE_KEYS } from "@/lib/storage";
import { countWords } from "@/lib/utils";
import type { Draft, Session } from "@/types";

const MAX_SESSIONS = 50;

const DEFAULT_FAVORITE_TEMPLATE_IDS: string[] = [
  "tpl-launch-signal-chain",
  "tpl-editorial-brief-lf",
  "tpl-executive-memo",
  "tpl-li-thought-leadership",
];

function newId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function cloneSeedDrafts(): Draft[] {
  return SEED_DRAFTS.map((d) => ({ ...d, pinned: d.pinned ?? false }));
}

function cloneSeedSessions(): Session[] {
  return RECENT_SESSIONS.map((s) => ({ ...s }));
}

function sortDrafts(drafts: Draft[]): Draft[] {
  return [...drafts].sort((a, b) => {
    const pa = a.pinned ? 1 : 0;
    const pb = b.pinned ? 1 : 0;
    if (pb !== pa) return pb - pa;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export type SaveDraftInput = Omit<Draft, "id" | "updatedAt" | "wordCount">;

export type UpdateDraftInput = Partial<
  Omit<Draft, "id" | "updatedAt" | "wordCount">
> & {
  body?: string;
};

export type AppearanceMode = "dark" | "light" | "system";

type SignalStoreState = {
  drafts: Draft[];
  sessions: Session[];
  selectedTemplateId: string | null;
  /** Pinned template shortcuts on the dashboard (max 6) */
  favoriteTemplateIds: string[];
  /** Canvas theme: dark, light, or follow OS (system). */
  appearance: AppearanceMode;
};

type SignalStoreActions = {
  setSelectedTemplateId: (id: string | null) => void;
  /** Create a new draft (new id, timestamps, word count). */
  saveDraft: (input: SaveDraftInput) => Draft;
  /** Merge fields into an existing draft; recomputes word count when `body` changes. */
  updateDraft: (id: string, patch: UpdateDraftInput) => void;
  deleteDraft: (id: string) => void;
  pinDraft: (id: string, pinned: boolean) => void;
  addSession: (session: Session) => void;
  /** Restore drafts and sessions to seed data; clears selected template. */
  resetDemoData: () => void;
  /** Drafts sorted: pinned first, then `updatedAt` desc. */
  getSortedDrafts: () => Draft[];
  toggleFavoriteTemplate: (templateId: string) => void;
  setAppearance: (mode: AppearanceMode) => void;
};

export type SignalStore = SignalStoreState & SignalStoreActions;

const initialState: SignalStoreState = {
  drafts: cloneSeedDrafts(),
  sessions: cloneSeedSessions(),
  selectedTemplateId: null,
  favoriteTemplateIds: [...DEFAULT_FAVORITE_TEMPLATE_IDS],
  appearance: "dark",
};

export const useSignalStore = create<SignalStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),

      saveDraft: (input) => {
        const now = new Date().toISOString();
        const draft: Draft = {
          id: newId("drf"),
          title: input.title,
          body: input.body,
          status: input.status,
          templateId: input.templateId,
          updatedAt: now,
          wordCount: countWords(input.body),
          pinned: input.pinned ?? false,
        };
        set((s) => ({ drafts: [draft, ...s.drafts] }));
        return draft;
      },

      updateDraft: (id, patch) => {
        set((s) => ({
          drafts: s.drafts.map((d) => {
            if (d.id !== id) return d;
            const nextBody = patch.body ?? d.body;
            const merged: Draft = {
              ...d,
              ...patch,
              body: nextBody,
              updatedAt: new Date().toISOString(),
              wordCount: countWords(nextBody),
            };
            return merged;
          }),
        }));
      },

      deleteDraft: (id) =>
        set((s) => ({ drafts: s.drafts.filter((d) => d.id !== id) })),

      pinDraft: (id, pinned) =>
        set((s) => ({
          drafts: s.drafts.map((d) =>
            d.id === id ? { ...d, pinned } : d,
          ),
        })),

      addSession: (session) =>
        set((s) => ({
          sessions: [session, ...s.sessions].slice(0, MAX_SESSIONS),
        })),

      resetDemoData: () =>
        set({
          drafts: cloneSeedDrafts(),
          sessions: cloneSeedSessions(),
          selectedTemplateId: null,
          favoriteTemplateIds: [...DEFAULT_FAVORITE_TEMPLATE_IDS],
        }),

      getSortedDrafts: () => sortDrafts(get().drafts),

      toggleFavoriteTemplate: (templateId) =>
        set((s) => {
          const has = s.favoriteTemplateIds.includes(templateId);
          if (has) {
            return {
              favoriteTemplateIds: s.favoriteTemplateIds.filter(
                (id) => id !== templateId,
              ),
            };
          }
          if (s.favoriteTemplateIds.length >= 6) return {};
          return {
            favoriteTemplateIds: [...s.favoriteTemplateIds, templateId],
          };
        }),

      setAppearance: (mode) => set({ appearance: mode }),
    }),
    {
      name: STORAGE_KEYS.signalStore,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        drafts: state.drafts,
        sessions: state.sessions,
        selectedTemplateId: state.selectedTemplateId,
        favoriteTemplateIds: state.favoriteTemplateIds,
        appearance: state.appearance,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<SignalStoreState> | undefined;
        if (!p || typeof p !== "object") return current;
        return {
          ...current,
          ...p,
          favoriteTemplateIds: Array.isArray(p.favoriteTemplateIds)
            ? p.favoriteTemplateIds
            : current.favoriteTemplateIds,
          appearance:
            p.appearance === "dark" ||
            p.appearance === "light" ||
            p.appearance === "system"
              ? p.appearance
              : current.appearance,
        };
      },
    },
  ),
);
