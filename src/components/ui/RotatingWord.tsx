'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/motion';

/**
 * Cycles through a list of words in place, sliding the old one up and out
 * while the next slides in. Collapses to a static first word when the viewer
 * prefers reduced motion. Rendered as an inline-grid so all words stack in one
 * cell — only the trailing content shifts as widths change.
 */
export default function RotatingWord({
  words,
  interval = 2200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduced, interval, words.length]);

  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span style={{ display: 'inline-grid', verticalAlign: 'bottom', overflow: 'hidden' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          className={className}
          initial={{ y: '0.9em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.9em', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ gridArea: '1 / 1', display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
