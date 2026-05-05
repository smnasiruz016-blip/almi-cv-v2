import { createHash } from "node:crypto";

let warned = false;

export function getIpHash(ip: string): string | null {
  const salt = process.env.REVIEW_IP_SALT;
  if (!salt) {
    if (!warned) {
      warned = true;
      console.warn(
        "REVIEW_IP_SALT missing — IP hashes disabled. Public endpoint rate limiting weakened.",
      );
    }
    return null;
  }
  return createHash("sha256").update(salt + ip).digest("hex");
}
