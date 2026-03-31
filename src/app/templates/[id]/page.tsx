import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { Badge, buttonClasses, GlassCard } from "@/components/ui";
import { getTemplateById, MOCK_TEMPLATES } from "@/data/templates";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return MOCK_TEMPLATES.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const t = getTemplateById(id);
  return {
    title: t ? t.title : "Template",
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { id } = await params;
  const template = getTemplateById(id);
  if (!template) notFound();

  const generateHref = `/generate?template=${encodeURIComponent(template.id)}`;

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      <nav className="text-sm text-zinc-500 light:text-zinc-600">
        <Link
          href="/templates"
          className="text-cyan-300/80 hover:text-cyan-200 light:text-cyan-700 light:hover:text-cyan-900"
        >
          Templates
        </Link>
        <span className="mx-2 text-zinc-600 light:text-zinc-500">/</span>
        <span className="text-zinc-400 light:text-zinc-600">{template.lane}</span>
      </nav>

      <header className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="lane">{template.lane}</Badge>
            {typeof template.estMinutes === "number" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-zinc-400 light:border-zinc-200/80 light:bg-zinc-100/90 light:text-zinc-700">
                <Clock className="size-3.5 opacity-70" aria-hidden />
                ~{template.estMinutes} min to first draft
              </span>
            ) : null}
          </div>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-zinc-50 light:text-zinc-900 sm:text-4xl lg:text-[2.35rem]">
            {template.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 light:text-zinc-700">
            {template.blurb}
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Link
              href={generateHref}
              className={`${buttonClasses("primary", "lg")} w-full justify-center min-[480px]:w-auto`}
            >
              Open in Generate
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/templates"
              className={`${buttonClasses("secondary", "lg")} w-full justify-center min-[480px]:w-auto`}
            >
              Back to gallery
            </Link>
          </div>
        </div>

        <GlassCard
          eyebrow="Audience"
          title="Who it&apos;s for"
          accent
          className="lg:translate-y-1"
        >
          <p className="text-sm leading-relaxed text-zinc-400 light:text-zinc-700">
            {template.audience ?? "Define your reader in the prompt when you run a pass."}
          </p>
        </GlassCard>
      </header>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <GlassCard
          eyebrow="Starter prompt"
          title="Preconfigured for Generate"
          accent
          className="lg:col-span-7"
        >
          <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-300 light:text-zinc-800">
            {template.promptSeed ??
              `${template.blurb}\n\n(Add constraints in Generate.)`}
          </p>
          <p className="mt-4 text-xs text-zinc-600 light:text-zinc-600">
            This seed loads when you open Generate with{" "}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] light:bg-zinc-200/80 light:text-zinc-800">
              ?template={template.id}
            </code>
            .
          </p>
        </GlassCard>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="rounded-3xl border border-white/[0.07] bg-[linear-gradient(160deg,rgba(18,22,32,0.85)_0%,rgba(10,12,18,0.94)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] light:border-zinc-200/80 light:bg-[linear-gradient(160deg,rgba(255,255,255,0.96)_0%,rgba(244,244,245,0.98)_100%)] light:shadow-[inset_0_1px_0_rgba(0,0,0,0.04)]">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500 light:text-zinc-600">
              Signals
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="neutral">{tag}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={generateHref}
            className="group flex items-center justify-between rounded-3xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-4 text-sm font-semibold text-cyan-100 shadow-[0_0_28px_rgba(56,200,255,0.1)] transition hover:border-cyan-400/35 hover:bg-cyan-500/15"
          >
            Run composition pass
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
