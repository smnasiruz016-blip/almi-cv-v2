import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { isOwner } from "@/lib/owner";
import {
  deleteReview,
  listAllReviewsForAdmin,
  toggleReviewVisibility,
} from "@/lib/reviews";
import {
  deleteSubscriber,
  getUnifiedEmailListStats,
  listAllSubscribersForAdmin,
} from "@/lib/subscribers";
import { AdminSubnav } from "../_components/AdminSubnav";
import { ReviewsClient } from "./reviews-client";

export const metadata = {
  title: "Reviews · Admin · AlmiCV",
};

export default async function ReviewsAdminPage() {
  const user = await requireUser();
  if (!isOwner(user.email)) redirect("/dashboard");

  const [reviewsResult, statsResult, subsResult] = await Promise.all([
    listAllReviewsForAdmin(),
    getUnifiedEmailListStats(),
    listAllSubscribersForAdmin(),
  ]);

  const reviews = reviewsResult.ok ? reviewsResult.reviews : [];
  const stats = statsResult.ok
    ? {
        usersOptedIn: statsResult.usersOptedIn,
        subscribers: statsResult.subscribers,
        overlap: statsResult.overlap,
        unique: statsResult.unique,
      }
    : { usersOptedIn: 0, subscribers: 0, overlap: 0, unique: 0 };
  const subscribers = subsResult.ok ? subsResult.subscribers.slice(0, 20) : [];
  const loadError = !reviewsResult.ok
    ? reviewsResult.error
    : !statsResult.ok
      ? statsResult.error
      : !subsResult.ok
        ? subsResult.error
        : null;

  return (
    <div className="space-y-6">
      <AdminSubnav active="reviews" />
      <ReviewsClient
        reviews={reviews}
        stats={stats}
        subscribers={subscribers}
        loadError={loadError}
        toggleAction={toggleReviewVisibility}
        deleteAction={deleteReview}
        deleteSubscriberAction={deleteSubscriber}
      />
    </div>
  );
}
