import type { Metadata } from "next";
import { InsightsWorkspace } from "@/components/insights/insights-workspace";

export const metadata: Metadata = {
  title: "Insights",
};

export default function InsightsPage() {
  return <InsightsWorkspace />;
}
