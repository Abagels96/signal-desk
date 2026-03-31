"use client";

import { useSearchParams } from "next/navigation";
import { GenerateWorkspace } from "@/components/generate/generate-workspace";

/** Client-only URL sync — required for `output: 'export'` (no server `searchParams`). */
export function GenerateClient() {
  const searchParams = useSearchParams();
  const templateSlug = searchParams.get("template") ?? undefined;

  return (
    <GenerateWorkspace
      key={templateSlug ?? "__default__"}
      initialTemplateSlug={templateSlug}
    />
  );
}
