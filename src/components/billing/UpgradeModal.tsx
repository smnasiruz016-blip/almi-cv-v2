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

const COPY: Record<Props["reason"], { title: string; default: string }> = {
  AI_LIMIT_REACHED: {
    title: "AI limit reached",
    default:
      "You've used all 5 free AI calls this month. Upgrade to Pro for unlimited AI assists across rewrite, tailor, summary, cover letters, and chat.",
  },
  CV_LIMIT_REACHED: {
    title: "CV limit reached",
    default:
      "Free plan is limited to 3 CVs. Upgrade to Pro to create up to 10 CVs and unlock every premium template.",
  },
  PRO_REQUIRED: {
    title: "Pro feature",
    default: "This feature is available on Pro. Upgrade to unlock.",
  },
};

const PERKS = [
  "Unlimited AI (rewrite, tailor, summary, cover letters, chat)",
  "Up to 10 CVs",
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
          7-day free trial · cancel anytime via Stripe Customer Portal
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
            className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
          >
            <Sparkles className="h-4 w-4" />
            See plans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
