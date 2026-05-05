// Constants and types shared between the logged-in newsletter server action
// (src/lib/subscribers.ts, marked "use server") and the public cross-product
// route handler (src/app/api/newsletter/route.ts). A "use server" file can
// only export async functions, so plain constants live here.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const RATE_WINDOW_MS = 60 * 60 * 1000; // 1h
export const RATE_LIMIT_PER_IP = 5;
export const NEWSLETTER_SOURCE_WHITELIST = [
  "homepage_footer",
  "almicv",
  "almijob",
  "almisalary",
  "almiworld",
  "ebooks",
  "smoketest",
] as const;
export type NewsletterSource = (typeof NEWSLETTER_SOURCE_WHITELIST)[number];
