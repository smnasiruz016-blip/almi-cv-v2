"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Heart, Sparkles } from "lucide-react";

const GHOST_MOCKUPS = [
  { rotate: -8, position: "left-4 top-0" },
  { rotate: 6, position: "right-0 top-12" },
  { rotate: -3, position: "bottom-8 left-12" },
];

const PARTICLES = [
  { color: "bg-mint", left: "10%", top: "20%" },
  { color: "bg-gold", left: "70%", top: "10%" },
  { color: "bg-mint", left: "85%", top: "60%" },
  { color: "bg-gold", left: "20%", top: "70%" },
  { color: "bg-mint", left: "50%", top: "40%" },
  { color: "bg-gold", left: "35%", top: "85%" },
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

      <div aria-hidden className="absolute inset-0 z-10 hidden md:block">
        {GHOST_MOCKUPS.map((mockup, i) => (
          <motion.div
            key={i}
            style={{ rotate: mockup.rotate }}
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut" }
            }
            className={`absolute ${mockup.position} h-64 w-48 rounded-xl bg-navy-800/40 p-4 opacity-40`}
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

      <div aria-hidden className="absolute inset-0 z-20 hidden md:block">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            style={{ left: p.left, top: p.top }}
            animate={
              reduce ? undefined : { y: [0, -100, 0], opacity: [0, 1, 0] }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 8 + i * 0.6,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "easeInOut",
                  }
            }
            className={`absolute h-1 w-1 rounded-full blur-[1px] ${p.color}`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-30 mx-auto w-full max-w-md"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }
          className="rounded-2xl bg-soft-white p-5 shadow-card-glow"
        >
          <PreviewCardContent reduce={reduce} />
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
            animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
            transition={
              reduce
                ? undefined
                : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
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
        <motion.span
          animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
          transition={
            reduce
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
          className="inline-flex items-center whitespace-nowrap rounded-pill bg-mint px-4 py-2 text-base font-semibold text-navy-900"
        >
          92/100 match
        </motion.span>
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
                  : { rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }
              }
              transition={
                reduce
                  ? undefined
                  : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              className="inline-flex"
            >
              <Sparkles className="h-4 w-4 text-mint" />
            </motion.span>
            Resume tip
          </h3>
          <p className="mt-2 text-sm italic text-navy-700">
            Mention your Figma + Storybook workflow in the summary — recruiters search for it.
          </p>
        </div>
      </div>
    </>
  );
}
