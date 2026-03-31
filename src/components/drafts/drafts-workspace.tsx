"use client";

import {
  Pin,
  PinOff,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Badge, Button, Input, Textarea } from "@/components/ui";
import { formatIsoDate, searchRecords } from "@/lib/utils";
import { cn } from "@/lib/cn";
import { useSignalStore } from "@/store/use-signal-store";
import type { Draft, DraftStatus } from "@/types";

const STATUS_OPTIONS: { value: DraftStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "ready", label: "Ready" },
  { value: "archived", label: "Archived" },
];

function statusVariant(
  s: DraftStatus,
): "neutral" | "signal" | "lane" | "warn" | "success" {
  switch (s) {
    case "ready":
      return "success";
    case "review":
      return "signal";
    case "archived":
      return "neutral";
    default:
      return "lane";
  }
}

export function DraftsWorkspace() {
  const drafts = useSignalStore((s) => s.drafts);
  const updateDraft = useSignalStore((s) => s.updateDraft);
  const deleteDraft = useSignalStore((s) => s.deleteDraft);
  const pinDraft = useSignalStore((s) => s.pinDraft);

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const validSelectedId = useMemo(() => {
    if (!selectedId) return null;
    return drafts.some((d) => d.id === selectedId) ? selectedId : null;
  }, [drafts, selectedId]);

  const sorted = useMemo(() => {
    const list = [...drafts].sort((a, b) => {
      const pa = a.pinned ? 1 : 0;
      const pb = b.pinned ? 1 : 0;
      if (pb !== pa) return pb - pa;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return searchRecords(list, query, [
      (d) => d.title,
      (d) => d.body,
    ]);
  }, [drafts, query]);

  const selected = useMemo(
    () =>
      validSelectedId
        ? drafts.find((d) => d.id === validSelectedId)
        : undefined,
    [drafts, validSelectedId],
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (!window.confirm("Delete this draft? This cannot be undone.")) return;
      deleteDraft(id);
      setSelectedId((cur) => (cur === id ? null : cur));
    },
    [deleteDraft],
  );

  const handleTitleChange = useCallback(
    (id: string, title: string) => {
      updateDraft(id, { title });
    },
    [updateDraft],
  );

  const handleBodyChange = useCallback(
    (id: string, body: string) => {
      updateDraft(id, { body });
    },
    [updateDraft],
  );

  const handleStatusChange = useCallback(
    (id: string, status: DraftStatus) => {
      updateDraft(id, { status });
    },
    [updateDraft],
  );

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
          Drafts
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl">
          Local shelf
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          Drafts live in your browser via the Signal Desk store (persisted to{" "}
          <span className="text-zinc-400">localStorage</span>) — no server.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="flex flex-col gap-5 lg:col-span-5 xl:col-span-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-600"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles and body…"
              className="w-full rounded-3xl border border-white/[0.08] bg-[#0c0d12]/90 py-3 pl-11 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] focus:border-cyan-400/35 focus:outline-none focus:ring-2 focus:ring-cyan-400/15"
              aria-label="Search drafts"
            />
          </div>

          <ul className="flex flex-col gap-3">
            {sorted.length === 0 ? (
              <li className="rounded-3xl border border-dashed border-white/[0.1] bg-white/[0.02] px-5 py-10 text-center text-sm text-zinc-500">
                {drafts.length === 0
                  ? "No drafts yet — save from Generate."
                  : "No drafts match your search."}
              </li>
            ) : (
              sorted.map((d) => (
                <li key={d.id}>
                  <DraftCard
                    draft={d}
                    active={validSelectedId === d.id}
                    onOpen={() => setSelectedId(d.id)}
                    onPin={() => pinDraft(d.id, !d.pinned)}
                    onDelete={() => handleDelete(d.id)}
                  />
                </li>
              ))
            )}
          </ul>
        </div>

        <section className="lg:col-span-7 xl:col-span-8">
          <div
            className={cn(
              "relative min-h-[28rem] rounded-3xl border border-white/[0.08] bg-[linear-gradient(155deg,rgba(18,22,32,0.92)_0%,rgba(10,12,18,0.97)_100%)] shadow-[0_28px_90px_-40px_rgba(0,0,0,0.88),inset_0_1px_0_rgba(255,255,255,0.05)]",
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.35),transparent)] opacity-80"
              aria-hidden
            />
            {!selected ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-600">
                  Editor
                </p>
                <p className="max-w-sm font-[family-name:var(--font-display)] text-xl text-zinc-300">
                  Select a draft to edit
                </p>
                <p className="max-w-xs text-sm text-zinc-600">
                  Title and body save as you type — stored only on this device.
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-7">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-600">
                      Draft editor
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-zinc-600">
                      {selected.id}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={statusVariant(selected.status)}>
                      {selected.status}
                    </Badge>
                    <span className="text-xs tabular-nums text-zinc-500">
                      {selected.wordCount} words ·{" "}
                      {formatIsoDate(selected.updatedAt, "short")}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="shrink-0"
                      onClick={() => setSelectedId(null)}
                      aria-label="Close editor"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-5 px-5 py-5 sm:px-7 sm:py-6">
                  <Input
                    label="Title"
                    value={selected.title}
                    onChange={(e) =>
                      handleTitleChange(selected.id, e.target.value)
                    }
                  />
                  <div className="grid gap-2 sm:max-w-xs">
                    <label
                      htmlFor="draft-status"
                      className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500"
                    >
                      Status
                    </label>
                    <select
                      id="draft-status"
                      value={selected.status}
                      onChange={(e) =>
                        handleStatusChange(
                          selected.id,
                          e.target.value as DraftStatus,
                        )
                      }
                      className="w-full rounded-3xl border border-white/[0.08] bg-[#0c0d12]/90 py-3 pl-4 pr-10 text-sm text-zinc-100 focus:border-cyan-400/35 focus:outline-none focus:ring-2 focus:ring-cyan-400/15"
                    >
                      {STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Textarea
                    label="Content"
                    value={selected.body}
                    onChange={(e) =>
                      handleBodyChange(selected.id, e.target.value)
                    }
                    rows={16}
                    className="min-h-[18rem] font-mono text-[13px] leading-relaxed"
                  />
                  <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => pinDraft(selected.id, !selected.pinned)}
                    >
                      {selected.pinned ? (
                        <>
                          <PinOff className="size-4" />
                          Unpin
                        </>
                      ) : (
                        <>
                          <Pin className="size-4" />
                          Pin to top
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(selected.id)}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

type DraftCardProps = {
  draft: Draft;
  active: boolean;
  onOpen: () => void;
  onPin: () => void;
  onDelete: () => void;
};

function DraftCard({
  draft: d,
  active,
  onOpen,
  onPin,
  onDelete,
}: DraftCardProps) {
  const preview =
    d.body.replace(/\s+/g, " ").trim().slice(0, 140) +
    (d.body.length > 140 ? "…" : "");

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-[linear-gradient(150deg,rgba(20,24,34,0.95)_0%,rgba(12,14,22,0.98)_100%)] transition",
        active
          ? "border-cyan-400/35 shadow-[0_0_32px_rgba(56,200,255,0.12)]"
          : "border-white/[0.07] hover:border-white/[0.11]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.25),transparent)] opacity-70"
        aria-hidden
      />
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        className="flex w-full cursor-pointer flex-col gap-3 p-5 text-left outline-none ring-cyan-400/0 transition hover:bg-white/[0.02] focus-visible:ring-2 focus-visible:ring-cyan-400/30 sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {d.pinned ? (
                <Pin className="size-3.5 shrink-0 text-amber-400/90" aria-hidden />
              ) : null}
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug tracking-tight text-zinc-100">
                {d.title}
              </h2>
            </div>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">
              {preview || "Empty body"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.05] pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={statusVariant(d.status)}>{d.status}</Badge>
            <span className="text-[11px] tabular-nums text-zinc-600">
              {d.wordCount} w · {formatIsoDate(d.updatedAt, "short")}
            </span>
          </div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-cyan-400/80 opacity-0 transition group-hover:opacity-100">
            Open
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 border-t border-white/[0.05] px-3 py-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPin();
          }}
          className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/[0.06] hover:text-zinc-200"
          aria-label={d.pinned ? "Unpin draft" : "Pin draft"}
        >
          {d.pinned ? (
            <PinOff className="size-4" />
          ) : (
            <Pin className="size-4" />
          )}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="rounded-xl p-2 text-zinc-500 transition hover:bg-rose-950/40 hover:text-rose-300"
          aria-label="Delete draft"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </article>
  );
}
