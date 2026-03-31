/** Local mock content for the productivity / strategy workspace */

export type DailyPlanCard = {
  id: string;
  title: string;
  lane: string;
  intent: string;
  window: string;
  moves: string[];
  accent: "cyan" | "violet" | "amber";
};

export type TaskBreakdown = {
  id: string;
  headline: string;
  steps: string[];
};

export type FocusColumn = {
  id: "commit" | "motion" | "parking";
  title: string;
  subtitle: string;
  items: { id: string; text: string }[];
};

export type WeeklyModule = {
  id: string;
  day: string;
  theme: string;
  outcome: string;
  checkpoints: string[];
};

export const MOCK_DAILY_PLAN_CARDS: DailyPlanCard[] = [
  {
    id: "day-am",
    title: "Morning wedge",
    lane: "Editorial",
    intent: "Name the decision before you polish sentences.",
    window: "First 90 min",
    moves: [
      "Rewrite the headline as a bet, not a label.",
      "Cut one section that repeats the intro.",
      "Leave one honest risk on the page.",
    ],
    accent: "cyan",
  },
  {
    id: "day-mid",
    title: "Proof pass",
    lane: "Marketing",
    intent: "Ship receipts — screenshots, quotes, timestamps.",
    window: "Midday block",
    moves: [
      "Pull one customer line that sounds like them, not us.",
      "Swap adjectives for verbs in the CTA ladder.",
      "Add a single objection + response pair.",
    ],
    accent: "violet",
  },
  {
    id: "day-pm",
    title: "Close the loop",
    lane: "Product",
    intent: "Turn meetings into owners and dates.",
    window: "Late day",
    moves: [
      "List decisions vs. open questions explicitly.",
      "Assign one DRI per thread — no shared ownership.",
      "Park nice-to-haves in a single parking lot list.",
    ],
    accent: "amber",
  },
];

export const MOCK_TASK_BREAKDOWN: TaskBreakdown = {
  id: "tb-001",
  headline: "Break down the next publishable artifact",
  steps: [
    "Define the reader’s job-to-be-done in one sentence.",
    "List three proof points — delete anything generic.",
    "Draft the worst version fast; mark seams for revision.",
    "Add a kill criterion: what would make you spike the piece?",
    "Schedule a 25m review with only red ink, no rewriting.",
  ],
};

export const MOCK_FOCUS_BOARD: FocusColumn[] = [
  {
    id: "commit",
    title: "Commit",
    subtitle: "Ship this week",
    items: [
      { id: "f1", text: "Launch email #1 — subject + body lock" },
      { id: "f2", text: "QBR storyline — outcomes slide only" },
    ],
  },
  {
    id: "motion",
    title: "In motion",
    subtitle: "Active passes",
    items: [
      { id: "f3", text: "Executive memo — vendor consolidation" },
      { id: "f4", text: "Pillar outline — workflow automation" },
    ],
  },
  {
    id: "parking",
    title: "Parking",
    subtitle: "Explicitly not now",
    items: [
      { id: "f5", text: "Analytics tile copy (defer to Q3)" },
      { id: "f6", text: "Brand glossary v2 — after launch burst" },
    ],
  },
];

export const MOCK_WEEKLY_MODULES: WeeklyModule[] = [
  {
    id: "wk-mon",
    day: "Mon",
    theme: "Narrative spine",
    outcome: "One storyline across email + social + sales one-pager.",
    checkpoints: ["Angle locked", "Proof stack drafted", "CTA ladder agreed"],
  },
  {
    id: "wk-wed",
    day: "Wed",
    theme: "Stakeholder cut",
    outcome: "Legal + PM sign-off on claims without diluting voice.",
    checkpoints: ["Claims list", "Risk callouts", "Revision owners"],
  },
  {
    id: "wk-fri",
    day: "Fri",
    theme: "Ship readiness",
    outcome: "Publish checklist + rollback plan for launch day.",
    checkpoints: ["URLs", "UTMs", "Owner on-call"],
  },
];
