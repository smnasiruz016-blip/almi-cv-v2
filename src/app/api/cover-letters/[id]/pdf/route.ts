import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  renderCoverLetterPdf,
  sanitizeCoverLetterFilename,
} from "@/lib/cv/cover-letter-pdf";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await requireUser();

  const coverLetter = await prisma.coverLetter.findFirst({
    where: { id, resume: { userId: user.id } },
    select: { id: true, title: true, resumeId: true },
  });
  if (!coverLetter) {
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
    const pdf = await renderCoverLetterPdf({
      resumeId: coverLetter.resumeId,
      coverLetterId: coverLetter.id,
      baseUrl,
      cookieHeader,
    });
    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${sanitizeCoverLetterFilename(coverLetter.title)}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Cover letter PDF generation failed", err);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 },
    );
  }
}
