import { notFound } from "next/navigation";
import { getResume } from "@/lib/resume-actions";
import { getCoverLetter } from "@/lib/cv/cover-letters";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, withAlpha } from "@/lib/cv-themes";
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
  const { theme, headingFont, bodyFont } = resolveStyle(cv.style);
  const headingStack = `${headingFont.cssVar}, ${headingFont.fallback}`;
  const bodyStack = `${bodyFont.cssVar}, ${bodyFont.fallback}`;
  const dividerColor = withAlpha(theme.text, 0.15);

  const fullName = (cv.basics?.fullName ?? "").trim();
  const role = (cv.basics?.role ?? "").trim();
  const email = (cv.basics?.email ?? "").trim();
  const phone = (cv.basics?.phone ?? "").trim();
  const location = (cv.basics?.location ?? "").trim();
  const website = (cv.basics?.website ?? "").trim();

  const contactLine = [email, phone, location, website]
    .filter((v) => v.length > 0)
    .join("  ·  ");

  const today = DATE_FMT.format(new Date());

  // Strip a leading "Dear ..." line if present (we render our own salutation)
  // and strip any trailing sign-off block + name line. Whatever is left
  // becomes the body paragraphs.
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
  while (lastIdx >= firstIdx && lines[lastIdx]?.trim() === "") lastIdx--;
  if (
    lastIdx >= firstIdx &&
    fullName &&
    lines[lastIdx]?.trim().toLowerCase() === fullName.toLowerCase()
  ) {
    lastIdx--;
    while (lastIdx >= firstIdx && lines[lastIdx]?.trim() === "") lastIdx--;
  }
  const SIGN_OFF_RE =
    /^(sincerely|best regards|thank you|kind regards|warm regards|regards|respectfully)\s*[,!.]?\s*$/i;
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

  const css = buildPrintCss({
    headingStack,
    bodyStack,
    text: theme.text,
    textSoft: theme.textSoft,
    accent: theme.accent,
    divider: dividerColor,
  });

  return (
    <>
      <AutoPrint />
      <style>{css}</style>
      <div className="print-target">
        <div className="cl-page">
          <div className="cl-accent" aria-hidden="true" />
          <header className="cl-letterhead">
            {fullName && <h1 className="cl-name">{fullName}</h1>}
            {role && <p className="cl-role">{role}</p>}
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
      </div>
    </>
  );
}

function buildPrintCss({
  headingStack,
  bodyStack,
  text,
  textSoft,
  accent,
  divider,
}: {
  headingStack: string;
  bodyStack: string;
  text: string;
  textSoft: string;
  accent: string;
  divider: string;
}): string {
  return `
    @page { size: A4; margin: 0; }
    html, body { margin: 0; padding: 0; background: #ffffff; }
    body {
      font-family: ${bodyStack};
      color: ${text};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cl-page {
      box-sizing: border-box;
      position: relative;
      width: 210mm;
      min-height: 297mm;
      padding: 24mm 26mm 24mm 26mm;
      background: #ffffff;
    }
    .cl-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4mm;
      background: ${accent};
    }
    .cl-letterhead {
      padding-bottom: 7mm;
      border-bottom: 1px solid ${divider};
      margin-bottom: 9mm;
    }
    .cl-name {
      font-family: ${headingStack};
      font-size: 26pt;
      font-weight: 500;
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin: 0 0 3mm 0;
      color: ${text};
    }
    .cl-role {
      font-family: ${bodyStack};
      font-size: 10.5pt;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: ${textSoft};
      margin: 0 0 4mm 0;
    }
    .cl-contact {
      font-family: ${bodyStack};
      font-size: 9.5pt;
      color: ${textSoft};
      margin: 0;
      letter-spacing: 0.01em;
    }
    .cl-date {
      text-align: right;
      margin: 0 0 8mm 0;
      font-size: 10pt;
      color: ${textSoft};
      font-family: ${bodyStack};
    }
    .cl-salutation {
      margin: 0 0 5mm 0;
      font-size: 11pt;
      color: ${text};
      font-family: ${bodyStack};
    }
    .cl-body p {
      font-size: 11pt;
      line-height: 1.6;
      margin: 0 0 5mm 0;
      text-align: left;
      color: ${text};
      font-family: ${bodyStack};
      orphans: 3;
      widows: 3;
    }
    .cl-signoff {
      margin-top: 8mm;
    }
    .cl-signoff p {
      font-size: 11pt;
      margin: 0 0 1.5mm 0;
      color: ${text};
      font-family: ${bodyStack};
    }
    .cl-signature {
      font-family: ${headingStack} !important;
      font-weight: 500 !important;
      font-size: 13pt !important;
      margin-top: 5mm !important;
      letter-spacing: -0.01em;
    }
  `;
}
