// One-shot Resume.data cleanup after PR #53. The mayaRodriguez sample
// is gone from the codebase, but 20+ user CVs still contain its
// placeholder strings in their data column (every Resume created via
// the old createResume() seed). This script blanks any field whose
// value still matches the exact Maya placeholder — per-field
// exact-match so a user who edited (say) `fullName` to their own name
// but left `email` as "maya@rodriguez.design" gets only the email
// cleared, not their name.
//
// Run:
//   node \
//     --env-file=.env.local \
//     --env-file="C:/Users/Lenovo/OneDrive/Desktop/almiworld/almi projects/Almicv/.env.local" \
//     --import tsx \
//     scripts/clear-maya-seed.ts
//
// Idempotent: a second run finds 0 affected rows because exact-match
// strings are now ""/[] in every previously-cleaned cell.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Exact Maya placeholder values to scrub. Sourced from the deleted
// src/lib/sample-cv-data.ts at git rev 34250f1 (last commit before
// PR #53 removed the file). Pasted verbatim — minor whitespace
// differences would mean the user edited and shouldn't be cleared.
const MAYA_PLACEHOLDERS = {
  fullName: "Maya Rodriguez",
  role: "Senior Product Designer",
  email: "maya@rodriguez.design",
  phone: "+1 415 555 0142",
  location: "San Francisco, CA",
  website: "mayarodriguez.design",
  linkedIn: "linkedin.com/in/mayarod",
  photoUrl:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
  summary:
    "Senior Product Designer with <strong>8 years</strong> building consumer fintech and SaaS at Acme, Globex, and earlier at Stripe. I lead <em>design systems</em>, run user research, and ship cohesive cross-platform experiences.",
};

const MAYA_EXPERIENCE_COMPANIES = new Set([
  "Acme Inc.",
  "Globex Corp",
  "Stripe",
]);
const MAYA_EDUCATION_SCHOOLS = new Set([
  "Carnegie Mellon University",
  "Brown University",
]);

type ResumeRow = { id: string; data: Record<string, unknown> };

async function main() {
  // Pull every Resume whose data column references "maya" anywhere.
  // Postgres JSONB text-contains is cheap with no index — table is
  // small (< 100 rows total in prod).
  const candidates = await prisma.$queryRaw<ResumeRow[]>`
    SELECT id, data
    FROM "Resume"
    WHERE data::text ILIKE '%maya%' OR data::text ILIKE '%Acme%' OR data::text ILIKE '%Globex%'
  `;
  console.log(`[clear-maya] candidate rows: ${candidates.length}`);

  let updatedCount = 0;
  let totalFieldsCleared = 0;

  for (const row of candidates) {
    const original = row.data;
    const cleaned = JSON.parse(JSON.stringify(original)) as Record<
      string,
      unknown
    >;
    let fieldsCleared = 0;

    // basics — per-field exact match
    const basics = cleaned.basics as Record<string, unknown> | undefined;
    if (basics) {
      for (const [key, mayaVal] of Object.entries(MAYA_PLACEHOLDERS)) {
        if (basics[key] === mayaVal) {
          // Clear to empty string (CVData type requires required fields
          // as `string`, not optional; render-side filters empty rows).
          basics[key] = "";
          fieldsCleared++;
        }
      }
    }

    // experience — if first entry's company is one of Maya's, treat
    // the whole array as Maya-seeded and clear it. (User editing one
    // bullet wouldn't change the company name; user editing the
    // company switches it off the Maya list.)
    const experience = cleaned.experience as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(experience) && experience.length > 0) {
      const allMayaCompanies = experience.every((e) =>
        MAYA_EXPERIENCE_COMPANIES.has(String(e.company ?? "")),
      );
      if (allMayaCompanies) {
        cleaned.experience = [];
        fieldsCleared++;
      }
    }

    // education — same logic
    const education = cleaned.education as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(education) && education.length > 0) {
      const allMayaSchools = education.every((e) =>
        MAYA_EDUCATION_SCHOOLS.has(String(e.school ?? "")),
      );
      if (allMayaSchools) {
        cleaned.education = [];
        fieldsCleared++;
      }
    }

    // skills, projects, languages, awards, certifications, interests —
    // these were always present in the Maya sample with specific
    // content. If user edits any, the array shape changes. Conservative
    // approach: clear them ONLY when basics.fullName was Maya AND we
    // just cleared the experience array (i.e. row was fully unedited).
    if (
      basics &&
      basics.fullName === "" &&  // we just cleared it
      Array.isArray(cleaned.experience) &&
      (cleaned.experience as unknown[]).length === 0
    ) {
      cleaned.skills = [];
      delete cleaned.projects;
      delete cleaned.languages;
      delete cleaned.awards;
      delete cleaned.certifications;
      delete cleaned.interests;
      delete cleaned.achievements;
    }

    if (fieldsCleared === 0) continue;

    await prisma.resume.update({
      where: { id: row.id },
      data: { data: cleaned as object },
    });
    updatedCount++;
    totalFieldsCleared += fieldsCleared;
    console.log(`[clear-maya] ✓ ${row.id} — cleared ${fieldsCleared} field(s)`);
  }

  console.log("");
  console.log(
    `[clear-maya] done. rows scanned: ${candidates.length} | rows updated: ${updatedCount} | total fields cleared: ${totalFieldsCleared}`,
  );

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("[clear-maya] fatal:", err);
  await prisma.$disconnect();
  process.exit(1);
});
