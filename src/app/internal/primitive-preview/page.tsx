import { notFound } from "next/navigation";
import { PreviewClient } from "./PreviewClient";

export const dynamic = "force-static";

export default function PrimitivePreviewPage() {
  if (process.env.VERCEL_ENV === "production") notFound();
  return <PreviewClient />;
}
