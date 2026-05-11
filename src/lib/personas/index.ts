/**
 * Persona library — 15 role × mood sample CVs that pair with the
 * recipe-driven templates in src/lib/recipes/.
 *
 * Naming convention: <role>-<mood>. Each persona is a fully populated
 * CVData object so /templates/<slug> previews render rich content even
 * before a user signs up.
 *
 * Currently only `healthcare-bold` is wired to a published recipe
 * (healthcare-bold-clinical-v1). The other 14 personas are pre-built
 * for future stages of the factory rollout.
 */
import type { CVData } from "@/lib/cv-types";

export { healthcareBold } from "./healthcare-bold";
export { healthcareBoldIcu } from "./healthcare-bold-icu";
export { healthcareModern } from "./healthcare-modern";
export { healthcareRefined } from "./healthcare-refined";
export { tradesBold } from "./trades-bold";
export { tradesModern } from "./trades-modern";
export { tradesRefined } from "./trades-refined";
export { bpoBold } from "./bpo-bold";
export { bpoModern } from "./bpo-modern";
export { bpoRefined } from "./bpo-refined";
export { hospitalityBold } from "./hospitality-bold";
export { hospitalityModern } from "./hospitality-modern";
export { hospitalityRefined } from "./hospitality-refined";
export { techBold } from "./tech-bold";
export { techModern } from "./tech-modern";
export { techRefined } from "./tech-refined";
export { projectManagementBoldSenior } from "./project-management-bold-senior";

import { healthcareBold } from "./healthcare-bold";
import { healthcareBoldIcu } from "./healthcare-bold-icu";
import { healthcareModern } from "./healthcare-modern";
import { healthcareRefined } from "./healthcare-refined";
import { tradesBold } from "./trades-bold";
import { tradesModern } from "./trades-modern";
import { tradesRefined } from "./trades-refined";
import { bpoBold } from "./bpo-bold";
import { bpoModern } from "./bpo-modern";
import { bpoRefined } from "./bpo-refined";
import { hospitalityBold } from "./hospitality-bold";
import { hospitalityModern } from "./hospitality-modern";
import { hospitalityRefined } from "./hospitality-refined";
import { techBold } from "./tech-bold";
import { techModern } from "./tech-modern";
import { techRefined } from "./tech-refined";
import { projectManagementBoldSenior } from "./project-management-bold-senior";

/** All persona IDs that recipes can reference via `preview_persona_id`. */
export type PersonaId =
  | "healthcare-bold"
  | "healthcare-bold-icu"
  | "healthcare-modern"
  | "healthcare-refined"
  | "trades-bold"
  | "trades-modern"
  | "trades-refined"
  | "bpo-bold"
  | "bpo-modern"
  | "bpo-refined"
  | "hospitality-bold"
  | "hospitality-modern"
  | "hospitality-refined"
  | "tech-bold"
  | "tech-modern"
  | "tech-refined"
  | "project-management-bold-senior";

export const PERSONAS: Record<PersonaId, CVData> = {
  "healthcare-bold": healthcareBold,
  "healthcare-bold-icu": healthcareBoldIcu,
  "healthcare-modern": healthcareModern,
  "healthcare-refined": healthcareRefined,
  "trades-bold": tradesBold,
  "trades-modern": tradesModern,
  "trades-refined": tradesRefined,
  "bpo-bold": bpoBold,
  "bpo-modern": bpoModern,
  "bpo-refined": bpoRefined,
  "hospitality-bold": hospitalityBold,
  "hospitality-modern": hospitalityModern,
  "hospitality-refined": hospitalityRefined,
  "tech-bold": techBold,
  "tech-modern": techModern,
  "tech-refined": techRefined,
  "project-management-bold-senior": projectManagementBoldSenior,
};

export function getPersona(id: PersonaId): CVData {
  return PERSONAS[id];
}
