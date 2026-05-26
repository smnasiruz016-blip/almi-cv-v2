import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/Toast";
import { allFontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://almicv.almiworld.com"),
  title: "AlmiCV — Beautiful CVs, Built Right",
  description:
    "Premium-grade resume templates, live editor, AI writing helper, and ATS scoring. Build a polished CV in minutes.",
  openGraph: {
    title: "AlmiCV — Beautiful CVs, Built Right",
    description:
      "AI-powered CV builder with premium templates, ATS scoring, and tailoring. Free to start, $7/month for unlimited AI — 7-day free trial.",
    siteName: "AlmiCV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlmiCV — Beautiful CVs, Built Right",
    description:
      "AI-powered CV builder with premium templates, ATS scoring, and tailoring. Free to start, $7/month for unlimited AI — 7-day free trial.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={allFontVariables}>
      <body className="min-h-screen bg-cream text-plum antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
