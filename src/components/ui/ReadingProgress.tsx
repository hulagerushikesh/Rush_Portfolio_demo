'use client';

import { motion, useScroll } from 'framer-motion';

/**
 * Thin bar at the top of the viewport showing how far through the article
 * the reader is. Bound 1:1 to scroll position (no easing) — it's a state
 * indicator, not a decorative animation, so it stays under reduced motion.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        transformOrigin: 'left',
        scaleX: scrollYProgress,
        background:
          'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
        zIndex: 150,
        pointerEvents: 'none',
      }}
    />
  );
}
