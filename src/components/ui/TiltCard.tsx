'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SPRING_OPTS, usePrefersReducedMotion } from '@/lib/motion';

interface TiltCardProps {
  children: React.ReactNode;
  /** Maximum rotation in degrees. */
  maxTilt?: number;
}

/**
 * Subtle 3D tilt toward the cursor, spring-damped back to flat on leave.
 * Mouse pointers only — touch gets the static card — and fully disabled
 * under reduced motion.
 */
export default function TiltCard({ children, maxTilt = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, SPRING_OPTS.gentle);
  const springY = useSpring(py, SPRING_OPTS.gentle);
  const rotateX = useTransform(springY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-1, 1], [-maxTilt, maxTilt]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1)));
    py.set(Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1)));
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  if (reduced) {
    return <div style={{ height: '100%' }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        height: '100%',
      }}
    >
      {children}
    </motion.div>
  );
}
