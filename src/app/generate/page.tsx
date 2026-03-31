import type { Metadata } from "next";
import { GenerateWorkspace } from "@/components/generate/generate-workspace";

export const metadata: Metadata = {
  title: "Generate",
};

function normalizeTemplateParam(
  raw: string | string[] | undefined,
): string | undefined {
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw) && raw[0]) return raw[0];
  return undefined;
}

export default async function GeneratePage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string | string[] }>;
}) {
  const sp = await searchParams;
  const templateSlug = normalizeTemplateParam(sp.template);

  return (
    <GenerateWorkspace
      key={templateSlug ?? "__default__"}
      initialTemplateSlug={templateSlug}
    />
  );
}
