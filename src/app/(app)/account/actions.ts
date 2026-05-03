"use server";

import type Stripe from "stripe";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getStripeClient } from "@/lib/billing/stripe";
import { isBillingEnabled, priceIdToPlanLabel } from "@/lib/billing/plans";

export type SyncResult =
  | { ok: true; status: string | null }
  | { ok: false; error: string };

const ACTIVE_STATUSES = new Set(["trialing", "active"]);
const TRIAL_STATUSES = new Set(["trialing"]);

function toDateOrNull(unixSeconds: number | null | undefined): Date | null {
  if (!unixSeconds) return null;
  return new Date(unixSeconds * 1000);
}

/**
 * Admin escape hatch — re-sync the local user record from Stripe in
 * case a webhook was missed. Pulls the user's most recent subscription
 * and writes the same fields the webhook handler would.
 */
export async function syncSubscriptionStatusAction(): Promise<SyncResult> {
  try {
    if (!isBillingEnabled()) {
      return { ok: false, error: "Billing not yet enabled" };
    }
    const user = await requireUser();
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true },
    });
    if (!dbUser?.stripeCustomerId) {
      return { ok: false, error: "No Stripe customer on file" };
    }

    const stripe = getStripeClient();
    const list = await stripe.subscriptions.list({
      customer: dbUser.stripeCustomerId,
      status: "all",
      limit: 1,
    });
    const subscription = list.data[0] as Stripe.Subscription | undefined;

    if (!subscription) {
      // No subscription — clear everything
      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripeSubscriptionId: null,
          subscriptionStatus: null,
          subscriptionPlan: null,
          subscriptionCurrentPeriodEnd: null,
          subscriptionCancelAtPeriodEnd: false,
          trialEndsAt: null,
          subscriptionTier: "FREE",
        },
      });
      revalidatePath("/account");
      return { ok: true, status: null };
    }

    const item = subscription.items.data[0];
    const priceId = item?.price.id;
    const planLabel = priceId ? priceIdToPlanLabel(priceId) : null;
    const periodEndUnix =
      (subscription as Stripe.Subscription & {
        current_period_end?: number;
      }).current_period_end ??
      (item as unknown as { current_period_end?: number } | undefined)
        ?.current_period_end ??
      null;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        subscriptionPlan: planLabel,
        subscriptionCurrentPeriodEnd: toDateOrNull(periodEndUnix),
        subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
        trialEndsAt: TRIAL_STATUSES.has(subscription.status)
          ? toDateOrNull(subscription.trial_end ?? null)
          : null,
        subscriptionTier: ACTIVE_STATUSES.has(subscription.status)
          ? "PREMIUM"
          : "FREE",
      },
    });

    revalidatePath("/account");
    return { ok: true, status: subscription.status };
  } catch (err) {
    console.error("[syncSubscriptionStatusAction] failed:", {
      message: err instanceof Error ? err.message : String(err),
    });
    return { ok: false, error: "Couldn't sync — try again" };
  }
}
