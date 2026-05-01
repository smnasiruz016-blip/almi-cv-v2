export async function downloadCvPdf(resumeId: string): Promise<void> {
  const res = await fetch(`/api/pdf/${resumeId}`, {
    method: "POST",
    credentials: "same-origin",
  });
  if (!res.ok) {
    let message = `PDF generation failed (${res.status})`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      /* not json */
    }
    throw new Error(message);
  }

  const disposition = res.headers.get("content-disposition") ?? "";
  const match = /filename="([^"]+)"/.exec(disposition);
  const filename = match?.[1] ?? "cv.pdf";

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
