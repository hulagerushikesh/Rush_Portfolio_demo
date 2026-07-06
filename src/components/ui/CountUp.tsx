'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { EASE_PREMIUM, usePrefersReducedMotion } from '@/lib/motion';

/**
 * Animates a stat like "22+" or "3" from 0 to its value when scrolled into
 * view. Non-numeric prefixes fall back to static rendering; reduced motion
 * renders the final value immediately.
 */
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = usePrefersReducedMotion();
  // Server-render the real value (SEO / no-JS); the count-up only takes
  // over on the client once the stat scrolls into view.
  const [display, setDisplay] = useState(target ?? 0);

  useEffect(() => {
    if (!inView || reduced || target === null) return;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: EASE_PREMIUM,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, target]);

  if (target === null) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {reduced ? target : display}
      {suffix}
    </span>
  );
}
