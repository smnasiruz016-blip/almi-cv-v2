"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import {
  getUserPlan,
  isBillingEnabled,
  PLAN_DISPLAY_NAME,
  PLANS,
} from "@/lib/billing/plans";
import { userCanAccessTier } from "@/lib/billing/template-access";
import { getTemplate, isKnownTemplate } from "@/lib/templates";
import type { CVData, LanguageCode } from "@/lib/cv-types";
import { SAMPLE_CV_DATA } from "@/lib/cv-sample";
import type { TranslatedCV } from "@/lib/ai/translate-cv-shared";
import type { Prisma } from "@prisma/client";

/** Empty CVData skeleton — the seed when no parsed PNG content is in
 *  hand. Required fields are populated with empty strings (CVData's
 *  type requires them as `string`, not optional), but the rendering
 *  side (NeutralDefault) filters out empty rows before drawing, so
 *  the user sees a blank canvas with no placeholder cruft. */
const EMPTY_CV_DATA: CVData = {
  basics: { fullName: "", role: "", email: "" },
  experience: [],
  education: [],
  skills: [],
};

export type CreateResumeResult =
  | { ok: true; id: string }
  | { ok: false; error: string; code: "CV_LIMIT_REACHED" }
  | { ok: false; error: string; code: "TEMPLATE_REQUIRES_PRO" }
  | { ok: false; error: string; code: "UNKNOWN_TEMPLATE" };

export async function createResume(
  /** Slug from src/components/templates/template-registry. Phase 4 moved the
   *  default from the retired "neutral-default" to "classic-serif" (the
   *  template-engine fallback). Unknown slugs are rejected up front. */
  template: string = "classic-serif",
  /** Optional seed payload merged into an empty CVData skeleton. Used
   *  by /cv/new?templateImageId= — the parse pipeline writes whatever
   *  fields it could read from the PNG, and unparsed fields stay
   *  empty (templates hide empty sections, so the user starts with a
   *  blank canvas augmented by whatever the PNG provided). */
  seed?: Partial<CVData>,
): Promise<CreateResumeResult> {
  const user = await requireUser();

  // Reject unknown slugs early — defense against query-string fuzzing.
  if (!isKnownTemplate(template)) {
    return {
      ok: false,
      code: "UNKNOWN_TEMPLATE",
      error: "That template doesn't exist. Pick another from the gallery.",
    };
  }

  // Tier gate. We always read the user's plan to evaluate this — same
  // flow as CV-cap below — but we apply the tier check unconditionally
  // (independent of isBillingEnabled). Premium templates were a paywall
  // hole pre-Stage-2: defined in PLANS but never enforced. Now they
  // are. See @/lib/billing/template-access for the helper.
  const planUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
      subscriptionPlan: true,
      compProUntil: true,
    },
  });
  const plan = planUser ? getUserPlan(planUser) : "FREE";
  const tier = getTemplate(template).tier;
  if (!userCanAccessTier(plan, tier)) {
    return {
      ok: false,
      code: "TEMPLATE_REQUIRES_PRO",
      error:
        "That template is part of the Pro library. Upgrade to Pro to use it.",
    };
  }

  // Enforce CV cap unless billing is in dry-run mode (see plans.ts for
  // why caps are disabled until launch flag flips).
  if (isBillingEnabled()) {
    const limit = PLANS[plan].cvLimit;
    const count = await prisma.resume.count({ where: { userId: user.id } });
    if (count >= limit) {
      const isFree = plan === "FREE";
      return {
        ok: false,
        code: "CV_LIMIT_REACHED",
        error: isFree
          ? `Free plan is limited to ${limit} CVs. Upgrade to Pro to create up to ${PLANS.PRO_MONTHLY.cvLimit}.`
          : `${PLAN_DISPLAY_NAME[plan]} is limited to ${limit} CVs. Please delete an existing CV to create a new one.`,
      };
    }
  }

  // Two creation paths:
  //   • PNG-parse path (seed present): merge the parsed fields into an
  //     EMPTY skeleton. Sections the parser couldn't extract stay empty —
  //     the user sees only what the PNG actually showed, never dummy text
  //     overlaid on a real import.
  //   • Gallery path (no seed): start from complete, editable SAMPLE
  //     content so the editor opens on the same finished design the
  //     gallery shows. The user edits the text in place. Without this a
  //     fresh CV rendered as empty section boxes, which read as a broken
  //     template next to its fully-populated thumbnail.
  const seeded = seed
    ? mergeSeedIntoSkeleton(EMPTY_CV_DATA, seed)
    : SAMPLE_CV_DATA;

  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      title: "Untitled CV",
      // Phase 4 wired templateSlug as the authoritative column read by
      // the editor + print + admin pipelines. We still write the
      // legacy `template` and `templateKey` columns so dashboards,
      // sitemaps, and dual-writers that haven't migrated yet keep working.
      template,
      templateKey: template,
      templateSlug: template,
      templateTier: tier === "premium" ? "PREMIUM" : "FREE",
      isDraft: true,
      data: seeded as unknown as Prisma.InputJsonValue,
    },
  });
  return { ok: true, id: resume.id };
}

/** Shallow per-section merge. A seed array (e.g. seed.experience) of
 *  length > 0 wholly replaces the skeleton's empty []; objects
 *  (basics) are spread so seed fields override the empty-string
 *  defaults. Sections the parser didn't surface stay empty and the
 *  template hides them at render time. */
function mergeSeedIntoSkeleton(
  skeleton: CVData,
  seed: Partial<CVData>,
): CVData {
  const merged: CVData = { ...skeleton };

  if (seed.basics) {
    merged.basics = { ...skeleton.basics, ...seed.basics };
  }
  if (seed.experience && seed.experience.length > 0) {
    merged.experience = seed.experience.map((e) => ({
      ...e,
      bullets: e.bullets ?? [],
    }));
  }
  if (seed.education && seed.education.length > 0) {
    merged.education = seed.education.map((e) => ({
      ...e,
      startDate: e.startDate ?? "",
      endDate: e.endDate ?? "",
    }));
  }
  if (seed.skills && seed.skills.length > 0) {
    merged.skills = seed.skills;
  }
  if (seed.projects && seed.projects.length > 0) {
    merged.projects = seed.projects;
  }
  if (seed.languages && seed.languages.length > 0) {
    merged.languages = seed.languages;
  }
  if (seed.certifications && seed.certifications.length > 0) {
    merged.certifications = seed.certifications;
  }
  if (seed.interests && seed.interests.length > 0) {
    merged.interests = seed.interests;
  }
  return merged;
}

export async function getResume(id: string) {
  const user = await requireUser();
  const resume = await prisma.resume.findFirst({
    where: { id, userId: user.id },
  });
  return resume;
}

export async function updateResume(
  id: string,
  updates: { title?: string; data?: CVData },
) {
  const user = await requireUser();
  const owned = await prisma.resume.findFirst({
    where: { id, userId: user.id },
    select: { id: true },
  });
  if (!owned) {
    throw new Error("Resume not found");
  }
  // Any save means the user has edited — flip isDraft so /cv/new no longer
  // reuses this row. Always writing false is idempotent (Postgres no-ops
  // when the value is unchanged at storage level).
  const resume = await prisma.resume.update({
    where: { id },
    data: {
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.data !== undefined && {
        data: updates.data as unknown as Prisma.InputJsonValue,
      }),
      isDraft: false,
    },
  });
  revalidatePath(`/cv/${id}/edit`);
  revalidatePath("/dashboard");
  return resume;
}

/**
 * Merge a translated payload into a clone of the source CV. Identity-only
 * fields (name, email, phone, dates, company/school names, URLs) are copied
 * as-is from the source. Translated fields (summary, role/location/bullets,
 * skills, etc.) and sectionLabels overwrite per-index. The new CV gets
 * `data.language` set so the editor and PDF can adapt later (RTL, etc.).
 */
export async function createTranslatedResume(input: {
  sourceId: string;
  translated: TranslatedCV;
  languageCode: LanguageCode;
  languageName: string;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  try {
    const user = await requireUser();
    const source = await prisma.resume.findFirst({
      where: { id: input.sourceId, userId: user.id },
    });
    if (!source) return { ok: false, error: "Resume not found" };

    const sourceData = source.data as unknown as CVData;
    const t = input.translated;

    const mergedData: CVData = {
      ...sourceData,
      basics: {
        ...sourceData.basics,
        role: t.basics.role?.trim() || sourceData.basics?.role || "",
        location:
          t.basics.location?.trim() || sourceData.basics?.location || "",
        summary:
          t.basics.summary?.trim() || sourceData.basics?.summary || "",
      },
      experience: (sourceData.experience ?? []).map((entry, idx) => {
        const tr = t.experience[idx];
        if (!tr) return entry;
        return {
          ...entry,
          role: tr.role?.trim() || entry.role,
          location: tr.location?.trim() || entry.location,
          bullets:
            tr.bullets && tr.bullets.length === (entry.bullets ?? []).length
              ? tr.bullets
              : entry.bullets,
        };
      }),
      education: (sourceData.education ?? []).map((entry, idx) => {
        const tr = t.education[idx];
        if (!tr) return entry;
        return {
          ...entry,
          degree: tr.degree?.trim() || entry.degree,
          location: tr.location?.trim() || entry.location,
          notes: tr.notes?.trim() || entry.notes,
        };
      }),
      skills:
        t.skills.length === (sourceData.skills ?? []).length
          ? t.skills
          : sourceData.skills ?? [],
      projects: sourceData.projects?.map((entry, idx) => {
        const tr = t.projects?.[idx];
        if (!tr) return entry;
        return {
          ...entry,
          description: tr.description?.trim() || entry.description,
        };
      }),
      languages: sourceData.languages?.map((entry, idx) => {
        const tr = t.languages?.[idx];
        if (!tr) return entry;
        return {
          ...entry,
          name: tr.name?.trim() || entry.name,
          level: tr.level?.trim() || entry.level,
        };
      }),
      awards: sourceData.awards?.map((entry, idx) => {
        const tr = t.awards?.[idx];
        if (!tr) return entry;
        return { ...entry, title: tr.title?.trim() || entry.title };
      }),
      certifications: sourceData.certifications?.map((entry, idx) => {
        const tr = t.certifications?.[idx];
        if (!tr) return entry;
        return { ...entry, name: tr.name?.trim() || entry.name };
      }),
      interests:
        t.interests &&
        t.interests.length === (sourceData.interests ?? []).length
          ? t.interests
          : sourceData.interests,
      language: input.languageCode,
      sectionLabels: {
        profile: t.sectionLabels.profile,
        experience: t.sectionLabels.experience,
        education: t.sectionLabels.education,
        skills: t.sectionLabels.skills,
        projects: t.sectionLabels.projects,
        languages: t.sectionLabels.languages,
        awards: t.sectionLabels.awards,
        certifications: t.sectionLabels.certifications,
        interests: t.sectionLabels.interests,
      },
    };

    const copy = await prisma.resume.create({
      data: {
        userId: user.id,
        title: `${source.title} (${input.languageName})`,
        template: source.template,
        templateKey: source.templateKey,
        templateSlug: source.templateSlug,
        isDraft: false,
        data: mergedData as unknown as Prisma.InputJsonValue,
      },
    });

    revalidatePath("/dashboard");
    return { ok: true, id: copy.id };
  } catch (err) {
    console.error("[createTranslatedResume] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      sourceId: input.sourceId,
    });
    return { ok: false, error: "Couldn't save translated CV — try again" };
  }
}

export async function duplicateResume(id: string): Promise<string> {
  const user = await requireUser();
  const source = await prisma.resume.findFirst({
    where: { id, userId: user.id },
  });
  if (!source) throw new Error("Resume not found");
  const copy = await prisma.resume.create({
    data: {
      userId: user.id,
      title: `${source.title} (copy)`,
      template: source.template,
      templateKey: source.templateKey,
      templateSlug: source.templateSlug,
      isDraft: false,
      data: source.data as unknown as Prisma.InputJsonValue,
    },
  });
  revalidatePath("/dashboard");
  return copy.id;
}

export async function listResumes() {
  const user = await requireUser();
  return await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });
}

export async function deleteResume(id: string) {
  const user = await requireUser();
  const owned = await prisma.resume.findFirst({
    where: { id, userId: user.id },
    select: { id: true },
  });
  if (!owned) {
    throw new Error("Resume not found");
  }
  await prisma.resume.delete({
    where: { id },
  });
  revalidatePath("/dashboard");
}
