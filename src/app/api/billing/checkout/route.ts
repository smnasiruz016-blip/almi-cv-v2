import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  isBillingEnabled,
  priceIdToPlanLabel,
  STRIPE_PRICE_MONTHLY,
} from "@/lib/billing/plans";
import { createCheckoutSession } from "@/lib/billing/stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  if (!isBillingEnabled()) {
    return NextResponse.json(
      { error: "Billing not yet enabled" },
      { status: 503 },
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Sign in to upgrade" },
      { status: 401 },
    );
  }

  let body: { plan?: string; returnTo?: string };
  try {
    body = (await request.json()) as {
      plan?: string;
      returnTo?: string;
    };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // The browser names a PLAN, never a Stripe price ID — the server resolves it.
  // This is the family pattern (see almi-prep-v2) and it is what lets the price
  // live in a server-only env var: the client has no price ID to leak, to go
  // stale, or to swap for the retired $60/year one.
  const priceId = body.plan === "monthly" ? STRIPE_PRICE_MONTHLY : "";
  if (!priceIdToPlanLabel(priceId)) {
    return NextResponse.json(
      { error: "Invalid plan selection" },
      { status: 400 },
    );
  }

  // returnTo must be a same-origin path (`/cv/new?...`, etc). Reject
  // anything that could escape to another origin — protocol-relative
  // URLs ("//evil.com"), schemes, and absolute URLs are dropped here
  // before they reach Stripe's success_url.
  const rawReturn = (body.returnTo ?? "").trim();
  const safeReturn =
    rawReturn.startsWith("/") &&
    !rawReturn.startsWith("//") &&
    !rawReturn.includes("://")
      ? rawReturn
      : undefined;

  try {
    const result = await createCheckoutSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      priceId,
      returnTo: safeReturn,
    });
    return NextResponse.json({ url: result.url });
  } catch (err) {
    console.error("[billing/checkout] failed:", {
      message: err instanceof Error ? err.message : String(err),
      userId: user.id,
    });
    return NextResponse.json(
      { error: "Couldn't start checkout — try again" },
      { status: 500 },
    );
  }
}
