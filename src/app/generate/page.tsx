import type { Metadata } from "next";
import { Suspense } from "react";
import { GenerateClient } from "./generate-client";

export const metadata: Metadata = {
  title: "Generate",
};

function GenerateFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500">
      Loading workspace…
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<GenerateFallback />}>
      <GenerateClient />
    </Suspense>
  );
}
