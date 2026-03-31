/**
 * Back-compat re-exports — prefer `@/data/templates` and `@/types`.
 */

export type { Template as MockTemplate, Template } from "@/types";
export { MOCK_TEMPLATES, getTemplateById } from "@/data/templates";
