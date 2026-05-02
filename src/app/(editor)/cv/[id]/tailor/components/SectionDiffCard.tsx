"use client";

import type { ReactNode } from "react";
import { stripRichText } from "@/lib/rich-text";
import type { CVData } from "@/lib/cv-types";
import type { TailorProposal } from "@/lib/ai/tailor-cv";

type Section = "summary" | "experience" | "skills";

type Props = {
  sectionType: Section;
  title: string;
  icon: ReactNode;
  before: CVData;
  after: TailorProposal;
  accepted: boolean;
  onToggle: (next: boolean) => void;
};

const labelClass =
  "mb-1.5 text-[11px] font-semibold uppercase tracking-wider";
const beforeLabelClass = `${labelClass} text-plum-faint`;
const afterLabelClass = `${labelClass} text-[#0F4A42]`;

const beforeBoxClass =
  "rounded-md border border-plum/10 bg-cream-soft p-3 text-sm leading-relaxed text-plum-soft";
const afterBoxClass =
  "rounded-md border border-mint/40 bg-mint/15 p-3 text-sm leading-relaxed text-plum";

function Toggle({
  accepted,
  onToggle,
  ariaLabel,
}: {
  accepted: boolean;
  onToggle: (next: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={accepted}
      aria-label={ariaLabel}
      onClick={() => onToggle(!accepted)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-coral/30 ${
        accepted ? "bg-coral" : "bg-cream-soft border border-plum/15"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          accepted ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function NotAcceptedStrip() {
  return (
    <div className="rounded-md border border-dashed border-plum/15 bg-cream-soft px-3 py-2.5 text-xs text-plum-faint">
      Original kept (this section won&apos;t change)
    </div>
  );
}

function SummaryDiff({
  before,
  after,
}: {
  before: CVData;
  after: TailorProposal;
}) {
  const original = stripRichText(before.basics?.summary ?? "").trim();
  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-4">
      <div>
        <div className={beforeLabelClass}>Original</div>
        <div className={`${beforeBoxClass} whitespace-pre-wrap`}>
          {original || <span className="italic text-plum-faint">(empty)</span>}
        </div>
      </div>
      <div>
        <div className={afterLabelClass}>
          <span aria-hidden="true">✨ </span>Tailored
        </div>
        <div className={`${afterBoxClass} whitespace-pre-wrap`}>
          {after.summary}
        </div>
      </div>
    </div>
  );
}

function ExperienceDiff({
  before,
  after,
}: {
  before: CVData;
  after: TailorProposal;
}) {
  const entries = before.experience ?? [];
  if (entries.length === 0) {
    return (
      <p className="text-xs text-plum-faint">
        No experience entries on this CV.
      </p>
    );
  }
  return (
    <div className="space-y-5">
      {entries.map((entry, idx) => {
        const tailoredBullets = after.experienceBullets[idx]?.bullets ?? [];
        const dates = `${entry.startDate ?? ""}${
          entry.endDate ? ` – ${entry.endDate}` : " – present"
        }`;
        return (
          <div key={`${entry.company}-${idx}`} className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-xs">
              <span className="font-medium text-plum">
                {entry.role || "(role)"}{" "}
                <span className="font-normal text-plum-soft">
                  · {entry.company || "(company)"}
                </span>
              </span>
              <span className="text-plum-faint">{dates}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 md:gap-4">
              <div>
                <div className={beforeLabelClass}>Original</div>
                <ul className={`${beforeBoxClass} list-disc space-y-1.5 pl-5`}>
                  {(entry.bullets ?? []).map((b, i) => (
                    <li key={i}>{stripRichText(b)}</li>
                  ))}
                  {(entry.bullets ?? []).length === 0 && (
                    <li className="list-none italic text-plum-faint">
                      (no bullets)
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <div className={afterLabelClass}>
                  <span aria-hidden="true">✨ </span>Tailored
                </div>
                <ul className={`${afterBoxClass} list-disc space-y-1.5 pl-5`}>
                  {tailoredBullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                  {tailoredBullets.length === 0 && (
                    <li className="list-none italic text-plum-faint">
                      (no bullets)
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SkillsDiff({
  before,
  after,
}: {
  before: CVData;
  after: TailorProposal;
}) {
  const original = before.skills ?? [];
  const reordered = after.skillsOrder;
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        <div>
          <div className={beforeLabelClass}>Original order</div>
          <div className={beforeBoxClass}>
            <ul className="flex flex-wrap gap-1.5">
              {original.map((s, i) => (
                <li
                  key={`${s}-${i}`}
                  className="rounded-pill border border-plum/15 bg-white px-2.5 py-1 text-xs"
                >
                  {s}
                </li>
              ))}
              {original.length === 0 && (
                <li className="italic text-plum-faint">(no skills)</li>
              )}
            </ul>
          </div>
        </div>
        <div>
          <div className={afterLabelClass}>
            <span aria-hidden="true">✨ </span>Tailored order
          </div>
          <div className={afterBoxClass}>
            <ul className="flex flex-wrap gap-1.5">
              {reordered.map((s, i) => (
                <li
                  key={`${s}-${i}`}
                  className="rounded-pill border border-mint/40 bg-white px-2.5 py-1 text-xs"
                >
                  {s}
                </li>
              ))}
              {reordered.length === 0 && (
                <li className="italic text-plum-faint">(no skills)</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <p className="text-xs text-plum-faint">
        No skills added or removed — only reordered to prioritize JD keywords.
      </p>
    </div>
  );
}

export function SectionDiffCard({
  sectionType,
  title,
  icon,
  before,
  after,
  accepted,
  onToggle,
}: Props) {
  return (
    <section
      className={`rounded-xl border bg-white p-4 shadow-sm transition-colors sm:p-5 ${
        accepted ? "border-mint/30" : "border-plum/10"
      }`}
    >
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-cream-soft text-plum-soft">
            {icon}
          </span>
          <h2 className="text-base font-semibold text-plum">{title}</h2>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className={`text-xs font-medium ${
              accepted ? "text-coral-deep" : "text-plum-faint"
            }`}
          >
            {accepted ? "On" : "Off"}
          </span>
          <Toggle
            accepted={accepted}
            onToggle={onToggle}
            ariaLabel={`${accepted ? "Disable" : "Enable"} ${title} changes`}
          />
        </div>
      </header>

      <div className="mt-4">
        {accepted ? (
          sectionType === "summary" ? (
            <SummaryDiff before={before} after={after} />
          ) : sectionType === "experience" ? (
            <ExperienceDiff before={before} after={after} />
          ) : (
            <SkillsDiff before={before} after={after} />
          )
        ) : (
          <NotAcceptedStrip />
        )}
      </div>
    </section>
  );
}
