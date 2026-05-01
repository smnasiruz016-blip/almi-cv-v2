import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { renderResumePdf, sanitizeFilename } from "@/lib/pdf-render";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: { id, userId: user.id },
    select: { id: true, title: true },
  });
  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const h = await headers();
  const cookieHeader = req.headers.get("cookie") ?? "";
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  if (!host) {
    return NextResponse.json({ error: "Missing host" }, { status: 500 });
  }
  const baseUrl = `${proto}://${host}`;

  try {
    const pdf = await renderResumePdf({
      resumeId: id,
      baseUrl,
      cookieHeader,
    });
    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${sanitizeFilename(resume.title)}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("PDF generation failed", err);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 },
    );
  }
}
