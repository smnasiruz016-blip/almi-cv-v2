"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/modal";

type Props = {
  open: boolean;
  onClose: () => void;
  reason: "AI_LIMIT_REACHED" | "CV_LIMIT_REACHED" | "PRO_REQUIRED";
  message?: string;
};

// RR-391 (owner, 7 Nov 2026): 3 free CVs without AI, then $12/month for AI and unlimited CVs. No trial.
const COPY: Record<Props["reason"], { title: string; default: string }> = {
  AI_LIMIT_REACHED: {
    title: "AI is in the $12/month plan",
    default: "Your trial's AI credits are used. AI becomes unlimited when your $12/month subscription starts.",
  },
  CV_LIMIT_REACHED: {
    title: "You have used your 3 free CVs",
    default: "Get unlimited CVs and AI for $12/month. Your 3 CVs stay yours: you can still edit and download them.",
  },
  PRO_REQUIRED: {
    title: "AI is in the $12/month plan",
    default: "Your 3 free CVs have no AI. Get AI and unlimited CVs for $12/month — cancel anytime.",
  },
};

const PERKS = [
  "Unlimited AI (rewrite, tailor, summary, cover letters, chat)",
  "Unlimited CVs",
  "All premium templates",
  "AI Translator + Interview Prep",
];

export function UpgradeModal({ open, onClose, reason, message }: Props) {
  const copy = COPY[reason];
  return (
    <Modal open={open} onClose={onClose} title={copy.title} size="md">
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-plum">
          {message ?? copy.default}
        </p>

        <ul className="space-y-1.5 rounded-xl bg-cream-soft px-4 py-3 text-sm text-plum">
          {PERKS.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <p className="text-xs text-plum-faint">
          $12/month · cancel anytime via Stripe Customer Portal
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-pill border border-plum/15 bg-white px-4 py-2 text-sm font-medium text-plum-soft transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
          >
            Not now
          </button>
          <Link
            href="/pricing"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
          >
            <Sparkles className="h-4 w-4" />
            Subscribe for $12/month
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
