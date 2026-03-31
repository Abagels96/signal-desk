import type { Draft } from "@/types";

/** Seed drafts for UI/dev — merge with or replace via localStorage at runtime */
export const SEED_DRAFTS: Draft[] = [
  {
    id: "drf-7a2f",
    title: "Q2 narrative — category creation (v3)",
    status: "review",
    pinned: true,
    templateId: "tpl-launch-signal-chain",
    updatedAt: "2026-03-29T21:14:00.000Z",
    wordCount: 842,
    body:
      "Opening still too safe. Lead with the budget line item every CFO recognizes: duplicate tooling in Slack + email + Drive. Then pivot to governed workflows — not 'another tool.' Need one customer quote with revenue impact.",
  },
  {
    id: "drf-3c91",
    title: "Board memo — EU expansion risks",
    status: "draft",
    templateId: "tpl-executive-memo",
    updatedAt: "2026-03-29T18:02:00.000Z",
    wordCount: 612,
    body:
      "Recommendation: Phase Germany before France (partner density + existing CS coverage). Risks: DPA timeline, vendor subprocessors in analytics. Alternative: UK-only landing in Q3 — lower revenue upside, faster path.",
  },
  {
    id: "drf-9e44",
    title: "LinkedIn — post on writing specs people read",
    status: "ready",
    templateId: "tpl-li-thought-leadership",
    updatedAt: "2026-03-29T12:40:00.000Z",
    wordCount: 198,
    body:
      "Specs fail when they pretend to be neutral. Name the decision, the constraint, and the thing you're not building. If your spec could apply to any company, it's not done.",
  },
  {
    id: "drf-2b18",
    title: "Acme — QBR storyline (renewal in 45 days)",
    status: "draft",
    templateId: "tpl-cs-qbr-narrative",
    updatedAt: "2026-03-28T22:55:00.000Z",
    wordCount: 1104,
    body:
      "Hero: adoption in RevOps + Legal. Risk: two workflows still manual (export to SOX). Ask: expand seats to EU + executive workshop. Need success metrics from their Salesforce — pending from champion.",
  },
  {
    id: "drf-5d01",
    title: "Press draft — Series C extension",
    status: "review",
    templateId: "tpl-press-milestone",
    updatedAt: "2026-03-28T15:10:00.000Z",
    wordCount: 456,
    body:
      "[Headline TBD] Company announces extension to support enterprise roadmap. Quote from CEO: focus on durable growth. Boilerplate refresh needed — employee count wrong in last version.",
  },
  {
    id: "drf-8c33",
    title: "Pillar page — workflow automation (outline)",
    status: "draft",
    templateId: "tpl-seo-pillar-outline",
    updatedAt: "2026-03-27T09:28:00.000Z",
    wordCount: 720,
    body:
      "H2s: When automation fails, Building blocks, Teams by size, Security checklist. Internal links: pricing, security, case studies. Need screenshots from design — placeholders only.",
  },
  {
    id: "drf-1f90",
    title: "Sales one-pager — healthcare vertical",
    status: "ready",
    templateId: "tpl-sales-one-pager",
    updatedAt: "2026-03-26T19:45:00.000Z",
    wordCount: 388,
    body:
      "Value prop tuned for HIPAA conversations: audit trails, BAAs, break-glass access. Proof: two hospital logos + time-to-onboarding stat. Strip generic phrases from generic version.",
  },
  {
    id: "drf-4aa7",
    title: "Design sync — notes + decisions",
    status: "archived",
    templateId: "tpl-meeting-memo",
    updatedAt: "2026-03-25T14:00:00.000Z",
    wordCount: 265,
    body:
      "Decision: Ship simplified approvals UI in v1.2. Owner: Luis. Open: empty state copy for zero workflows — copy deck Friday. Parking lot: analytics tile — Q3.",
  },
];
