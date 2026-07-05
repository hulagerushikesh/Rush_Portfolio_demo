'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SPRING_OPTS, usePrefersReducedMotion } from '@/lib/motion';

export default function ParticleBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, SPRING_OPTS.soft);
  const springY = useSpring(mouseY, SPRING_OPTS.soft);

  const orb1X = useTransform(springX, [-1, 1], [-24, 24]);
  const orb1Y = useTransform(springY, [-1, 1], [-24, 24]);
  const orb2X = useTransform(springX, [-1, 1], [28, -28]);
  const orb2Y = useTransform(springY, [-1, 1], [18, -18]);

  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, reducedMotion]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* Two restrained gradient orbs — warm amber/copper, subtly parallaxed with the cursor */}
      <motion.div
        style={{
          position: 'absolute',
          top: '12%',
          left: '18%',
          x: orb1X,
          y: orb1Y,
        }}
      >
        <div
          style={{
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,119,6,0.10) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'floatSlow 14s ease-in-out infinite',
          }}
        />
      </motion.div>
      <motion.div
        style={{
          position: 'absolute',
          top: '45%',
          right: '12%',
          x: orb2X,
          y: orb2Y,
        }}
      >
        <div
          style={{
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'floatSlow 16s ease-in-out infinite',
            animationDelay: '-5s',
          }}
        />
      </motion.div>

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,247,237,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,247,237,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />
    </div>
  );
}
