"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import type { CVData } from "@/lib/cv-types";

export type SnapshotResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const NOT_FOUND = "Resume not found";
const NO_SNAPSHOT = "No snapshot available";
const FAILED = "Couldn't complete that — try again";

async function ownedResumeId(resumeId: string): Promise<string | null> {
  const user = await requireUser();
  const owned = await prisma.resume.findFirst({
    where: { id: resumeId, userId: user.id },
    select: { id: true },
  });
  return owned?.id ?? null;
}

export async function saveSnapshot(
  resumeId: string,
  snapshot: CVData,
): Promise<SnapshotResult<{ snapshotAt: Date }>> {
  try {
    const id = await ownedResumeId(resumeId);
    if (!id) return { ok: false, error: NOT_FOUND };

    const now = new Date();
    await prisma.resume.update({
      where: { id },
      data: {
        lastSnapshot: snapshot as unknown as Prisma.InputJsonValue,
        lastSnapshotAt: now,
      },
    });
    return { ok: true, data: { snapshotAt: now } };
  } catch (err) {
    console.error("[saveSnapshot] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      resumeId,
    });
    return { ok: false, error: FAILED };
  }
}

export async function getSnapshot(
  resumeId: string,
): Promise<
  SnapshotResult<{ snapshot: CVData; snapshotAt: Date } | null>
> {
  try {
    const user = await requireUser();
    const row = await prisma.resume.findFirst({
      where: { id: resumeId, userId: user.id },
      select: { lastSnapshot: true, lastSnapshotAt: true },
    });
    if (!row) return { ok: false, error: NOT_FOUND };
    if (!row.lastSnapshot || !row.lastSnapshotAt) {
      return { ok: true, data: null };
    }
    return {
      ok: true,
      data: {
        snapshot: row.lastSnapshot as unknown as CVData,
        snapshotAt: row.lastSnapshotAt,
      },
    };
  } catch (err) {
    console.error("[getSnapshot] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      resumeId,
    });
    return { ok: false, error: FAILED };
  }
}

export async function restoreSnapshot(
  resumeId: string,
): Promise<SnapshotResult<{ restored: true }>> {
  try {
    const user = await requireUser();
    const row = await prisma.resume.findFirst({
      where: { id: resumeId, userId: user.id },
      select: { id: true, lastSnapshot: true },
    });
    if (!row) return { ok: false, error: NOT_FOUND };
    if (!row.lastSnapshot) return { ok: false, error: NO_SNAPSHOT };

    await prisma.resume.update({
      where: { id: row.id },
      data: {
        data: row.lastSnapshot as unknown as Prisma.InputJsonValue,
        lastSnapshot: Prisma.DbNull,
        lastSnapshotAt: null,
      },
    });
    revalidatePath(`/cv/${resumeId}/edit`);
    revalidatePath("/dashboard");
    return { ok: true, data: { restored: true } };
  } catch (err) {
    console.error("[restoreSnapshot] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      resumeId,
    });
    return { ok: false, error: FAILED };
  }
}
