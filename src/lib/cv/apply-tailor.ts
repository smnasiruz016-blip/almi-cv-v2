"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { updateResume } from "@/lib/resume-actions";
import { saveSnapshot } from "@/lib/cv/snapshots";
import type { CVData } from "@/lib/cv-types";
import type { TailorProposal } from "@/lib/ai/tailor-cv";

export type AcceptedSections = {
  summary: boolean;
  experience: boolean;
  skills: boolean;
};

export type ApplyTailorResult =
  | { ok: true }
  | { ok: false; error: string };

const NOT_FOUND = "Resume not found";
const NOTHING_SELECTED = "Nothing was selected to apply";
const STALE_PROPOSAL =
  "The tailored proposal no longer matches your CV — regenerate it";
const FAILED = "Couldn't apply tailored changes — try again";

function multisetEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const counts = new Map<string, number>();
  for (const s of a) counts.set(s, (counts.get(s) ?? 0) + 1);
  for (const s of b) {
    const n = counts.get(s);
    if (!n) return false;
    counts.set(s, n - 1);
  }
  return true;
}

export async function applyTailor(input: {
  cvId: string;
  tailored: TailorProposal;
  accepted: AcceptedSections;
}): Promise<ApplyTailorResult> {
  try {
    const cvId = (input.cvId ?? "").trim();
    if (!cvId) return { ok: false, error: "CV id is required" };

    const accepted = input.accepted;
    if (!accepted.summary && !accepted.experience && !accepted.skills) {
      return { ok: false, error: NOTHING_SELECTED };
    }

    const user = await requireUser();
    const row = await prisma.resume.findFirst({
      where: { id: cvId, userId: user.id },
      select: { data: true },
    });
    if (!row) return { ok: false, error: NOT_FOUND };

    const current = row.data as unknown as CVData;
    const tailored = input.tailored;

    // Defensive shape checks — tailorCV already validates, but the proposal
    // round-trips through the client so re-verify the invariants we rely on
    // before mutating.
    if (accepted.experience) {
      const expCount = current.experience?.length ?? 0;
      if (tailored.experienceBullets.length !== expCount) {
        return { ok: false, error: STALE_PROPOSAL };
      }
      for (let i = 0; i < expCount; i++) {
        const proposed = tailored.experienceBullets[i];
        const expected = current.experience?.[i];
        if (!proposed || !expected) {
          return { ok: false, error: STALE_PROPOSAL };
        }
        if (proposed.entryId !== `exp-${i}`) {
          return { ok: false, error: STALE_PROPOSAL };
        }
        if (proposed.bullets.length !== (expected.bullets ?? []).length) {
          return { ok: false, error: STALE_PROPOSAL };
        }
      }
    }
    if (accepted.skills) {
      if (!multisetEqual(tailored.skillsOrder, current.skills ?? [])) {
        return { ok: false, error: STALE_PROPOSAL };
      }
    }
    if (accepted.summary && !tailored.summary?.trim()) {
      return { ok: false, error: STALE_PROPOSAL };
    }

    // Snapshot the current CV before any mutation so the user can one-click
    // restore. Composed helper, not in a single transaction — if updateResume
    // later fails, the snapshot still exists and the data is unchanged, which
    // is harmless.
    const snap = await saveSnapshot(cvId, current);
    if (!snap.ok) {
      console.error("[applyTailor] saveSnapshot failed:", snap.error);
      return { ok: false, error: FAILED };
    }

    const merged: CVData = { ...current };

    if (accepted.summary) {
      merged.basics = {
        ...current.basics,
        summary: tailored.summary,
      };
    }

    if (accepted.experience) {
      merged.experience = (current.experience ?? []).map((entry, idx) => {
        const proposed = tailored.experienceBullets[idx];
        return {
          ...entry,
          bullets: proposed.bullets,
        };
      });
    }

    if (accepted.skills) {
      merged.skills = tailored.skillsOrder;
    }

    await updateResume(cvId, { data: merged });

    return { ok: true };
  } catch (err) {
    console.error("[applyTailor] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      cvId: input.cvId,
    });
    return { ok: false, error: FAILED };
  }
}
