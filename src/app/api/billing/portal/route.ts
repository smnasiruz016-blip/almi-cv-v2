import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { isBillingEnabled } from "@/lib/billing/plans";
import { createCustomerPortalSession } from "@/lib/billing/stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(): Promise<NextResponse> {
  if (!isBillingEnabled()) {
    return NextResponse.json(
      { error: "Billing not yet enabled" },
      { status: 503 },
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  }

  const row = await prisma.user.findUnique({
    where: { id: user.id },
    select: { stripeCustomerId: true },
  });
  if (!row?.stripeCustomerId) {
    return NextResponse.json(
      { error: "No subscription on file" },
      { status: 400 },
    );
  }

  try {
    const result = await createCustomerPortalSession(row.stripeCustomerId);
    return NextResponse.json({ url: result.url });
  } catch (err) {
    console.error("[billing/portal] failed:", {
      message: err instanceof Error ? err.message : String(err),
      userId: user.id,
    });
    return NextResponse.json(
      { error: "Couldn't open billing portal — try again" },
      { status: 500 },
    );
  }
}
