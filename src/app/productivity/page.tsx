import type { Metadata } from "next";
import { ProductivityWorkspace } from "@/components/productivity/productivity-workspace";

export const metadata: Metadata = {
  title: "Productivity",
};

export default function ProductivityPage() {
  return <ProductivityWorkspace />;
}
