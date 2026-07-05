'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Global motion policy. `reducedMotion="user"` makes every Framer Motion
 * animation in the tree automatically skip transform/layout animation when
 * the OS reports prefers-reduced-motion (opacity fades still run, which is
 * the accepted accessible fallback). Components never need to check the
 * preference themselves for standard cases — only bespoke effects (parallax,
 * magnetic hover) should additionally use usePrefersReducedMotion() from
 * lib/motion to bail out entirely.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
