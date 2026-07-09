'use client';

import { motion } from 'framer-motion';
import { DURATION, EASE_STANDARD } from '@/lib/motion';

/**
 * Enter animation for admin list rows — fade + slight rise, staggered by
 * index (capped so long lists don't crawl). Presentation only: rows remain
 * server-rendered and deletes still work through server actions.
 */
export default function AdminListItem({
  index = 0,
  children,
}: {
  index?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: DURATION.base,
        ease: EASE_STANDARD,
        delay: Math.min(index * 0.05, 0.4),
      }}
    >
      {children}
    </motion.div>
  );
}
