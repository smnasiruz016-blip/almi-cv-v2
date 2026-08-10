#!/usr/bin/env node
/**
 * Assert that the Stripe price AlmiCV actually charges matches the price
 * AlmiCV actually displays.
 *
 * The pricing page, the OG image, the metadata descriptions and ~20 pSEO
 * strings all say "$12/month". None of them can see Stripe. If the configured
 * price object is still the retired $7/month one -- or a $60/year one, or an
 * archived one -- every one of those strings becomes a false price with
 * nothing in the codebase to catch it. This script is that catch.
 *
 * Run directly:        npm run verify:price
 * Runs automatically:  as `prebuild`, whenever STRIPE_SECRET_KEY is present
 *
 * Exit codes:
 *   0  price matches, or the check could not run (no key / no price / Stripe
 *      unreachable / auth failure)
 *   1  price is readable and DOES NOT match -- deploy is blocked
 *
 * A missing key, a missing price ID, or a network/auth failure is deliberately
 * NOT fatal: it must stay possible to build without Stripe credentials. A
 * readable mismatch IS fatal, because that is the exact state that ships a
 * price we do not charge.
 *
 * STRIPE_API_BASE exists so the failure path can be exercised against a stub;
 * it is not used in production.
 */

import { pathToFileURL } from "node:url";

export const EXPECTED = {
  cents: 1200,
  currency: "usd",
  interval: "month",
  intervalCount: 1,
};

/** Pure check -- returns a list of problems. Empty list means the price is good. */
export function checkPrice(price) {
  const problems = [];
  if (price.unit_amount !== EXPECTED.cents) {
    problems.push(
      `amount is ${price.unit_amount} cents, expected ${EXPECTED.cents} ($12.00)`,
    );
  }
  if (price.currency !== EXPECTED.currency) {
    problems.push(`currency is ${price.currency}, expected ${EXPECTED.currency}`);
  }
  if (price.type !== "recurring" || !price.recurring) {
    problems.push(`type is ${price.type}, expected a recurring price`);
  } else {
    if (price.recurring.interval !== EXPECTED.interval) {
      problems.push(
        `interval is ${price.recurring.interval}, expected ${EXPECTED.interval}`,
      );
    }
    if (price.recurring.interval_count !== EXPECTED.intervalCount) {
      problems.push(
        `interval_count is ${price.recurring.interval_count}, expected ${EXPECTED.intervalCount}`,
      );
    }
  }
  if (price.active === false) problems.push("price is archived (active: false)");
  return problems;
}

/** Returns {status: "ok"|"skip"|"fail", message}. Never calls process.exit. */
export async function verify(env = process.env) {
  const key = env.STRIPE_SECRET_KEY;
  const priceId = env.STRIPE_PRICE_ID_MONTHLY;
  const base = env.STRIPE_API_BASE || "https://api.stripe.com";

  if (!key) return { status: "skip", message: "STRIPE_SECRET_KEY not set" };
  if (!priceId) {
    // Not fatal on its own: isBillingEnabled() already returns false without a
    // price, so checkout is off and nothing can be mis-sold.
    return {
      status: "skip",
      message: "STRIPE_PRICE_ID_MONTHLY not set (billing stays disabled)",
    };
  }

  let res;
  try {
    res = await fetch(`${base}/v1/prices/${encodeURIComponent(priceId)}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
  } catch (e) {
    return { status: "skip", message: `could not reach Stripe (${e.message})` };
  }

  if (res.status === 404) {
    return {
      status: "fail",
      message: `Stripe has no price ${priceId} (404) -- wrong ID, or wrong key mode`,
    };
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return {
      status: "skip",
      message: `Stripe returned ${res.status} -- ${body.replace(/\s+/g, " ").slice(0, 120)}`,
    };
  }

  const price = await res.json();
  const problems = checkPrice(price);
  if (problems.length) return { status: "fail", message: problems.join("; ") };

  return {
    status: "ok",
    message:
      `${priceId} is $${(price.unit_amount / 100).toFixed(2)}/` +
      `${price.recurring.interval} ${price.currency.toUpperCase()} ` +
      `(${key.startsWith("sk_live_") ? "live" : "test"} mode)`,
  };
}

// Only run when invoked directly, so the checks above stay importable/testable.
// pathToFileURL, not string-building: on Windows a hand-built "file://C:/..."
// never equals import.meta.url's "file:///C:/...", which would silently turn
// this whole gate into a no-op.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { status, message } = await verify();
  if (status === "fail") {
    console.error(`\n[verify:price] FAILED -- ${message}`);
    console.error(
      "[verify:price] AlmiCV's copy says $12/month. Fix the Stripe price (or " +
        "STRIPE_PRICE_ID_MONTHLY) before deploying, or the site shows a price " +
        "it does not charge.\n",
    );
    process.exitCode = 1;
  } else {
    console.log(`[verify:price] ${status.toUpperCase()} -- ${message}`);
  }
}
