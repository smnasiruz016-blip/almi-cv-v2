"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function AutoPrint() {
  const params = useSearchParams();
  const skip = params.get("pdf") === "1";

  useEffect(() => {
    if (skip) return;
    const t = setTimeout(() => window.print(), 250);
    return () => clearTimeout(t);
  }, [skip]);

  return null;
}
