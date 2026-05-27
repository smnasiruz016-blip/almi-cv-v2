// Smoke test for the @smnasiruz016-blip/job-roles integration.
// Run via: npm run smoke:roles
//
// Verifies the package is installed + resolves + Batch 4 fix took effect.
import assert from "node:assert/strict";
import {
  getAllRoles,
  getRoleBySlug,
  Industry,
} from "@smnasiruz016-blip/job-roles";

const all = getAllRoles();
assert.ok(all.length >= 465, `expected >= 465 roles, got ${all.length}`);
console.log(`✓ ${all.length} roles total (>= 465 floor)`);

const surgeon = getRoleBySlug("surgeon");
assert.ok(surgeon, "expected surgeon role to exist");
assert.equal(surgeon.slug, "surgeon");
assert.equal(surgeon.industry, Industry.Healthcare);
console.log(`✓ getRoleBySlug("surgeon") → ${surgeon.name} (${surgeon.industry})`);

// Sample 5 previously-404 Batch 4 slugs.
for (const slug of [
  "surgeon",
  "cloud-architect",
  "solutions-architect",
  "clinical-pharmacist",
  "stem-teacher",
]) {
  const r = getRoleBySlug(slug);
  assert.ok(r, `expected ${slug} to resolve via package`);
}
console.log("✓ all 5 sampled Batch 4 slugs resolve");

// Spot-check legacy AlmiCV slugs still work (regression guard).
for (const slug of [
  "registered-nurse",
  "software-engineer",
  "doctor",
  "electrician",
  "accountant",
]) {
  const r = getRoleBySlug(slug);
  assert.ok(r, `legacy slug ${slug} disappeared from package`);
}
console.log("✓ all 5 sampled legacy AlmiCV slugs still resolve");
