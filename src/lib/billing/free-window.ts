// Starts the 3-day no-card clock, exactly once, on FIRST USE.
//
// "First use" on AlmiCV means the user's FIRST CV row being created. Not
// signup, not login, not a dashboard or template-gallery view -- browsing a
// gallery is not use, and a bot or link preview must never burn a day.
//
// It belongs next to the resume row creation and NOWHERE ELSE. In particular it
// must not live in cv/new/page.tsx: that page redirects to an existing empty CV
// when the user already has one rather than creating a second, so a write there
// would fire on a reuse-redirect that created nothing.
//
// Race-safe and idempotent by construction: `updateMany` with
// freeAccessStartedAt: null in the WHERE means two concurrent creates cannot
// both win -- the second matches zero rows and is a no-op.

import { prisma } from "@/lib/db";

export async function startFreeWindowIfUnstarted(userId: string): Promise<void> {
  await prisma.user.updateMany({
    where: { id: userId, freeAccessStartedAt: null },
    data: { freeAccessStartedAt: new Date() },
  });
}
