"use client";

import { useEffect } from "react";

export function AutoPrint() {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 250);
    return () => clearTimeout(t);
  }, []);
  return null;
}
