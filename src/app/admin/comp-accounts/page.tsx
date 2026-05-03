import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isOwner } from "@/lib/owner";
import { isProActive } from "@/lib/billing/plans";
import {
  listCompAccounts,
  grantCompPro,
  revokeCompPro,
  extendCompPro,
} from "@/lib/billing/comp-accounts";
import { CompAccountsClient } from "./comp-accounts-client";

const FOUNDER_DOGFOOD_DAYS = 90;

export const metadata = {
  title: "Comp Accounts · Admin · AlmiCV",
};

export default async function CompAccountsAdminPage() {
  const user = await requireUser();

  // Silent redirect — no error message, no flash. Looks like the route
  // doesn't exist to a non-owner.
  if (!isOwner(user.email)) {
    redirect("/dashboard");
  }

  // Idempotent founder dogfood grant. Fires only when the visiting owner has
  // never been comped AND has no real Pro subscription. Skipped for any
  // subsequent visits or for owners who paid for Pro.
  const me = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      compProUntil: true,
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
    },
  });
  if (
    me &&
    me.compProUntil === null &&
    !isProActive({
      compProUntil: null,
      subscriptionStatus: me.subscriptionStatus,
      subscriptionCurrentPeriodEnd: me.subscriptionCurrentPeriodEnd,
    })
  ) {
    const now = new Date();
    const until = new Date(
      now.getTime() + FOUNDER_DOGFOOD_DAYS * 24 * 60 * 60 * 1000,
    );
    await prisma.user.update({
      where: { id: user.id },
      data: {
        compProUntil: until,
        compGrantedAt: now,
        compGrantedBy: "system_seed",
        compReason: "Founder dogfood access",
      },
    });
  }

  const result = await listCompAccounts();
  const accounts = result.ok ? result.accounts : [];
  const loadError = result.ok ? null : result.error;

  return (
    <CompAccountsClient
      accounts={accounts}
      loadError={loadError}
      grantAction={grantCompPro}
      revokeAction={revokeCompPro}
      extendAction={extendCompPro}
    />
  );
}
