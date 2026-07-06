'use client';

import { motion } from 'framer-motion';
import { DURATION, EASE_PREMIUM } from '@/lib/motion';

// Next remounts template.tsx on every navigation inside (site), giving each
// page a consistent fade + slide-up entrance. True exit animations would
// require freezing the App Router context (unstable); the RouteProgress bar
// covers the departure feedback instead.
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}
