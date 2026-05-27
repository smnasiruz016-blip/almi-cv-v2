/**
 * AlmiCV — canonical role registry, sourced from @smnasiruz016-blip/job-roles
 * v0.1.1+ (cross-product master registry).
 *
 * Phase 2 integration: this module is now a THIN ADAPTER over the shared
 * package. It preserves the historical AlmiCV public surface so existing
 * consumers compile and behave identically:
 *
 *   Role                  — { name, slug, sector, aliases? }  (unchanged shape)
 *   JOB_ROLES             — all roles, sourced from package's getAllRoles()
 *   JOB_ROLES_BY_SLUG     — Map<slug, Role>
 *   JOB_ROLES_BY_SECTOR   — Map<sectorDisplayString, Role[]>
 *   BASE_ROLES            — 11 canonical AlmiSalary base roles (unchanged)
 *   getRoleBySlug(slug)   — also resolves aliases (delegates to package)
 *
 * The package uses `industry` (kebab enum) instead of `sector` (display
 * string). We map Industry → sector display string below so all existing
 * UI strings (e.g. "Built for X roles in {sector}") continue to render
 * the same human-readable text.
 *
 * Slug discipline (inherited from the package):
 *   - ASCII kebab, globally unique
 *   - Stable across versions — slug renames are breaking changes
 *
 * Used by:
 *   - app/cv-guide/[country]/[role]/page.tsx — programmatic SEO route
 *   - app/templates/role/[roleSlug]/page.tsx — role landing pages
 *   - app/sitemap.ts — sitemap generation
 *   - cross-product deep links to AlmiJob /jobs/{country}/{role} +
 *     AlmiSalary /salary/{country}/{role}
 */

import {
  getAllRoles,
  getRoleBySlug as pkgGetRoleBySlug,
  Industry,
  type JobRole,
} from "@smnasiruz016-blip/job-roles";

/** Historical AlmiCV Role shape — preserved so existing consumers compile
 *  unchanged. `sector` is a human-readable display string derived from the
 *  package's Industry enum via SECTOR_LABEL. */
export type Role = {
  name: string;
  slug: string;
  sector: string;
  aliases?: string[];
};

/** Industry (kebab enum) → human-readable sector display string used by UI
 *  copy. Values were chosen to match the original AlmiCV `roles.ts` sector
 *  strings for the 18 sectors that existed pre-integration, so any rendered
 *  copy (e.g. "Built for X roles in {sector}") looks identical for migrated
 *  roles. New industries get a sensible default. */
const SECTOR_LABEL: Record<Industry, string> = {
  [Industry.Healthcare]: "Healthcare & Medical",
  [Industry.Technology]: "Technology & IT",
  [Industry.Finance]: "Finance & Accounting",
  [Industry.Marketing]: "Sales & Marketing",
  [Industry.Education]: "Education & Training",
  [Industry.Legal]: "Legal",
  [Industry.Engineering]: "Engineering",
  [Industry.Trades]: "Construction & Skilled Trades",
  [Industry.Manufacturing]: "Manufacturing & Production",
  [Industry.Hospitality]: "Hospitality, Tourism & Food",
  [Industry.Beauty]: "Beauty & Personal Care",
  [Industry.ArtsMedia]: "Creative, Design & Media",
  [Industry.Government]: "Public Sector, Social & Other",
  [Industry.Administration]: "Business, Office & Admin",
  [Industry.HumanResources]: "Human Resources",
  [Industry.Retail]: "Customer Service & Retail",
  [Industry.Science]: "Science & Research",
  [Industry.Agriculture]: "Public Sector, Social & Other",
  [Industry.Religious]: "Public Sector, Social & Other",
  [Industry.Security]: "Public Sector, Social & Other",
  [Industry.Languages]: "Public Sector, Social & Other",
  [Industry.Automotive]: "Automotive",
  [Industry.RealEstate]: "Real Estate",
  [Industry.Sports]: "Sports & Athletics",
  [Industry.Executive]: "Executive Leadership",
};

function toLegacyRole(r: JobRole): Role {
  const role: Role = {
    name: r.name,
    slug: r.slug,
    sector: SECTOR_LABEL[r.industry],
  };
  if (r.aliases && r.aliases.length > 0) role.aliases = r.aliases;
  return role;
}

export const JOB_ROLES: readonly Role[] = getAllRoles().map(toLegacyRole);

/**
 * The 11 base roles — those that own salary data in AlmiSalary v2.
 * All other entries in JOB_ROLES that share these slugs are routed to
 * this canonical entry. Slug list is intentionally hardcoded here (not
 * derived from the package) so the AlmiSalary cross-product contract is
 * pinned at this layer and won't drift when new roles are added upstream.
 */
export const BASE_ROLES: readonly string[] = [
  "registered-nurse",
  "software-engineer",
  "doctor",
  "teacher",
  "accountant",
  "electrician",
  "chef",
  "data-scientist",
  "marketing-manager",
  "driver",
  "religious-scholar",
];

export const JOB_ROLES_BY_SLUG: ReadonlyMap<string, Role> = new Map(
  JOB_ROLES.map((r) => [r.slug, r]),
);

export const JOB_ROLES_BY_SECTOR: ReadonlyMap<string, Role[]> = (() => {
  const m = new Map<string, Role[]>();
  for (const r of JOB_ROLES) {
    const arr = m.get(r.sector) ?? [];
    arr.push(r);
    m.set(r.sector, arr);
  }
  return m;
})();

/** Lookup by primary slug OR alias-derived slug (delegates to the package's
 *  resolver, then re-wraps the package's JobRole as the legacy Role shape). */
export function getRoleBySlug(slug: string): Role | undefined {
  const r = pkgGetRoleBySlug(slug);
  return r ? toLegacyRole(r) : undefined;
}
