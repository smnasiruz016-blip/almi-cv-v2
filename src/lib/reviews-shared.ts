// Constants and types shared between the logged-in review server action
// (src/lib/reviews.ts, marked "use server") and the public anonymous review
// route handler (src/app/api/public/reviews/route.ts). A "use server" file
// can only export async functions, so plain constants live here.

export const COMMENT_MIN = 10;
export const COMMENT_MAX = 2000;
export const IMPROVEMENT_MAX = 2000;
export const DISPLAY_NAME_MAX = 80;
export const REVIEW_SOURCE_WHITELIST = [
  "almicv",
  "almijob",
  "almisalary",
  "almiworld",
  "ebooks",
  "smoketest",
] as const;
export type ReviewSource = (typeof REVIEW_SOURCE_WHITELIST)[number];
