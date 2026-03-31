import type { Metadata } from "next";
import { DraftsWorkspace } from "@/components/drafts/drafts-workspace";

export const metadata: Metadata = {
  title: "Drafts",
};

export default function DraftsPage() {
  return <DraftsWorkspace />;
}
