// Founder gate — server-only. Studio routes use these helpers to deny
// access without leaking that the route exists.
//
// Reuses the existing OWNER_EMAILS env var (and isOwner() helper from
// src/lib/owner.ts) rather than introducing a separate FOUNDER_EMAIL.
// Decision rationale: one source of truth for owner identity; comp
// accounts / reviews already use isOwner; rotating ownership stays a
// single env-var edit. The only delta from the comp-accounts pattern
// is response semantics: comp-accounts redirects non-owners to
// /dashboard, the Studio calls notFound() so the route's existence is
// never disclosed.

import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isOwner } from "@/lib/owner";
import type { User } from "@prisma/client";

/**
 * Strict gate. Returns the User row only if the caller is in
 * OWNER_EMAILS. Otherwise calls notFound() — the route's existence is
 * never disclosed to anonymous, free, or non-owner Pro users.
 */
export async function requireFounder(): Promise<User> {
  const user = await getCurrentUser();
  if (!user || !isOwner(user.email)) notFound();
  return user;
}

/**
 * Boolean check. Use for conditional rendering (e.g., showing Studio
 * tabs in AdminSubnav). Never throws or redirects.
 */
export async function isFounder(): Promise<boolean> {
  const user = await getCurrentUser();
  return Boolean(user && isOwner(user.email));
}
