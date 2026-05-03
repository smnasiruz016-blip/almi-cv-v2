import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { isOwner } from "@/lib/owner";
import {
  deleteReview,
  getMarketingOptInStats,
  listAllReviewsForAdmin,
  toggleReviewVisibility,
} from "@/lib/reviews";
import { AdminSubnav } from "../_components/AdminSubnav";
import { ReviewsClient } from "./reviews-client";

export const metadata = {
  title: "Reviews · Admin · AlmiCV",
};

export default async function ReviewsAdminPage() {
  const user = await requireUser();
  if (!isOwner(user.email)) redirect("/dashboard");

  const [reviewsResult, statsResult] = await Promise.all([
    listAllReviewsForAdmin(),
    getMarketingOptInStats(),
  ]);

  const reviews = reviewsResult.ok ? reviewsResult.reviews : [];
  const totalOptedIn = statsResult.ok ? statsResult.totalOptedIn : 0;
  const totalUsers = statsResult.ok ? statsResult.totalUsers : 0;
  const loadError = !reviewsResult.ok
    ? reviewsResult.error
    : !statsResult.ok
      ? statsResult.error
      : null;

  return (
    <div className="space-y-6">
      <AdminSubnav active="reviews" />
      <ReviewsClient
        reviews={reviews}
        totalOptedIn={totalOptedIn}
        totalUsers={totalUsers}
        loadError={loadError}
        toggleAction={toggleReviewVisibility}
        deleteAction={deleteReview}
      />
    </div>
  );
}
