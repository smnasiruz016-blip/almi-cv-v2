"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import type { SupportedLanguage, TranslatedCV } from "@/lib/ai/translate-cv-shared";

export async function createTranslatedResume(params: {
  sourceId: string;
  translated: TranslatedCV;
  languageCode: SupportedLanguage;
  languageName: string;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  try {
    const session = await requireAuth();
    if (!session?.user?.id) {
      return { ok: false, error: "Unauthorized" };
    }

    const { sourceId, translated: t, languageCode, languageName } = params;

    const sourceResume = await prisma.resume.findUnique({
      where: { id: sourceId },
    });

    if (!sourceResume || sourceResume.userId !== session.user.id) {
      return { ok: false, error: "Source CV not found" };
    }

    const sourceData: any = (sourceResume.data as any) || {};
    const expList: any[] = Array.isArray(t?.experience) ? (t.experience as any[]) : [];
    const eduList: any[] = Array.isArray(t?.education) ? (t.education as any[]) : [];

    const mergedData: any = {
      ...sourceData,
      basics: {
        ...sourceData.basics,
        ...(t?.basics || {}),
        fullName: sourceData.basics?.fullName || t?.basics?.fullName || "Your Name",
        summary: t?.basics?.summary ?? sourceData.basics?.summary ?? "",
      },
      experience: (sourceData.experience ?? []).map((entry: any, idx: number) => {
        const tr = expList[idx];
        if (!tr) return entry;
        return {
          ...entry,
          role: tr.role || entry.role,
          company: tr.company || entry.company,
          bullets: tr.bullets || tr.achievements || entry.bullets || [],
        };
      }),
      education: (sourceData.education ?? []).map((entry: any, idx: number) => {
        const tr = eduList[idx];
        if (!tr) return entry;
        return {
          ...entry,
          degree: tr.degree || entry.degree,
          institution: tr.institution || entry.institution,
        };
      }),
      skills: Array.isArray(t?.skills) && t.skills.length > 0 ? t.skills : sourceData.skills,
      certifications: Array.isArray(t?.certifications) && t.certifications.length > 0 ? t.certifications : sourceData.certifications,
      languages: Array.isArray(t?.languages) && t.languages.length > 0 ? t.languages : sourceData.languages,
      labels: {
        ...(sourceData.labels || {}),
        ...(t?.labels || {}),
      },
    };

    const newTitle = `${sourceResume.title || "My CV"} (${languageName})`;

    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: newTitle,
        targetRole: sourceResume.targetRole,
        template: sourceResume.template,
        theme: sourceResume.theme,
        typography: sourceResume.typography,
        data: mergedData,
      },
    });

    return { ok: true, id: newResume.id };
  } catch (error: any) {
    console.error("[createTranslatedResume] failed:", error);
    return { ok: false, error: error?.message || "Failed to create translated resume" };
  }
}
