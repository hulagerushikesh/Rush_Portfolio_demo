'use client';

import { motion } from 'framer-motion';
import { DURATION, EASE_PREMIUM } from '@/lib/motion';

/**
 * Replaces `img` in rendered MDX: native lazy loading plus a fade/slide
 * reveal when the image scrolls into view. MotionConfig strips the slide
 * under reduced motion, leaving a plain fade.
 */
export default function MDXImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt = '', width, height, ...rest } = props;
  if (!src || typeof src !== 'string') return null;

  return (
    <motion.img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
      style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }}
      {...(rest as React.ComponentProps<typeof motion.img>)}
    />
  );
}
