import type { Metadata } from "next";
import { TemplatesGallery } from "@/components/templates/templates-gallery";

export const metadata: Metadata = {
  title: "Templates",
};

export default function TemplatesPage() {
  return <TemplatesGallery />;
}
