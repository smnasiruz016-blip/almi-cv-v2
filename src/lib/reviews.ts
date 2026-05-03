"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isOwner } from "@/lib/owner";

type Result<T = undefined> =
  | (T extends undefined ? { ok: true } : { ok: true } & T)
  | { ok: false; error: string };

const COMMENT_MIN = 10;
const COMMENT_MAX = 2000;
const IMPROVEMENT_MAX = 2000;
const DISPLAY_NAME_MAX = 80;

async function ownerGate(): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await requireUser();
  if (!isOwner(user.email)) return { ok: false, error: "Unauthorized" };
  return { ok: true };
}

export async function submitOrUpdateReview(input: {
  rating: number;
  comment: string;
  improvement?: string;
  displayName?: string;
  marketingOptIn: boolean;
}): Promise<Result<{ reviewId: string }>> {
  const user = await requireUser();

  const rating = Math.floor(input.rating);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "Rating must be between 1 and 5 stars" };
  }
  const comment = (input.comment ?? "").trim();
  if (comment.length < COMMENT_MIN) {
    return {
      ok: false,
      error: `Please share at least ${COMMENT_MIN} characters of feedback`,
    };
  }
  if (comment.length > COMMENT_MAX) {
    return { ok: false, error: `Comment must be ${COMMENT_MAX} characters or fewer` };
  }
  const improvementRaw = (input.improvement ?? "").trim();
  if (improvementRaw.length > IMPROVEMENT_MAX) {
    return {
      ok: false,
      error: `Improvement note must be ${IMPROVEMENT_MAX} characters or fewer`,
    };
  }
  const displayNameRaw = (input.displayName ?? "").trim();
  if (displayNameRaw.length > DISPLAY_NAME_MAX) {
    return {
      ok: false,
      error: `Display name must be ${DISPLAY_NAME_MAX} characters or fewer`,
    };
  }
  if (typeof input.marketingOptIn !== "boolean") {
    return { ok: false, error: "Marketing opt-in is required" };
  }

  const improvement = improvementRaw.length > 0 ? improvementRaw : null;
  const displayName = displayNameRaw.length > 0 ? displayNameRaw : null;

  const existing = await prisma.review.findFirst({
    where: { userId: user.id },
    select: { id: true },
  });

  let reviewId: string;
  if (existing) {
    const updated = await prisma.review.update({
      where: { id: existing.id },
      data: { rating, comment, improvement, displayName },
      select: { id: true },
    });
    reviewId = updated.id;
  } else {
    const created = await prisma.review.create({
      data: {
        userId: user.id,
        rating,
        comment,
        improvement,
        displayName,
        showOnSite: false,
      },
      select: { id: true },
    });
    reviewId = created.id;
  }

  // Marketing opt-in is tracked on User, not Review — opt-in is a per-user
  // commitment, not per-review. Updating it here keeps the form's checkbox as
  // the canonical opt-in surface for now (Task L2 will add a public widget).
  await prisma.user.update({
    where: { id: user.id },
    data: {
      marketingOptIn: input.marketingOptIn,
      marketingOptInAt: input.marketingOptIn ? new Date() : null,
    },
  });

  revalidatePath("/account");
  revalidatePath("/admin/reviews");
  return { ok: true, reviewId };
}

export type MyReviewPayload = {
  review: {
    id: string;
    rating: number;
    comment: string;
    improvement: string | null;
    displayName: string | null;
    showOnSite: boolean;
    createdAt: string;
  } | null;
  marketingOptIn: boolean;
  defaultDisplayName: string;
};

export async function getMyReview(): Promise<Result<MyReviewPayload>> {
  const user = await requireUser();
  const [review, dbUser] = await Promise.all([
    prisma.review.findFirst({
      where: { userId: user.id },
      select: {
        id: true,
        rating: true,
        comment: true,
        improvement: true,
        displayName: true,
        showOnSite: true,
        createdAt: true,
      },
    }),
    prisma.user.findUnique({
      where: { id: user.id },
      select: { marketingOptIn: true },
    }),
  ]);

  return {
    ok: true,
    review: review
      ? {
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          improvement: review.improvement,
          displayName: review.displayName,
          showOnSite: review.showOnSite,
          createdAt: review.createdAt.toISOString(),
        }
      : null,
    marketingOptIn: dbUser?.marketingOptIn ?? false,
    defaultDisplayName: user.name,
  };
}

export type AdminReviewRow = {
  id: string;
  rating: number;
  comment: string;
  improvement: string | null;
  displayName: string | null;
  showOnSite: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    marketingOptIn: boolean;
  };
};

export async function listAllReviewsForAdmin(): Promise<
  Result<{ reviews: AdminReviewRow[] }>
> {
  const gate = await ownerGate();
  if (!gate.ok) return gate;

  const rows = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, email: true, name: true, marketingOptIn: true },
      },
    },
  });

  const reviews: AdminReviewRow[] = rows.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    improvement: r.improvement,
    displayName: r.displayName,
    showOnSite: r.showOnSite,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    user: {
      id: r.user.id,
      email: r.user.email,
      name: r.user.name,
      marketingOptIn: r.user.marketingOptIn,
    },
  }));

  return { ok: true, reviews };
}

export async function toggleReviewVisibility(input: {
  reviewId: string;
}): Promise<Result<{ showOnSite: boolean }>> {
  const gate = await ownerGate();
  if (!gate.ok) return gate;

  const current = await prisma.review.findUnique({
    where: { id: input.reviewId },
    select: { showOnSite: true },
  });
  if (!current) return { ok: false, error: "Review not found" };

  const updated = await prisma.review.update({
    where: { id: input.reviewId },
    data: { showOnSite: !current.showOnSite },
    select: { showOnSite: true },
  });

  revalidatePath("/admin/reviews");
  return { ok: true, showOnSite: updated.showOnSite };
}

export async function deleteReview(input: {
  reviewId: string;
}): Promise<Result> {
  const gate = await ownerGate();
  if (!gate.ok) return gate;

  await prisma.review.delete({ where: { id: input.reviewId } });
  revalidatePath("/admin/reviews");
  return { ok: true };
}

export async function getMarketingOptInStats(): Promise<
  Result<{ totalOptedIn: number; totalUsers: number }>
> {
  const gate = await ownerGate();
  if (!gate.ok) return gate;

  const [totalOptedIn, totalUsers] = await Promise.all([
    prisma.user.count({ where: { marketingOptIn: true } }),
    prisma.user.count(),
  ]);

  return { ok: true, totalOptedIn, totalUsers };
}

export type MarketingExportRow = {
  email: string;
  name: string;
  optedInAt: string | null;
};

export async function exportMarketingEmailsCSV(): Promise<
  Result<{ rows: MarketingExportRow[] }>
> {
  const gate = await ownerGate();
  if (!gate.ok) return gate;

  const users = await prisma.user.findMany({
    where: { marketingOptIn: true },
    select: { email: true, name: true, marketingOptInAt: true },
    orderBy: { marketingOptInAt: "desc" },
  });

  const rows: MarketingExportRow[] = users.map((u) => ({
    email: u.email,
    name: u.name,
    optedInAt: u.marketingOptInAt?.toISOString() ?? null,
  }));

  return { ok: true, rows };
}

export type PublicReview = {
  id: string;
  rating: number;
  comment: string;
  displayName: string;
  createdAt: string;
};

export async function getPublicReviews(): Promise<
  Result<{ reviews: PublicReview[] }>
> {
  // No auth — this is the data source for the future public testimonials
  // section. Only showOnSite=true reviews are exposed.
  const rows = await prisma.review.findMany({
    where: { showOnSite: true },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      user: { select: { name: true } },
    },
  });

  const reviews: PublicReview[] = rows.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    displayName: r.displayName ?? r.user.name,
    createdAt: r.createdAt.toISOString(),
  }));

  return { ok: true, reviews };
}
