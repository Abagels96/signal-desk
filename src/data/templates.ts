import type { Template } from "@/types";

export const MOCK_TEMPLATES: Template[] = [
  {
    id: "tpl-editorial-brief-lf",
    title: "Editorial brief — longform feature",
    lane: "Editorial",
    blurb:
      "Angle, tension, three beat moves, and kill criteria before anyone opens a doc.",
    tags: ["magazine", "essay", "voice"],
    audience: "Senior editors & contributing writers",
    estMinutes: 25,
    promptSeed:
      "Longform feature: define the angle, audience tension, three beat moves, and kill criteria before draft one.",
  },
  {
    id: "tpl-launch-signal-chain",
    title: "Product launch — signal chain",
    lane: "Marketing",
    blurb:
      "Hook, proof stack, objection handling, and CTA ladder for a coordinated week-one burst.",
    tags: ["launch", "email", "social"],
    audience: "Demand gen + product marketing",
    estMinutes: 40,
    promptSeed:
      "Product launch week one: hook, proof stack, objection handling, and CTA ladder across email + social.",
  },
  {
    id: "tpl-executive-memo",
    title: "Executive memo — decision frame",
    lane: "Executive",
    blurb:
      "Recommendation, risks, alternatives, and next steps without a slide deck.",
    tags: ["memo", "leadership", "ops"],
    audience: "Exec staff & functional leads",
    estMinutes: 20,
    promptSeed:
      "Executive memo: recommendation first, risks, alternatives, and next steps — no slide deck.",
  },
  {
    id: "tpl-li-thought-leadership",
    title: "LinkedIn — thought leadership post",
    lane: "Marketing",
    blurb:
      "Contrarian hook, lived example, and a comment prompt that invites practitioners.",
    tags: ["linkedin", "b2b", "founder-brand"],
    audience: "ICP: heads of product & eng",
    estMinutes: 15,
    promptSeed:
      "LinkedIn thought leadership: contrarian hook, lived example, and one comment prompt for practitioners.",
  },
  {
    id: "tpl-cs-qbr-narrative",
    title: "Customer success — QBR narrative",
    lane: "Sales",
    blurb:
      "Outcomes first, adoption story, risks, and renewal ask with a single storyline.",
    tags: ["qbr", "renewal", "cs"],
    audience: "Economic buyer + champion",
    estMinutes: 35,
    promptSeed:
      "QBR narrative: outcomes first, adoption story, risks, and renewal ask in one storyline.",
  },
  {
    id: "tpl-press-milestone",
    title: "Press release — milestone",
    lane: "Marketing",
    blurb:
      "Headline ladder, quote strategy, boilerplate, and analyst talking points.",
    tags: ["pr", "comms", "launch"],
    audience: "Trade press & newsletters",
    estMinutes: 30,
    promptSeed:
      "Press release: headline ladder, quote strategy, boilerplate, and analyst talking points.",
  },
  {
    id: "tpl-seo-pillar-outline",
    title: "SEO — pillar page outline",
    lane: "Marketing",
    blurb:
      "Intent map, H2/H3 skeleton, internal links, and snippet targets for one pillar.",
    tags: ["seo", "content", "web"],
    audience: "Organic search readers",
    estMinutes: 45,
    promptSeed:
      "SEO pillar: intent map, H2/H3 skeleton, internal links, and snippet targets for one pillar page.",
  },
  {
    id: "tpl-sales-one-pager",
    title: "Sales — one-pager (PDF handoff)",
    lane: "Sales",
    blurb:
      "Value prop, proof points, integration footprint, and security callouts on one page.",
    tags: ["sales", "enablement", "pdf"],
    audience: "Procurement + IT evaluators",
    estMinutes: 25,
    promptSeed:
      "Sales one-pager: value prop, proof points, integrations, and security callouts on one page.",
  },
  {
    id: "tpl-meeting-memo",
    title: "Meeting notes → action memo",
    lane: "Product",
    blurb:
      "Decisions, owners, dates, and open questions from a cross-functional sync.",
    tags: ["notes", "actions", "prd"],
    audience: "Squad + stakeholders",
    estMinutes: 12,
    promptSeed:
      "Meeting notes → memo: decisions, owners, dates, and open questions from a cross-functional sync.",
  },
  {
    id: "tpl-podcast-episode-brief",
    title: "Podcast — episode brief",
    lane: "Editorial",
    blurb:
      "Cold open, guest thesis, tension questions, and CTA for subscribers.",
    tags: ["podcast", "interview", "script"],
    audience: "Listeners & clip editors",
    estMinutes: 28,
    promptSeed:
      "Podcast episode brief: cold open, guest thesis, tension questions, and subscriber CTA.",
  },
  {
    id: "tpl-brand-voice-digest",
    title: "Brand voice — guidelines digest",
    lane: "Marketing",
    blurb:
      "Tone sliders, do/don't examples, and vocabulary swaps for new hires.",
    tags: ["brand", "onboarding", "copy"],
    audience: "Marketing & design",
    estMinutes: 50,
    promptSeed:
      "Brand voice digest: tone sliders, do/don't examples, and vocabulary swaps for onboarding.",
  },
  {
    id: "tpl-hiring-jd",
    title: "Hiring — job description (IC)",
    lane: "People",
    blurb:
      "Impact narrative, scope, bar, and inclusive language checklist for one role.",
    tags: ["hiring", "jd", "people"],
    audience: "Candidates & hiring managers",
    estMinutes: 22,
    promptSeed:
      "Job description: impact narrative, scope, bar, and inclusive language checklist for one IC role.",
  },
];

export function getTemplateById(id: string): Template | undefined {
  return MOCK_TEMPLATES.find((t) => t.id === id);
}

/** Distinct lane labels for gallery filters */
export function getTemplateLanes(): string[] {
  return Array.from(new Set(MOCK_TEMPLATES.map((t) => t.lane))).sort(
    (a, b) => a.localeCompare(b),
  );
}
