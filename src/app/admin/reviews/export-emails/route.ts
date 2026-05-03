import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { isOwner } from "@/lib/owner";
import { exportMarketingEmailsCSV } from "@/lib/reviews";

// CSV escape: quote any field containing a comma, double quote, CR, or LF;
// double up internal double quotes per RFC 4180.
function escapeCsv(value: string | null): string {
  const v = value ?? "";
  if (/[",\r\n]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

function todayIsoDate(): string {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function GET() {
  const user = await requireUser();
  if (!isOwner(user.email)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const result = await exportMarketingEmailsCSV();
  if (!result.ok) {
    return new NextResponse(result.error, { status: 500 });
  }

  const header = "Email,Name,Opted In Date";
  const lines = result.rows.map((r) =>
    [escapeCsv(r.email), escapeCsv(r.name), escapeCsv(r.optedInAt)].join(","),
  );
  // UTF-8 BOM so Excel renders accented and non-Latin names correctly on
  // Windows. Linux/Mac CSV viewers strip or ignore the BOM gracefully.
  const body = "﻿" + [header, ...lines].join("\r\n") + "\r\n";

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="almicv-emails-${todayIsoDate()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
