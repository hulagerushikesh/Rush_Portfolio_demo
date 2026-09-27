'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/motion';

// A soft, glossy accent glow that trails the pointer — ambient light without
// touching layout. Fixed, non-interactive, skipped for reduced-motion and
// touch (no hover) devices.
export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return;

    const el = ref.current;
    if (!el) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      el.style.opacity = '1';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    const tick = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '440px',
        height: '440px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0,
        filter: 'blur(40px)',
        background:
          'radial-gradient(circle, color-mix(in srgb, var(--accent-primary) 22%, transparent), transparent 65%)',
        transition: 'opacity 0.4s',
        willChange: 'transform',
      }}
    />
  );
}
