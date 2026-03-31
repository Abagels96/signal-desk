import type { Insight } from "@/types";

/** Mock insight cards — narrative/productivity signals, not financial dashboards */
export const INSIGHT_CARDS: Insight[] = [
  {
    id: "ins-001",
    title: "Editorial depth vs. shipping cadence",
    summary:
      "Sessions tagged Editorial averaged longer deep-work blocks than Marketing lanes, but produced fewer discrete outputs per hour — consistent with revision-heavy work.",
    category: "productivity",
    trend: "neutral",
    metricLabel: "Avg. deep work / session",
    metricValue: "72 min",
    period: "Last 14 days",
  },
  {
    id: "ins-002",
    title: "Launch lane: proof before promise",
    summary:
      "Mock outputs tied to launch templates that led with customer proof saw higher placeholder 'quality' scores in review drafts — lead with receipts, not adjectives.",
    category: "content",
    trend: "up",
    metricLabel: "Drafts past review on first pass",
    metricValue: "38%",
    period: "Last 14 days",
  },
  {
    id: "ins-003",
    title: "Executive memos: shorter, decision-first",
    summary:
      "Memos under 650 words had fewer follow-up clarification threads in seeded data — recommendation blocks in paragraph one correlate with faster stakeholder sign-off.",
    category: "workflow",
    trend: "up",
    metricLabel: "Median memo length",
    metricValue: "612 words",
    period: "Last 30 days",
  },
  {
    id: "ins-004",
    title: "QBR narratives: outcomes vs. adoption",
    summary:
      "Customer success drafts that opened with revenue or risk outcomes retained stakeholder attention markers (longer session notes) vs. feature adoption lists.",
    category: "quality",
    trend: "up",
    period: "Last 30 days",
  },
  {
    id: "ins-005",
    title: "Fragmented sessions",
    summary:
      "Four sessions ended as interrupted or paused — often mid-outline. Batching outline generation before polish passes may reduce context loss.",
    category: "productivity",
    trend: "down",
    metricLabel: "Interrupted sessions",
    metricValue: "4",
    period: "Last 14 days",
  },
  {
    id: "ins-006",
    title: "Cross-lane reuse",
    summary:
      "Sales and Marketing templates shared phrasing clusters in mock outputs (security, compliance) — a shared glossary could reduce duplicate drafting time.",
    category: "workflow",
    trend: "neutral",
    period: "Last 30 days",
  },
  {
    id: "ins-007",
    title: "Hiring & people content: slower iteration",
    summary:
      "JD and screening content had longer time-to-ready in seeded drafts — likely due to stakeholder loops; consider explicit approval checkpoints in template.",
    category: "workflow",
    trend: "neutral",
    period: "Last 30 days",
  },
];
