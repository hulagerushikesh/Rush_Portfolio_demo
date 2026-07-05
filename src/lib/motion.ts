'use client';

/**
 * Single source of truth for motion design tokens.
 *
 * Every Framer Motion animation in the app should pull its easing, duration,
 * and spring values from here — never inline magic numbers. The CSS-side
 * equivalents live in globals.css (`--ease-*`, `--duration-*`); if a value
 * changes here, change it there too.
 */

import { useReducedMotion } from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';

/* ===== EASING ===== */

/** Signature ease for entrances/reveals — fast start, long soft landing. */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/** The pre-existing site-wide ease (AnimatedSection, page template). */
export const EASE_STANDARD = [0.25, 0.4, 0.25, 1] as const;

/** Symmetric ease for exits and reversible state changes. */
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

/* ===== DURATIONS (seconds) ===== */

export const DURATION = {
  fast: 0.15,
  base: 0.3,
  slow: 0.45,
} as const;

/* ===== SPRING PRESETS ===== */

export const SPRING: Record<'snappy' | 'gentle' | 'soft', Transition> = {
  /** Matches the nav active-pill spring — crisp UI state changes. */
  snappy: { type: 'spring', stiffness: 380, damping: 30 },
  /** Follow-through for hover releases, magnetic effects. */
  gentle: { type: 'spring', stiffness: 150, damping: 18 },
  /** Slow, heavily damped — ambient/parallax movement. */
  soft: { type: 'spring', stiffness: 40, damping: 20 },
};

/* ===== TRANSITION SHORTHANDS ===== */

export const TRANSITION_ENTER: Transition = {
  duration: DURATION.slow,
  ease: EASE_PREMIUM,
};

export const TRANSITION_EXIT: Transition = {
  duration: DURATION.fast,
  ease: EASE_IN_OUT,
};

/* ===== REDUCED-MOTION HELPERS ===== */

/**
 * Thin wrapper over Framer Motion's `useReducedMotion` so components don't
 * import it from two places. Returns true when the OS asks for less motion.
 */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}

/** Reduced-motion replacement: a plain quick fade, zero movement/scale/blur. */
const REDUCED_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast } },
};

/**
 * Pass any `hidden`/`visible` variants through this hook and they degrade to
 * a simple opacity fade automatically under `prefers-reduced-motion`.
 *
 *   const variants = useMotionSafeVariants(myVariants);
 */
export function useMotionSafeVariants(variants: Variants): Variants {
  const reduced = usePrefersReducedMotion();
  return reduced ? REDUCED_VARIANTS : variants;
}
