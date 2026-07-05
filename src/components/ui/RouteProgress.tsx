'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_IN_OUT } from '@/lib/motion';

/**
 * Thin route-change progress bar. The App Router has no navigation-start
 * event, so we start the bar when an internal link is clicked (capture
 * phase) and complete it when the pathname actually changes.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  // Route arrived — finish and fade out.
  useEffect(() => {
    setActive(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor || anchor.target === '_blank') return;
      if (anchor.origin !== window.location.origin) return;
      // Ignore same-page navigations and pure hash jumps.
      if (anchor.pathname === window.location.pathname) return;
      setActive(true);
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  // Safety: never leave a stuck bar if a navigation is aborted.
  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => setActive(false), 4000);
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="route-progress"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.85, opacity: 1 }}
          exit={{
            scaleX: 1,
            opacity: 0,
            transition: {
              scaleX: { duration: 0.2, ease: EASE_IN_OUT },
              opacity: { duration: 0.3, delay: 0.15 },
            },
          }}
          transition={{ scaleX: { duration: 3, ease: [0.1, 0.6, 0.3, 1] } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            transformOrigin: 'left',
            background:
              'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            zIndex: 200,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}
