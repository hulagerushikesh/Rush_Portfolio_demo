'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SPRING_OPTS, usePrefersReducedMotion } from '@/lib/motion';

interface MagneticProps {
  children: React.ReactNode;
  /** Maximum pull distance in px. */
  strength?: number;
}

/**
 * Magnetic hover wrapper: the child is gently pulled toward the cursor while
 * it's inside the element, and springs back on leave. Pointer-driven only, so
 * it's naturally inert on touch devices; fully disabled under reduced motion.
 */
export default function Magnetic({ children, strength = 8 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_OPTS.gentle);
  const springY = useSpring(y, SPRING_OPTS.gentle);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, relX)) * strength);
    y.set(Math.max(-1, Math.min(1, relY)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={reduced ? undefined : handleMouseMove}
      onMouseLeave={reduced ? undefined : handleMouseLeave}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
