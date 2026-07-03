'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

type AnimationVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'fadeIn' | 'blurIn';

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 12 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
};

export default function AnimatedSection({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.45,
  className = '',
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
