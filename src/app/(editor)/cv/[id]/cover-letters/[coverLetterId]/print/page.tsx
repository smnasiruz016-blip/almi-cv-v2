import { notFound } from "next/navigation";
import { getResume } from "@/lib/resume-actions";
import { getCoverLetter } from "@/lib/cv/cover-letters";
import type { CVData } from "@/lib/cv-types";
import { AutoPrint } from "../../../print/auto-print";

const DATE_FMT = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export default async function CoverLetterPrintPage({
  params,
}: {
  params: Promise<{ id: string; coverLetterId: string }>;
}) {
  const { id, coverLetterId } = await params;

  const [resume, clResult] = await Promise.all([
    getResume(id),
    getCoverLetter(coverLetterId),
  ]);
  if (!resume) notFound();
  if (!clResult.ok) notFound();

  const cl = clResult.data;
  if (cl.resumeId !== resume.id) notFound();

  const cv = resume.data as unknown as CVData;
  const fullName = (cv.basics?.fullName ?? "").trim();
  const email = (cv.basics?.email ?? "").trim();
  const phone = (cv.basics?.phone ?? "").trim();
  const location = (cv.basics?.location ?? "").trim();
  const website = (cv.basics?.website ?? "").trim();

  const contactLine = [email, phone, location, website]
    .filter((v) => v.length > 0)
    .join("  ·  ");

  const today = DATE_FMT.format(new Date());

  // The model is instructed to produce salutation + paragraphs + sign-off in
  // the body itself. Strip a leading "Dear ..." line if present (we render
  // our own salutation just above the body) and strip any trailing sign-off
  // block (we render a clean one below). Whatever is left becomes the
  // body paragraphs.
  const bodyText = (cl.body ?? "").trim();
  const lines = bodyText.split(/\r?\n/);

  let firstIdx = 0;
  if (lines[0] && /^\s*Dear\b/i.test(lines[0])) {
    firstIdx = 1;
    while (firstIdx < lines.length && lines[firstIdx]?.trim() === "") {
      firstIdx++;
    }
  }

  let lastIdx = lines.length - 1;
  // Walk backwards: drop trailing empties and a trailing name line, then a
  // sign-off line ("Sincerely,", "Best regards,", "Thank you,") if present.
  while (lastIdx >= firstIdx && lines[lastIdx]?.trim() === "") lastIdx--;
  if (
    lastIdx >= firstIdx &&
    fullName &&
    lines[lastIdx]?.trim().toLowerCase() === fullName.toLowerCase()
  ) {
    lastIdx--;
    while (lastIdx >= firstIdx && lines[lastIdx]?.trim() === "") lastIdx--;
  }
  const SIGN_OFF_RE = /^(sincerely|best regards|thank you|kind regards|warm regards|regards|respectfully)\s*[,!.]?\s*$/i;
  if (lastIdx >= firstIdx && SIGN_OFF_RE.test(lines[lastIdx]?.trim() ?? "")) {
    lastIdx--;
    while (lastIdx >= firstIdx && lines[lastIdx]?.trim() === "") lastIdx--;
  }

  const cleaned = lines.slice(firstIdx, lastIdx + 1).join("\n");
  const paragraphs = cleaned
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const salutation = cl.hiringManager?.trim()
    ? `Dear ${cl.hiringManager.trim()},`
    : "Dear Hiring Manager,";

  const signOff =
    cl.tone === "formal"
      ? "Sincerely,"
      : cl.tone === "conversational"
        ? "Thank you,"
        : "Best regards,";

  return (
    <>
      <AutoPrint />
      <style>{PRINT_CSS}</style>
      <div className="cl-page">
        <header className="cl-letterhead">
          {fullName && <h1 className="cl-name">{fullName}</h1>}
          {contactLine && <p className="cl-contact">{contactLine}</p>}
        </header>

        <p className="cl-date">{today}</p>

        <p className="cl-salutation">{salutation}</p>

        <div className="cl-body">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>{cleaned || bodyText}</p>
          )}
        </div>

        <div className="cl-signoff">
          <p>{signOff}</p>
          {fullName && <p className="cl-signature">{fullName}</p>}
        </div>
      </div>
    </>
  );
}

const PRINT_CSS = `
  @page { size: A4; margin: 0; }
  html, body { margin: 0; padding: 0; background: #ffffff; }
  body {
    font-family: Georgia, "Times New Roman", serif;
    color: #1f1d2b;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .cl-page {
    box-sizing: border-box;
    width: 210mm;
    min-height: 297mm;
    padding: 22mm 24mm 24mm 24mm;
    background: #ffffff;
  }
  .cl-letterhead {
    border-bottom: 1px solid #d8d3cc;
    padding-bottom: 10mm;
    margin-bottom: 10mm;
  }
  .cl-name {
    font-size: 22pt;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin: 0 0 4mm 0;
    color: #1f1d2b;
  }
  .cl-contact {
    font-size: 9.5pt;
    color: #4b4658;
    margin: 0;
    letter-spacing: 0.01em;
  }
  .cl-date {
    text-align: right;
    margin: 0 0 8mm 0;
    font-size: 10pt;
    color: #4b4658;
  }
  .cl-salutation {
    margin: 0 0 6mm 0;
    font-size: 11pt;
  }
  .cl-body p {
    font-size: 11pt;
    line-height: 1.6;
    margin: 0 0 5mm 0;
    text-align: left;
    orphans: 3;
    widows: 3;
  }
  .cl-signoff {
    margin-top: 8mm;
  }
  .cl-signoff p {
    font-size: 11pt;
    margin: 0 0 2mm 0;
  }
  .cl-signature {
    font-weight: 600;
    margin-top: 2mm !important;
  }
`;
