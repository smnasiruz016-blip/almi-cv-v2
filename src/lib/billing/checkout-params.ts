import type Stripe from "stripe";

/**
 * RR-391 (owner, 7 Nov 2026: no trial, "the new offer from now on") · the Checkout Session for a new
 * subscription, as a pure function so the build can prove it: $12/month from the first day, NO trial of any kind
 * (no trial_period_days, no trial_end, no trial_settings). A trial that is already running is a Stripe
 * subscription of its own and is not touched by this; it runs to its end.
 */
export function checkoutSessionParams(input: {
  customerId: string;
  priceId: string;
  userId: string;
  planLabel: string;
  successUrl: string;
  cancelUrl: string;
}): Stripe.Checkout.SessionCreateParams {
  return {
    mode: "subscription",
    customer: input.customerId,
    line_items: [{ price: input.priceId, quantity: 1 }],
    // The card is taken at checkout and the first $12 is charged then.
    payment_method_collection: "always",
    subscription_data: {
      metadata: { userId: input.userId, plan: input.planLabel },
    },
    metadata: { userId: input.userId, plan: input.planLabel, product: "almi-cv" }, // product = routing key for almi-billing-router
    allow_promotion_codes: true,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
  };
}
