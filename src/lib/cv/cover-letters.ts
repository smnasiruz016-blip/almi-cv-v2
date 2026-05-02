"use server";

import { revalidatePath } from "next/cache";
import type { CoverLetter } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import type { CoverLetterTone } from "@/lib/ai/generate-cover-letter";

export type CoverLetterResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const NOT_FOUND = "Cover letter not found";
const RESUME_NOT_FOUND = "Resume not found";
const FAILED = "Couldn't complete that — try again";

const MAX_TITLE = 200;
const MAX_JD = 5000;
const MAX_MANAGER = 100;
const MAX_BODY = 12000;

function clampTone(value: unknown): CoverLetterTone {
  return value === "formal" || value === "conversational"
    ? value
    : "confident";
}

async function ensureUserOwnsResume(
  resumeId: string,
): Promise<string | null> {
  const user = await requireUser();
  const owned = await prisma.resume.findFirst({
    where: { id: resumeId, userId: user.id },
    select: { id: true },
  });
  return owned?.id ?? null;
}

export async function createCoverLetter(input: {
  cvId: string;
  title: string;
  jobDescription: string;
  hiringManager?: string;
  tone: CoverLetterTone;
  body: string;
}): Promise<CoverLetterResult<{ id: string }>> {
  try {
    const cvId = (input.cvId ?? "").trim();
    const title = (input.title ?? "").trim().slice(0, MAX_TITLE);
    const jobDescription = (input.jobDescription ?? "").trim();
    const hiringManager = (input.hiringManager ?? "").trim();
    const body = (input.body ?? "").trim();
    const tone = clampTone(input.tone);

    if (!cvId) return { ok: false, error: "CV id is required" };
    if (!title) return { ok: false, error: "Title is required" };
    if (!jobDescription) {
      return { ok: false, error: "Job description is required" };
    }
    if (jobDescription.length > MAX_JD) {
      return { ok: false, error: "Job description is too long" };
    }
    if (hiringManager.length > MAX_MANAGER) {
      return { ok: false, error: "Hiring manager name is too long" };
    }
    if (!body) return { ok: false, error: "Body is required" };
    if (body.length > MAX_BODY) {
      return { ok: false, error: "Body is too long" };
    }

    const ownedId = await ensureUserOwnsResume(cvId);
    if (!ownedId) return { ok: false, error: RESUME_NOT_FOUND };

    const created = await prisma.coverLetter.create({
      data: {
        resumeId: ownedId,
        title,
        jobDescription,
        hiringManager: hiringManager || null,
        tone,
        body,
      },
      select: { id: true },
    });

    revalidatePath(`/cv/${ownedId}/cover-letters`);
    return { ok: true, data: { id: created.id } };
  } catch (err) {
    console.error("[createCoverLetter] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      cvId: input.cvId,
    });
    return { ok: false, error: FAILED };
  }
}

export async function listCoverLetters(
  cvId: string,
): Promise<CoverLetterResult<CoverLetter[]>> {
  try {
    const id = (cvId ?? "").trim();
    if (!id) return { ok: false, error: "CV id is required" };

    const ownedId = await ensureUserOwnsResume(id);
    if (!ownedId) return { ok: false, error: RESUME_NOT_FOUND };

    const items = await prisma.coverLetter.findMany({
      where: { resumeId: ownedId },
      orderBy: { updatedAt: "desc" },
    });
    return { ok: true, data: items };
  } catch (err) {
    console.error("[listCoverLetters] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      cvId,
    });
    return { ok: false, error: FAILED };
  }
}

export async function getCoverLetter(
  id: string,
): Promise<CoverLetterResult<CoverLetter>> {
  try {
    const coverLetterId = (id ?? "").trim();
    if (!coverLetterId) return { ok: false, error: "Id is required" };

    const user = await requireUser();
    const item = await prisma.coverLetter.findFirst({
      where: {
        id: coverLetterId,
        resume: { userId: user.id },
      },
    });
    if (!item) return { ok: false, error: NOT_FOUND };
    return { ok: true, data: item };
  } catch (err) {
    console.error("[getCoverLetter] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      id,
    });
    return { ok: false, error: FAILED };
  }
}

export async function updateCoverLetter(
  id: string,
  patch: {
    title?: string;
    body?: string;
    hiringManager?: string | null;
  },
): Promise<CoverLetterResult<{ id: string }>> {
  try {
    const coverLetterId = (id ?? "").trim();
    if (!coverLetterId) return { ok: false, error: "Id is required" };

    const user = await requireUser();
    const existing = await prisma.coverLetter.findFirst({
      where: {
        id: coverLetterId,
        resume: { userId: user.id },
      },
      select: { id: true, resumeId: true },
    });
    if (!existing) return { ok: false, error: NOT_FOUND };

    const data: {
      title?: string;
      body?: string;
      hiringManager?: string | null;
    } = {};

    if (patch.title !== undefined) {
      const next = patch.title.trim();
      if (!next) return { ok: false, error: "Title cannot be empty" };
      if (next.length > MAX_TITLE) {
        return { ok: false, error: "Title is too long" };
      }
      data.title = next;
    }
    if (patch.body !== undefined) {
      const next = patch.body.trim();
      if (!next) return { ok: false, error: "Body cannot be empty" };
      if (next.length > MAX_BODY) {
        return { ok: false, error: "Body is too long" };
      }
      data.body = next;
    }
    if (patch.hiringManager !== undefined) {
      if (patch.hiringManager === null) {
        data.hiringManager = null;
      } else {
        const next = patch.hiringManager.trim();
        if (next.length > MAX_MANAGER) {
          return { ok: false, error: "Hiring manager name is too long" };
        }
        data.hiringManager = next || null;
      }
    }

    if (Object.keys(data).length === 0) {
      return { ok: true, data: { id: existing.id } };
    }

    await prisma.coverLetter.update({
      where: { id: existing.id },
      data,
    });

    revalidatePath(`/cv/${existing.resumeId}/cover-letters`);
    revalidatePath(`/cv/${existing.resumeId}/cover-letters/${existing.id}`);
    return { ok: true, data: { id: existing.id } };
  } catch (err) {
    console.error("[updateCoverLetter] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      id,
    });
    return { ok: false, error: FAILED };
  }
}

export async function deleteCoverLetter(
  id: string,
): Promise<CoverLetterResult<{ id: string }>> {
  try {
    const coverLetterId = (id ?? "").trim();
    if (!coverLetterId) return { ok: false, error: "Id is required" };

    const user = await requireUser();
    const existing = await prisma.coverLetter.findFirst({
      where: {
        id: coverLetterId,
        resume: { userId: user.id },
      },
      select: { id: true, resumeId: true },
    });
    if (!existing) return { ok: false, error: NOT_FOUND };

    await prisma.coverLetter.delete({ where: { id: existing.id } });

    revalidatePath(`/cv/${existing.resumeId}/cover-letters`);
    return { ok: true, data: { id: existing.id } };
  } catch (err) {
    console.error("[deleteCoverLetter] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      id,
    });
    return { ok: false, error: FAILED };
  }
}
