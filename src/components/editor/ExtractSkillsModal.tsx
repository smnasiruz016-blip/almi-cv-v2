"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Cpu,
  Globe,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import {
  extractSkills,
  type ExtractedSkills,
} from "@/lib/ai/extract-skills";

type CategoryKey = keyof ExtractedSkills;

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  Icon: LucideIcon;
}[] = [
  { key: "technical", label: "Technical", Icon: Cpu },
  { key: "soft", label: "Soft", Icon: Users },
  { key: "tools", label: "Tools", Icon: Wrench },
  { key: "languages", label: "Languages", Icon: Globe },
];

const FALLBACK_ERROR = "Couldn't extract skills right now — try again";

type Props = {
  open: boolean;
  onClose: () => void;
  cvId?: string;
  summary?: string;
  experienceText: string;
  existingSkills: string[];
  onAccept: (selected: string[]) => void;
};

function makeKey(category: CategoryKey, idx: number): string {
  return `${category}|${idx}`;
}

function totalCount(skills: ExtractedSkills): number {
  return (
    skills.technical.length +
    skills.soft.length +
    skills.tools.length +
    skills.languages.length
  );
}

export function ExtractSkillsModal({
  open,
  onClose,
  cvId,
  summary,
  experienceText,
  existingSkills,
  onAccept,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractedSkills | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestId = useRef(0);

  const showError = (msg: string) => {
    setError(msg);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setError(null), 4000);
  };

  const run = async () => {
    if (loading) return;
    const myId = ++requestId.current;
    setLoading(true);
    setError(null);
    if (errorTimer.current) {
      clearTimeout(errorTimer.current);
      errorTimer.current = null;
    }
    setResult(null);
    setSelected(new Set());
    try {
      const res = await extractSkills({
        cvId,
        summary,
        experienceText,
        existingSkills,
      });
      if (myId !== requestId.current) return;
      if (!res.ok) {
        showError(res.error || FALLBACK_ERROR);
        return;
      }
      const all = new Set<string>();
      for (const cat of CATEGORIES) {
        res.skills[cat.key].forEach((_, i) => all.add(makeKey(cat.key, i)));
      }
      setResult(res.skills);
      setSelected(all);
    } catch (err) {
      if (myId !== requestId.current) return;
      console.error("[ExtractSkillsModal] extractSkills failed:", err);
      showError(FALLBACK_ERROR);
    } finally {
      if (myId === requestId.current) setLoading(false);
    }
  };

  // Fire on open. Reset everything on close.
  useEffect(() => {
    if (!open) {
      setLoading(false);
      setError(null);
      setResult(null);
      setSelected(new Set());
      if (errorTimer.current) {
        clearTimeout(errorTimer.current);
        errorTimer.current = null;
      }
      requestId.current++;
      return;
    }
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    return () => {
      if (errorTimer.current) clearTimeout(errorTimer.current);
    };
  }, []);

  const total = result ? totalCount(result) : 0;
  const checkedCount = selected.size;

  const toggleKey = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const orderedSelected = useMemo(() => {
    if (!result) return [] as string[];
    const out: string[] = [];
    for (const cat of CATEGORIES) {
      result[cat.key].forEach((skill, idx) => {
        if (selected.has(makeKey(cat.key, idx))) out.push(skill);
      });
    }
    return out;
  }, [result, selected]);

  const handleAccept = () => {
    if (orderedSelected.length === 0) return;
    onAccept(orderedSelected);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="AI Skill Suggestions"
      size="lg"
    >
      {loading && !result ? (
        <div className="py-8 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-coral" />
          <p className="mt-3 text-sm text-plum-soft">
            Reading your CV and finding skills you might have missed...
          </p>
        </div>
      ) : error && !result ? (
        <div className="space-y-4">
          <div
            role="alert"
            className="rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-sm text-coral-deep"
          >
            {error}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => void run()}
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        </div>
      ) : result ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="text-sm text-plum-soft">
              Pick skills to add to your CV
            </p>
            <span className="rounded-pill bg-cream-soft px-2.5 py-0.5 text-xs font-medium text-plum-soft">
              {checkedCount} of {total} selected
            </span>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map(({ key, label, Icon }) => {
              const items = result[key];
              if (items.length === 0) return null;
              return (
                <div key={key}>
                  <div className="mb-2 flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-plum-soft" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-plum-soft">
                      {label}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {items.map((skill, idx) => {
                      const k = makeKey(key, idx);
                      const checked = selected.has(k);
                      return (
                        <label
                          key={k}
                          className={`flex cursor-pointer select-none items-center gap-2.5 rounded-md border px-3 py-2 text-sm transition-colors ${
                            checked
                              ? "border-coral/30 bg-coral/5 text-plum"
                              : "border-plum/15 bg-cream-soft text-plum-soft hover:bg-cream"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleKey(k)}
                            className="h-4 w-4 shrink-0 rounded border-plum/30 text-coral focus:outline-none focus:ring-2 focus:ring-coral/30"
                          />
                          <span className="font-medium">{skill}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-xs text-coral-deep"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2 border-t border-plum/10 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => void run()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Try again
            </button>
            <button
              type="button"
              onClick={handleAccept}
              disabled={checkedCount === 0 || loading}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              Add Selected ({checkedCount})
            </button>
          </div>
        </div>
      ) : (
        <div className="py-6 text-center text-sm text-plum-soft">
          <Sparkles className="mx-auto mb-2 h-5 w-5 text-coral" />
          Preparing suggestions…
        </div>
      )}
    </Modal>
  );
}
