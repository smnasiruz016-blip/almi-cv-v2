import "server-only";
import type { Browser } from "puppeteer-core";

const SPARTICUZ_VERSION = "148.0.0";
const REMOTE_TAR = `https://github.com/Sparticuz/chromium/releases/download/v${SPARTICUZ_VERSION}/chromium-v${SPARTICUZ_VERSION}-pack.x64.tar`;

export async function launchBrowser(): Promise<Browser> {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    // Serverless: use puppeteer-core + remote chromium binary.
    const [{ default: chromium }, { default: puppeteer }] = await Promise.all([
      import("@sparticuz/chromium-min"),
      import("puppeteer-core"),
    ]);
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(REMOTE_TAR),
      headless: true,
    }) as unknown as Browser;
  }
  // Local dev: full puppeteer ships its own Chromium.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const puppeteer = (await import("puppeteer")).default;
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  }) as unknown as Browser;
}

export async function renderResumePdf({
  resumeId,
  baseUrl,
  cookieHeader,
}: {
  resumeId: string;
  baseUrl: string;
  cookieHeader: string;
}): Promise<Uint8Array> {
  const url = `${baseUrl}/cv/${resumeId}/print?pdf=1`;
  let browser: Browser | null = null;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    // Forward auth cookies so /cv/[id]/print's requireUser() succeeds.
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
    // Belt + suspenders: wait for webfonts to actually be ready.
    await page.evaluate(async () => {
      if ("fonts" in document) {
        await (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts.ready;
      }
    });
    // PaginatedCV uses useLayoutEffect to measure & repack sections after
    // hydration. Give React a tick to settle so the article count we read
    // below matches the final DOM, not the pre-hydration single-article
    // placeholder.
    await new Promise((r) => setTimeout(r, 400));

    // Each <article> inside .print-target is exactly one A4 page. Chromium's
    // print-mode A4 = ~1122.5px while paginated articles enforce minHeight
    // 1123, so each spills 0.5px into a phantom page. Cap pageRanges to the
    // real article count to drop those trailing blanks.
    const articleCount = await page.evaluate(
      () => document.querySelectorAll(".print-target article").length,
    );
    const pageRanges = articleCount > 0 ? `1-${articleCount}` : "";

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      pageRanges,
    });
    return pdf;
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

export function sanitizeFilename(title: string): string {
  const cleaned = title
    .replace(/[/\\:*?"<>|]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > 0 ? `${cleaned}.pdf` : "cv.pdf";
}
