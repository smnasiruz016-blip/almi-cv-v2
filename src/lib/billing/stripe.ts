import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { priceIdToPlanLabel, type StripePriceId } from "@/lib/billing/plans";
import { checkoutSessionParams } from "@/lib/billing/checkout-params";

let cachedClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (cachedClient) return cachedClient;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.length < 20) {
    throw new Error("STRIPE_SECRET_KEY is missing or invalid");
  }
  // Don't override apiVersion — the SDK pins its own (currently
  // 2026-04-22.dahlia). Pinning a different version against the SDK's
  // type defs causes type errors when the SDK upgrades.
  cachedClient = new Stripe(key, { typescript: true });
  return cachedClient;
}

function getPublicBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ?? "https://almicv.almiworld.com"
  );
}

/**
 * Lazily creates a Stripe customer for the user on first checkout.
 * Subsequent checkouts reuse the same customer record so Stripe
 * dashboards and the Customer Portal stay coherent.
 */
export async function getOrCreateStripeCustomer(input: {
  userId: string;
  email: string;
  name: string;
}): Promise<string> {
  const existing = await prisma.user.findUnique({
    where: { id: input.userId },
    select: { stripeCustomerId: true },
  });
  if (existing?.stripeCustomerId) return existing.stripeCustomerId;

  const stripe = getStripeClient();
  const customer = await stripe.customers.create({
    email: input.email,
    name: input.name,
    metadata: { userId: input.userId },
  });

  await prisma.user.update({
    where: { id: input.userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

export async function createCheckoutSession(input: {
  userId: string;
  email: string;
  name: string;
  priceId: StripePriceId;
  /** Optional same-origin path the user should land on after success.
   * Validated upstream in the API route. When set, Stripe redirects
   * here instead of /account?upgraded=true so the user lands right
   * back where they came from (e.g., /cv/new?template=<slug>). */
  returnTo?: string;
}): Promise<{ url: string }> {
  const planLabel = priceIdToPlanLabel(input.priceId);
  if (!planLabel) {
    // Caller should have validated; defense in depth.
    throw new Error("Unsupported priceId");
  }

  const customerId = await getOrCreateStripeCustomer({
    userId: input.userId,
    email: input.email,
    name: input.name,
  });

  const baseUrl = getPublicBaseUrl();
  // returnTo lands directly. There's a small window where the Stripe
  // webhook hasn't yet flipped the user to Pro by the time the
  // browser redirects — in practice the webhook beats the redirect by
  // a wide margin. If it doesn't, the destination route's tier check
  // re-runs the gate and bounces back to /pricing, which is fine.
  const successPath = input.returnTo
    ? `${input.returnTo}${input.returnTo.includes("?") ? "&" : "?"}upgraded=true`
    : `/account?upgraded=true`;
  const cancelPath = input.returnTo
    ? `/pricing?cancelled=true&return=${encodeURIComponent(input.returnTo)}`
    : `/pricing?cancelled=true`;

  const stripe = getStripeClient();
  // RR-391: no trial for a new subscriber (src/lib/billing/checkout-params.ts)
  const session = await stripe.checkout.sessions.create(
    checkoutSessionParams({ customerId, priceId: input.priceId, userId: input.userId, planLabel, successUrl: `${baseUrl}${successPath}`, cancelUrl: `${baseUrl}${cancelPath}` }),
  );


  if (!session.url) {
    throw new Error("Stripe did not return a Checkout URL");
  }

  return { url: session.url };
}

export async function createCustomerPortalSession(
  stripeCustomerId: string,
): Promise<{ url: string }> {
  const stripe = getStripeClient();
  const baseUrl = getPublicBaseUrl();
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${baseUrl}/account`,
  });
  return { url: session.url };
}
