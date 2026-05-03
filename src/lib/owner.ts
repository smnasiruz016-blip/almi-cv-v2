// Owner-gate helper. SERVER-ONLY — never import from a client component.
// Reads OWNER_EMAILS env var (comma-separated, case-insensitive).
//
// Why env-driven instead of a DB role flag:
//   - Rotate ownership without a migration.
//   - Different owner sets per environment (e.g. only smnasiruz@yahoo.com in
//     prod, expanded list in preview for QA).
//   - The UserRole.ADMIN enum exists in schema.prisma but is unused; we
//     intentionally do not couple to it.

export function getOwnerEmails(): string[] {
  const raw = process.env.OWNER_EMAILS ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0);
}

export function isOwner(email: string | null | undefined): boolean {
  if (!email) return false;
  const owners = getOwnerEmails();
  if (owners.length === 0) return false;
  return owners.includes(email.trim().toLowerCase());
}
