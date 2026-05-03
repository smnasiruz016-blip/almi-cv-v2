"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UpgradeModal } from "./UpgradeModal";

type LimitCode = "AI_LIMIT_REACHED" | "CV_LIMIT_REACHED" | "PRO_REQUIRED";

const VALID: LimitCode[] = [
  "AI_LIMIT_REACHED",
  "CV_LIMIT_REACHED",
  "PRO_REQUIRED",
];

function isValid(value: string | null): value is LimitCode {
  return value !== null && (VALID as string[]).includes(value);
}

/**
 * Mounts on pages reachable via redirect-with-query when a cap is hit
 * (e.g., /dashboard?limit=CV_LIMIT_REACHED). When the query is present
 * we open the upgrade modal and strip the param from the URL so a
 * page refresh doesn't re-open it.
 */
export function LimitWatcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get("limit");
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<LimitCode>("CV_LIMIT_REACHED");

  useEffect(() => {
    if (isValid(param)) {
      setCode(param);
      setOpen(true);
    }
  }, [param]);

  const handleClose = () => {
    setOpen(false);
    if (param) {
      // Clear the param so a back/refresh doesn't re-open the modal.
      const sp = new URLSearchParams(searchParams.toString());
      sp.delete("limit");
      const qs = sp.toString();
      router.replace(qs ? `?${qs}` : "?");
    }
  };

  return <UpgradeModal open={open} onClose={handleClose} reason={code} />;
}
