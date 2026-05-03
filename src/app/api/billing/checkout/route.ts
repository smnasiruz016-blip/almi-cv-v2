import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  isBillingEnabled,
  priceIdToPlanLabel,
  type StripePriceId,
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

  let body: { priceId?: string };
  try {
    body = (await request.json()) as { priceId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const priceId = (body.priceId ?? "").trim();
  if (!priceId || !priceIdToPlanLabel(priceId)) {
    return NextResponse.json(
      { error: "Invalid plan selection" },
      { status: 400 },
    );
  }

  try {
    const result = await createCheckoutSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      priceId: priceId as StripePriceId,
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
