"use client";

import { Loader2, Save } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Badge,
  Button,
  CommandChip,
  Select,
  Textarea,
} from "@/components/ui";
import { getTemplateById, MOCK_TEMPLATES } from "@/data/templates";
import {
  applyRefinement,
  mockGenerate,
  outputWordCount,
  type OutputLength,
  type RefinementId,
} from "@/lib/mock-ai";
import { cn } from "@/lib/cn";
import { useSignalStore } from "@/store/use-signal-store";

const TONE_OPTIONS = [
  { value: "", label: "Default lane" },
  { value: "Precise", label: "Precise" },
  { value: "Warm", label: "Warm" },
  { value: "Bold", label: "Bold" },
  { value: "Measured", label: "Measured" },
  { value: "Plain", label: "Plain" },
] as const;

const LENGTH_OPTIONS: { value: OutputLength; label: string }[] = [
  { value: "short", label: "Tight" },
  { value: "medium", label: "Standard" },
  { value: "long", label: "Expanded" },
];

const REFINE: { id: RefinementId; label: string }[] = [
  { id: "shorten", label: "Shorten" },
  { id: "expand", label: "Expand" },
  { id: "more_casual", label: "More casual" },
  { id: "more_professional", label: "More professional" },
  { id: "bullets", label: "Bullets" },
  { id: "social", label: "Social" },
];

const defaultTemplateId = MOCK_TEMPLATES[0]?.id ?? "";

const DEFAULT_PROMPT =
  "Outline the narrative for a product launch: audience tension, proof, and the one CTA we cannot dilute.";

export type GenerateWorkspaceProps = {
  /** From `?template=` on the Generate route (client URL; static export). */
  initialTemplateSlug?: string;
};

export function GenerateWorkspace({
  initialTemplateSlug,
}: GenerateWorkspaceProps = {}) {
  const saveDraft = useSignalStore((s) => s.saveDraft);
  const setSelectedTemplateId = useSignalStore((s) => s.setSelectedTemplateId);

  const [prompt, setPrompt] = useState(() => {
    const t = initialTemplateSlug
      ? getTemplateById(initialTemplateSlug)
      : null;
    return t?.promptSeed ?? DEFAULT_PROMPT;
  });
  const [templateId, setTemplateId] = useState(() => {
    const t = initialTemplateSlug
      ? getTemplateById(initialTemplateSlug)
      : null;
    return t?.id ?? defaultTemplateId;
  });
  const [tone, setTone] = useState<string>(TONE_OPTIONS[1].value);
  const [length, setLength] = useState<OutputLength>("medium");
  const [busy, setBusy] = useState(false);
  const [outputTitle, setOutputTitle] = useState("");
  const [outputBody, setOutputBody] = useState("");
  const [passId, setPassId] = useState<string | null>(null);
  const [passAt, setPassAt] = useState<string | null>(null);
  const [saveHint, setSaveHint] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTemplateId(templateId);
  }, [templateId, setSelectedTemplateId]);

  const runGenerate = useCallback(async () => {
    setBusy(true);
    setSaveHint(null);
    await new Promise((r) => setTimeout(r, 480));
    const out = mockGenerate({
      prompt,
      templateId: templateId || undefined,
      tone: tone || undefined,
      length,
    });
    setOutputTitle(out.title);
    setOutputBody(out.body);
    setPassId(out.id);
    setPassAt(out.createdAt);
    setBusy(false);
  }, [prompt, templateId, tone, length]);

  const runRefine = useCallback((id: RefinementId) => {
    setOutputBody((prev) => {
      if (!prev.trim()) return prev;
      return applyRefinement(prev, id);
    });
    setSaveHint(null);
  }, []);

  const handleSaveDraft = useCallback(() => {
    if (!outputBody.trim()) {
      setSaveHint("Generate a pass first.");
      return;
    }
    const title =
      outputTitle.trim() ||
      `Draft — ${prompt.trim().slice(0, 42)}${prompt.length > 42 ? "…" : ""}`;
    saveDraft({
      title,
      body: outputBody,
      status: "draft",
      templateId: templateId || undefined,
    });
    setSaveHint("Saved to drafts (local).");
  }, [outputBody, outputTitle, prompt, saveDraft, templateId]);

  const words = outputWordCount(outputBody);
  const tpl = MOCK_TEMPLATES.find((t) => t.id === templateId);

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      <header className="max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
          Generate
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl">
          Composition pass
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          A control-room surface — not a chat thread. Tune lane, tone, and
          length, then review the mock output and refine in place.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        {/* Composer column */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div
            className={cn(
              "relative overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[linear-gradient(165deg,rgba(26,30,42,0.96)_0%,rgba(10,12,18,0.98)_50%,rgba(6,7,11,1)_100%)] p-1",
              "shadow-[0_0_0_1px_rgba(110,200,255,0.05),0_32px_100px_-48px_rgba(0,0,0,0.9)]",
            )}
          >
            <div
              className="pointer-events-none absolute -left-1/4 top-0 h-px w-[150%] bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.45),rgba(167,139,250,0.35),transparent)] opacity-75"
              aria-hidden
            />
            <div className="rounded-[1.6rem] border border-white/[0.05] bg-[#090a0f]/50 p-5 sm:p-7">
              <Textarea
                label="Brief / prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={10}
                className="min-h-[14rem] rounded-3xl border-white/[0.07] bg-[#0a0b10]/90 text-[15px] leading-relaxed sm:min-h-[16rem]"
                placeholder="What are you trying to ship in this pass? Constraints beat vibes."
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Select
                  label="Template lane"
                  value={templateId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setTemplateId(id);
                    setSelectedTemplateId(id);
                  }}
                >
                  {MOCK_TEMPLATES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  {TONE_OPTIONS.map((o) => (
                    <option key={o.label} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Output length"
                  value={length}
                  onChange={(e) =>
                    setLength(e.target.value as OutputLength)
                  }
                  className="sm:col-span-2 lg:col-span-1"
                >
                  {LENGTH_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  disabled={busy || !prompt.trim()}
                  onClick={() => void runGenerate()}
                  className="min-w-[11rem]"
                >
                  {busy ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Running pass…
                    </>
                  ) : (
                    "Run composition pass"
                  )}
                </Button>
                <p className="max-w-sm text-xs leading-relaxed text-zinc-600">
                  Mock engine only — deterministic seeds + local refinements. No
                  network.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Output canvas */}
        <div className="flex flex-col gap-5 lg:col-span-5 lg:pt-1">
          <div
            className={cn(
              "relative flex min-h-[22rem] flex-col rounded-3xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(14,16,24,0.95)_0%,rgba(8,9,14,0.98)_100%)]",
              "shadow-[0_24px_80px_-40px_rgba(0,0,0,0.88),inset_0_1px_0_rgba(255,255,255,0.04)]",
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.35),transparent)]"
              aria-hidden
            />
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-600">
                  Signal output
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-zinc-100">
                  {outputTitle || "Awaiting pass"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {tpl ? (
                  <Badge variant="lane">{tpl.lane}</Badge>
                ) : null}
                {passAt ? (
                  <span className="text-[11px] tabular-nums text-zinc-500">
                    {new Date(passAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                ) : null}
                {outputBody ? (
                  <Badge variant="signal">{words} words</Badge>
                ) : null}
              </div>
            </div>

            <div className="flex-1 overflow-auto px-5 py-5 sm:px-6">
              {outputBody ? (
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-zinc-300 [word-break:break-word]">
                  {outputBody}
                </pre>
              ) : (
                <div className="flex min-h-[12rem] flex-col justify-center gap-2 rounded-2xl border border-dashed border-white/[0.08] bg-black/20 px-4 py-8 text-center">
                  <p className="text-sm font-medium text-zinc-500">
                    Output canvas
                  </p>
                  <p className="text-xs text-zinc-600">
                    Run a pass to render mock copy here — flat surface, not a chat
                    bubble.
                  </p>
                </div>
              )}
            </div>

            {passId ? (
              <p className="border-t border-white/[0.05] px-5 py-2 font-mono text-[10px] text-zinc-600 sm:px-6">
                Pass id · {passId}
              </p>
            ) : null}
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
              Refine
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {REFINE.map((r) => (
                <CommandChip
                  key={r.id}
                  type="button"
                  disabled={!outputBody.trim()}
                  emphasis="default"
                  onClick={() => runRefine(r.id)}
                >
                  {r.label}
                </CommandChip>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              disabled={!outputBody.trim()}
              onClick={handleSaveDraft}
            >
              <Save className="size-4 opacity-90" />
              Save to drafts
            </Button>
            {saveHint ? (
              <span className="text-sm text-emerald-400/90">{saveHint}</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
