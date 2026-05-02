import "server-only";
import type { Browser } from "puppeteer-core";
import { launchBrowser } from "@/lib/pdf-render";

export async function renderCoverLetterPdf({
  resumeId,
  coverLetterId,
  baseUrl,
  cookieHeader,
}: {
  resumeId: string;
  coverLetterId: string;
  baseUrl: string;
  cookieHeader: string;
}): Promise<Uint8Array> {
  const url = `${baseUrl}/cv/${resumeId}/cover-letters/${coverLetterId}/print?pdf=1`;
  let browser: Browser | null = null;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    const host = new URL(baseUrl).hostname;
    const cookies = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const eq = c.indexOf("=");
        const name = eq > -1 ? c.slice(0, eq) : c;
        const value = eq > -1 ? c.slice(eq + 1) : "";
        return { name, value, domain: host, path: "/" };
      });
    if (cookies.length) await page.setCookie(...cookies);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 45_000 });
    await page.evaluate(async () => {
      if ("fonts" in document) {
        await (
          document as unknown as { fonts: { ready: Promise<unknown> } }
        ).fonts.ready;
      }
    });
    await new Promise((r) => setTimeout(r, 200));

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    return pdf;
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

export function sanitizeCoverLetterFilename(title: string): string {
  const cleaned = title
    .replace(/[/\\:*?"<>|]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > 0 ? `${cleaned}.pdf` : "cover-letter.pdf";
}
