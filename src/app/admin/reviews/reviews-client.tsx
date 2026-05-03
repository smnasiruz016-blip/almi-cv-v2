"use client";

import { useState, useTransition } from "react";
import { Download, Loader2, Mail, Star, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/Toast";
import type { AdminReviewRow } from "@/lib/reviews";

type ToggleResult =
  | { ok: true; showOnSite: boolean }
  | { ok: false; error: string };
type DeleteResult = { ok: true } | { ok: false; error: string };

type Props = {
  reviews: AdminReviewRow[];
  totalOptedIn: number;
  totalUsers: number;
  loadError: string | null;
  toggleAction: (input: { reviewId: string }) => Promise<ToggleResult>;
  deleteAction: (input: { reviewId: string }) => Promise<DeleteResult>;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StarRow({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center" aria-label={`${value} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${
            n <= value ? "fill-coral text-coral" : "text-plum-faint"
          }`}
        />
      ))}
    </span>
  );
}

export function ReviewsClient({
  reviews: initialReviews,
  totalOptedIn,
  totalUsers,
  loadError,
  toggleAction,
  deleteAction,
}: Props) {
  const showToast = useToast();
  const [pending, startTransition] = useTransition();
  const [reviews, setReviews] = useState(initialReviews);
  const [deleteTarget, setDeleteTarget] = useState<AdminReviewRow | null>(null);

  const handleToggle = (row: AdminReviewRow) => {
    startTransition(async () => {
      const r = await toggleAction({ reviewId: row.id });
      if (r.ok) {
        setReviews((prev) =>
          prev.map((p) =>
            p.id === row.id ? { ...p, showOnSite: r.showOnSite } : p,
          ),
        );
        showToast(
          r.showOnSite ? "Review now visible on site" : "Review hidden",
        );
      } else {
        showToast(r.error, "error");
      }
    });
  };

  const handleDelete = (row: AdminReviewRow) => {
    startTransition(async () => {
      const r = await deleteAction({ reviewId: row.id });
      if (r.ok) {
        setReviews((prev) => prev.filter((p) => p.id !== row.id));
        setDeleteTarget(null);
        showToast(`Deleted review from ${row.user.email}`);
      } else {
        showToast(r.error, "error");
      }
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl text-plum">📝 Reviews & Email List</h1>
        <p className="mt-1 text-sm text-plum-soft">
          Moderate user reviews and export the marketing email list for launch
          comms.
        </p>
      </header>

      {loadError && (
        <div className="rounded-xl border border-coral/30 bg-coral-soft/40 px-4 py-3 text-sm text-coral-deep">
          {loadError}
        </div>
      )}

      {/* SECTION A — Email list */}
      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="inline-flex items-center gap-2 text-base font-semibold text-plum">
              <Mail className="h-4 w-4 text-coral" />
              Marketing Email List
            </h2>
            <p className="mt-2 text-sm text-plum">
              <span className="font-display text-2xl font-medium">
                {totalOptedIn}
              </span>{" "}
              <span className="text-plum-soft">
                {totalOptedIn === 1 ? "user" : "users"} opted in to product
                updates
                {totalUsers > 0 && (
                  <> · {Math.round((totalOptedIn / totalUsers) * 100)}% of {totalUsers} total users</>
                )}
              </span>
            </p>
            <p className="mt-2 text-xs text-plum-faint">
              Use this list for launch announcements and product updates.
              Re-export anytime — the file always reflects the current opted-in
              set.
            </p>
          </div>
          <a
            href="/admin/reviews/export-emails"
            className="inline-flex items-center gap-2 rounded-pill bg-coral px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </a>
        </div>
      </section>

      {/* SECTION B — Reviews */}
      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <h2 className="text-base font-semibold text-plum">All Reviews</h2>
        {reviews.length === 0 ? (
          <p className="mt-4 text-sm text-plum-soft">
            No reviews yet. They&apos;ll appear here as users submit.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-plum/10 text-xs uppercase tracking-wide text-plum-faint">
                  <th className="py-2 pr-3 font-medium">Date</th>
                  <th className="py-2 pr-3 font-medium">Rating</th>
                  <th className="py-2 pr-3 font-medium">User</th>
                  <th className="py-2 pr-3 font-medium">Comment</th>
                  <th className="py-2 pr-3 font-medium">Improvement</th>
                  <th className="py-2 pr-3 font-medium">Show on site</th>
                  <th className="py-2 pr-0 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((row) => {
                  const display = row.displayName ?? row.user.name;
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-plum/5 align-top"
                    >
                      <td className="py-3 pr-3 text-xs text-plum-soft">
                        {formatDate(row.createdAt)}
                      </td>
                      <td className="py-3 pr-3">
                        <StarRow value={row.rating} />
                      </td>
                      <td className="py-3 pr-3">
                        <div className="font-medium text-plum">{display}</div>
                        <div className="inline-flex items-center gap-1 text-xs text-plum-soft">
                          {row.user.email}
                          {row.user.marketingOptIn && (
                            <span title="Opted in to marketing">📧</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-3 max-w-sm">
                        <p className="whitespace-pre-wrap text-plum">
                          {row.comment}
                        </p>
                      </td>
                      <td className="py-3 pr-3 max-w-xs">
                        {row.improvement ? (
                          <p className="whitespace-pre-wrap text-plum-soft">
                            {row.improvement}
                          </p>
                        ) : (
                          <span className="text-plum-faint">—</span>
                        )}
                      </td>
                      <td className="py-3 pr-3">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={row.showOnSite}
                          onClick={() => handleToggle(row)}
                          disabled={pending}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60 ${
                            row.showOnSite ? "bg-coral" : "bg-plum/20"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              row.showOnSite
                                ? "translate-x-[18px]"
                                : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="py-3 pr-0 text-right">
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(row)}
                          disabled={pending}
                          className="inline-flex items-center gap-1 rounded-md border border-plum/15 px-2 py-1 text-xs font-medium text-plum-soft transition-colors hover:border-coral-deep/40 hover:text-coral-deep disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Modal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Delete this review?"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-plum">
            This permanently removes the review from{" "}
            <span className="font-semibold">{deleteTarget?.user.email}</span>.
            They can submit a new review afterwards. The user&apos;s account
            and marketing opt-in are not affected.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-pill border border-plum/15 bg-white px-4 py-2 text-sm font-medium text-plum-soft transition-colors hover:bg-cream-soft"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-pill bg-coral-deep px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete review
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
