// Placeholder for Task 12 — Pro paywall + AI call quota.
// Today, returns { ok: true } for any signed-in user.
// When Task 12 ships, this becomes:
//   - check user's pro status
//   - check user's monthly AI call count vs cap (5 free / 50 pro)
//   - increment counter on success
//   - return { ok: false, error, reason } on block
//
// The contract is intentional: every AI server action calls this and
// returns early if !ok, surfacing `error` to the user.

export type AIAccessResult =
  | { ok: true }
  | { ok: false; error: string; reason: "limit" | "not_pro" | "auth" };

export async function requireAIAccess(
  userId: string | null,
): Promise<AIAccessResult> {
  if (!userId) {
    return {
      ok: false,
      error: "Please sign in to use AI features.",
      reason: "auth",
    };
  }
  // TODO(Task 12): real Pro check + monthly quota enforcement here.
  return { ok: true };
}
