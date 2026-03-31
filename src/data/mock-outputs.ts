import type { MockOutput } from "@/types";

/** Mock model generations — swap for real API responses later */
export const MOCK_AI_OUTPUTS: MockOutput[] = [
  {
    id: "out-001",
    title: "Beat sheet — remote culture feature",
    kind: "brief",
    templateId: "tpl-editorial-brief-lf",
    createdAt: "2026-03-28T14:22:00.000Z",
    body:
      "Act I: The promise of async (hope). Act II: Coordination tax (friction). Act III: Teams that ship anyway (proof). Kill if: no first-person sources by draft 2.",
  },
  {
    id: "out-002",
    title: "Launch email #1 — subject line options",
    kind: "email",
    templateId: "tpl-launch-signal-chain",
    createdAt: "2026-03-28T11:05:00.000Z",
    body:
      "A) Finally: approvals that don't ping you at midnight. B) Ship docs without the doc debt. C) What changed in how your team ships (March). Pick A for SMB, B for PLG, C for enterprise nurture.",
  },
  {
    id: "out-003",
    title: "Memo — vendor consolidation",
    kind: "memo",
    templateId: "tpl-executive-memo",
    createdAt: "2026-03-27T16:40:00.000Z",
    body:
      "Recommendation: Consolidate to Vendor X for FY27. Risk: migration window Q3. Alternative: dual-run (+$180k). Next steps: Security review by Apr 12; pilot team identified.",
  },
  {
    id: "out-004",
    title: "LinkedIn draft — shipping cadence",
    kind: "social",
    templateId: "tpl-li-thought-leadership",
    createdAt: "2026-03-27T09:15:00.000Z",
    body:
      "Hot take: your roadmap slide isn't the strategy — the tradeoffs you refuse are. This quarter we cut 3 'obvious' features. Here's what got faster because of it. What's one thing your team should stop pretending to ship?",
  },
  {
    id: "out-005",
    title: "QBR — opening storyline",
    kind: "brief",
    templateId: "tpl-cs-qbr-narrative",
    createdAt: "2026-03-26T19:00:00.000Z",
    body:
      "Story: From pilot chaos to governed rollout. Proof: 94% weekly active seats, 2.1x workflows automated vs. baseline. Ask: expand to EU pod + executive workshop in May.",
  },
  {
    id: "out-006",
    title: "Press — headline ladder",
    kind: "press",
    templateId: "tpl-press-milestone",
    createdAt: "2026-03-26T13:30:00.000Z",
    body:
      "Primary: [Company] crosses 5,000 teams on collaborative docs platform. Secondary: New workflow packs cut review cycles by 31% in beta. Quote anchor: CEO on responsible scale.",
  },
  {
    id: "out-007",
    title: "Pillar outline — workflow automation",
    kind: "outline",
    templateId: "tpl-seo-pillar-outline",
    createdAt: "2026-03-25T10:12:00.000Z",
    body:
      "H1: Workflow automation that survives real companies. H2: Where automation breaks (exceptions, audits, handoffs). H3: Playbooks by team size. H3: Security & compliance checklist. Snippet target: 'workflow automation best practices'.",
  },
  {
    id: "out-008",
    title: "One-pager — value + proof stack",
    kind: "bullets",
    templateId: "tpl-sales-one-pager",
    createdAt: "2026-03-25T08:45:00.000Z",
    body:
      "Value: Cut review cycles without losing audit trails. Proof: SOC2 Type II, 99.95% uptime, 40+ native integrations. Differentiator: policy-aware comments & redlines tied to roles.",
  },
  {
    id: "out-009",
    title: "Squad sync — action memo",
    kind: "memo",
    templateId: "tpl-meeting-memo",
    createdAt: "2026-03-24T17:05:00.000Z",
    body:
      "Decisions: Ship v1.2 with deferred analytics tile. Owners: Priya (eng), Luis (design). Due: Apr 4. Open: pricing experiment copy — legal review pending.",
  },
  {
    id: "out-010",
    title: "Podcast cold open — episode 42",
    kind: "script",
    templateId: "tpl-podcast-episode-brief",
    createdAt: "2026-03-24T12:00:00.000Z",
    body:
      "[Cold open] Everyone says 'alignment.' Few teams pay the tax of writing it down. Today: a PM and a legal lead on how they stopped debating the same paragraph every sprint.",
  },
  {
    id: "out-011",
    title: "Voice digest — tone do/don't",
    kind: "bullets",
    templateId: "tpl-brand-voice-digest",
    createdAt: "2026-03-23T15:20:00.000Z",
    body:
      "Do: name the tradeoff. Don't: 'best-in-class.' Do: specific metrics & customer verbs. Don't: empty urgency ('now more than ever'). Swap 'leverage' → 'use' in UI copy.",
  },
  {
    id: "out-012",
    title: "JD opening — Senior PM, Platform",
    kind: "brief",
    templateId: "tpl-hiring-jd",
    createdAt: "2026-03-23T11:00:00.000Z",
    body:
      "You'll own the roadmap for the surfaces 200+ teams rely on daily: from permissions to audit logs. You'll partner with security, design, and GTM — and say no with evidence.",
  },
  {
    id: "out-013",
    title: "Newsletter snippet — product update",
    kind: "email",
    templateId: "tpl-launch-signal-chain",
    createdAt: "2026-03-22T09:30:00.000Z",
    body:
      "Shipped: batch approvals for policy-bound docs. Why it matters: fewer @channel pings, same compliance posture. Try it: Settings → Workflows → Approvals.",
  },
  {
    id: "out-014",
    title: "Executive summary — Q1 content audit",
    kind: "memo",
    templateId: "tpl-executive-memo",
    createdAt: "2026-03-21T14:00:00.000Z",
    body:
      "Bottom line: Top-of-funnel up 12%; mid-funnel conversion flat. Hypothesis: case studies too generic. Proposal: verticalize 4 hero stories in Q2; retire 6 evergreen posts with <0.5% CTR.",
  },
  {
    id: "out-015",
    title: "Social thread — 5 bullets on focus",
    kind: "social",
    templateId: "tpl-li-thought-leadership",
    createdAt: "2026-03-20T18:22:00.000Z",
    body:
      "1) Roadmaps are guesses with footnotes. 2) Strategy is what you fund. 3) If every sprint is 'critical,' nothing is. 4) Write the one sentence you'd put on a wall. 5) Delete a meeting instead of adding a doc.",
  },
  {
    id: "out-016",
    title: "Customer quote bank — renewal prep",
    kind: "bullets",
    templateId: "tpl-cs-qbr-narrative",
    createdAt: "2026-03-19T10:08:00.000Z",
    body:
      "'We stopped versioning in email.' — Dir Ops, Series C. 'Legal finally sees the same redlines we do.' — GC, fintech. Use in deck p.4 and executive summary.",
  },
  {
    id: "out-017",
    title: "SEO — FAQ block (snippet)",
    kind: "outline",
    templateId: "tpl-seo-pillar-outline",
    createdAt: "2026-03-18T16:44:00.000Z",
    body:
      "Q: How is workflow automation different from RPA here? A: We automate human-in-the-loop doc flows with policy gates, not brittle screen scraping. Q: Can we export audit trails? A: Yes — CSV & SIEM hooks.",
  },
  {
    id: "out-018",
    title: "Sales talk track — security objection",
    kind: "brief",
    templateId: "tpl-sales-one-pager",
    createdAt: "2026-03-18T11:11:00.000Z",
    body:
      "When they ask about data residency: We offer EU region for workspace data; keys customer-managed in roadmap H2. When they ask about SSO: SAML + SCIM today; Okta guides in help center.",
  },
  {
    id: "out-019",
    title: "Retro notes — sprint 48",
    kind: "memo",
    templateId: "tpl-meeting-memo",
    createdAt: "2026-03-17T15:55:00.000Z",
    body:
      "Went well: design QA caught copy regressions early. Improve: handoff doc template still optional — make default next sprint. Action: @Jamie template PR by Wed.",
  },
  {
    id: "out-020",
    title: "Podcast guest intro — 30s",
    kind: "script",
    templateId: "tpl-podcast-episode-brief",
    createdAt: "2026-03-16T13:10:00.000Z",
    body:
      "Our guest led platform at a Fortune 500, then a 40-person startup. We talk about when to centralize permissions — and when that centralization becomes its own product.",
  },
  {
    id: "out-021",
    title: "Brand — microcopy pass (settings)",
    kind: "bullets",
    templateId: "tpl-brand-voice-digest",
    createdAt: "2026-03-15T09:00:00.000Z",
    body:
      "Replace 'Invalid input' → 'That date must be after the start date.' Replace 'Error 403' → 'You need admin rights to change this policy.' Buttons: verb-first ('Save changes').",
  },
  {
    id: "out-022",
    title: "Screening rubric — PM loop",
    kind: "outline",
    templateId: "tpl-hiring-jd",
    createdAt: "2026-03-14T17:30:00.000Z",
    body:
      "Round 1: Prioritization case (60m). Round 2: System design with constraints. Round 3: Cross-functional conflict scenario. Bar: evidence of tradeoff communication, not feature lists.",
  },
];
