"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { CheckCircle2, Heart, Sparkles } from "lucide-react";

const RESUME_TIP =
  "Mention your Figma + Storybook workflow in the summary — recruiters search for it.";

const CARD_SHADOW =
  "0 4px 8px rgba(15,23,41,0.10), 0 12px 32px rgba(15,23,41,0.12), 0 0 0 4px rgba(94,234,212,0.18)";
const CARD_SHADOW_HOVER =
  "0 8px 16px rgba(15,23,41,0.18), 0 24px 48px rgba(15,23,41,0.20), 0 0 0 6px rgba(94,234,212,0.25)";

const GHOST_MOCKUPS = [
  { rotate: -8, position: "left-4 top-0" },
  { rotate: 6, position: "right-0 top-12" },
  { rotate: -3, position: "bottom-8 left-12" },
];

const PARTICLES = [
  { color: "bg-mint", left: "8%", top: "15%" },
  { color: "bg-gold", left: "22%", top: "30%" },
  { color: "bg-mint", left: "35%", top: "8%" },
  { color: "bg-gold", left: "48%", top: "45%" },
  { color: "bg-mint", left: "62%", top: "20%" },
  { color: "bg-gold", left: "78%", top: "55%" },
  { color: "bg-mint", left: "90%", top: "35%" },
  { color: "bg-gold", left: "12%", top: "65%" },
  { color: "bg-mint", left: "28%", top: "85%" },
  { color: "bg-gold", left: "55%", top: "75%" },
  { color: "bg-mint", left: "70%", top: "90%" },
  { color: "bg-gold", left: "85%", top: "70%" },
];

type ReduceMotion = boolean | null;

export function HeroPreview() {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-[480px] md:min-h-[560px]">
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(94,234,212,0.18),transparent_60%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <motion.div
          className="h-full w-full rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(94,234,212,0.25) 0%, transparent 70%)",
          }}
          animate={
            reduce
              ? undefined
              : {
                  x: [0, 40, -20, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.15, 0.95, 1],
                }
          }
          transition={
            reduce
              ? undefined
              : { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      <div aria-hidden className="absolute inset-0 z-10 hidden md:block">
        {GHOST_MOCKUPS.map((mockup, i) => (
          <motion.div
            key={i}
            style={{ rotate: mockup.rotate }}
            animate={reduce ? undefined : { y: [0, -16, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut" }
            }
            className={`absolute ${mockup.position} h-64 w-48 rounded-xl bg-navy-800/40 p-4 opacity-50`}
          >
            <div className="space-y-2">
              <div className="h-3 w-2/3 rounded bg-soft-white/15" />
              <div className="h-2 w-1/2 rounded bg-soft-white/10" />
              <div className="my-3 h-px w-full bg-soft-white/10" />
              <div className="h-2 w-full rounded bg-soft-white/10" />
              <div className="h-2 w-5/6 rounded bg-soft-white/10" />
              <div className="h-2 w-3/4 rounded bg-soft-white/10" />
            </div>
          </motion.div>
        ))}
      </div>

      {!reduce && (
        <div aria-hidden className="absolute inset-0 z-20 hidden md:block">
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              style={{ left: p.left, top: p.top }}
              animate={{ y: [0, -180, 0], opacity: [0, 1, 0] }}
              transition={{
                duration: 6 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              className={`absolute h-1.5 w-1.5 rounded-full blur-[1px] ${p.color}`}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-30 mx-auto w-full max-w-md"
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : { y: [0, -12, 0], boxShadow: CARD_SHADOW }
          }
          whileHover={
            reduce
              ? undefined
              : {
                  scale: 1.02,
                  boxShadow: CARD_SHADOW_HOVER,
                  transition: { duration: 0.4, ease: "easeOut" },
                }
          }
          transition={
            reduce
              ? undefined
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative overflow-hidden rounded-2xl bg-soft-white p-5 shadow-card-glow"
        >
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-5 z-0"
              style={{
                background:
                  "linear-gradient(110deg, transparent 0%, rgba(94,234,212,0.18) 45%, rgba(94,234,212,0.28) 50%, rgba(94,234,212,0.18) 55%, transparent 100%)",
                width: "200%",
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 6,
                ease: "easeInOut",
              }}
            />
          )}
          <div className="relative z-10">
            <PreviewCardContent reduce={reduce} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: "spring", stiffness: 180 }}
          className="absolute -right-2 top-6 z-40"
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 blur-md"
          />
          <motion.div
            animate={
              reduce
                ? undefined
                : {
                    scale: [1, 1.25, 1],
                    filter: [
                      "drop-shadow(0 0 4px rgba(212,162,76,0.5))",
                      "drop-shadow(0 0 12px rgba(212,162,76,0.8))",
                      "drop-shadow(0 0 4px rgba(212,162,76,0.5))",
                    ],
                  }
            }
            transition={
              reduce
                ? undefined
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Heart
              fill="#D4A24C"
              stroke="#D4A24C"
              className="h-7 w-7 drop-shadow-[0_0_8px_rgba(212,162,76,0.6)]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function PreviewCardContent({ reduce }: { reduce: ReduceMotion }) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-base font-medium text-navy-900">
            MR
          </div>
          <div>
            <p className="text-base font-medium text-navy-900">Maya Rodriguez</p>
            <p className="text-sm text-navy-700">Senior Product Designer</p>
          </div>
        </div>
        <ScoreBadge reduce={reduce} />
      </div>
      <div className="my-5 h-px w-full bg-navy-700/15" />
      <div className="space-y-4">
        <div className="rounded-lg border border-navy-700/10 bg-white p-4">
          <h3 className="flex items-center gap-2 text-base font-medium text-navy-900">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="inline-flex"
            >
              <CheckCircle2 className="h-4 w-4 text-mint" />
            </motion.span>
            Why it matched
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm text-navy-700">
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
              <span>Led design systems at 3 fintechs (job asks for systems experience)</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
              <span>Shipped to 2M+ users (job asks for scale)</span>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-navy-700/10 bg-white p-4">
          <h3 className="flex items-center gap-2 text-base font-medium text-navy-900">
            <motion.span
              animate={
                reduce
                  ? undefined
                  : {
                      rotate: [0, 25, -15, 10, 0],
                      scale: [1, 1.3, 1, 1.2, 1],
                    }
              }
              transition={
                reduce
                  ? undefined
                  : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }
              className="inline-flex"
            >
              <Sparkles className="h-4 w-4 text-mint" />
            </motion.span>
            Resume tip
          </h3>
          <p className="mt-2 text-sm italic text-navy-700">
            <Typewriter text={RESUME_TIP} reduce={reduce} />
          </p>
        </div>
      </div>
    </>
  );
}

function ScoreBadge({ reduce }: { reduce: ReduceMotion }) {
  const score = useMotionValue(0);
  const rounded = useTransform(score, (v) => Math.round(v).toString());

  useEffect(() => {
    if (reduce) {
      score.set(92);
      return;
    }
    const controls = animate(score, 92, { duration: 1.5, ease: "easeOut" });
    return () => controls.stop();
  }, [reduce, score]);

  useEffect(() => {
    if (reduce) return;
    let pendingTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      animate(score, 87, { duration: 0.8, ease: "easeIn" });
      pendingTimeout = setTimeout(
        () => animate(score, 92, { duration: 1.2, ease: "easeOut" }),
        900
      );
    }, 12000);
    return () => {
      clearInterval(interval);
      if (pendingTimeout) clearTimeout(pendingTimeout);
    };
  }, [reduce, score]);

  return (
    <motion.span
      animate={
        reduce
          ? undefined
          : {
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 0 0 rgba(94,234,212,0.4)",
                "0 0 0 12px rgba(94,234,212,0)",
                "0 0 0 0 rgba(94,234,212,0)",
              ],
            }
      }
      transition={
        reduce
          ? undefined
          : { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
      className="inline-flex items-center whitespace-nowrap rounded-pill bg-mint px-4 py-2 text-base font-semibold text-navy-900"
    >
      <motion.span>{rounded}</motion.span>/100 match
    </motion.span>
  );
}

function Typewriter({ text, reduce }: { text: string; reduce: ReduceMotion }) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDisplayed(text);
      setIsComplete(true);
      return;
    }

    let charIndex = 0;
    let typingTimer: ReturnType<typeof setInterval> | undefined;
    let cycleTimer: ReturnType<typeof setTimeout> | undefined;

    const startTyping = () => {
      charIndex = 0;
      setDisplayed("");
      setIsComplete(false);
      typingTimer = setInterval(() => {
        charIndex += 1;
        setDisplayed(text.slice(0, charIndex));
        if (charIndex >= text.length) {
          if (typingTimer) clearInterval(typingTimer);
          setIsComplete(true);
          cycleTimer = setTimeout(startTyping, 15000);
        }
      }, 30);
    };

    startTyping();

    return () => {
      if (typingTimer) clearInterval(typingTimer);
      if (cycleTimer) clearTimeout(cycleTimer);
    };
  }, [text, reduce]);

  return (
    <span className="relative block">
      <span className="invisible" aria-hidden>
        {text}
      </span>
      <span className="absolute inset-0">
        {displayed}
        <motion.span
          animate={isComplete ? { opacity: 0 } : { opacity: [1, 0, 1] }}
          transition={
            isComplete
              ? { duration: 0.4, ease: "easeOut" }
              : { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
          }
          className="text-mint"
          aria-hidden
        >
          |
        </motion.span>
      </span>
    </span>
  );
}
