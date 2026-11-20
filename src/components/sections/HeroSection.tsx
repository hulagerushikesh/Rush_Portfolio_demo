'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FileText } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { usePrefersReducedMotion } from '@/lib/motion';

const smallLinks = [
  { label: 'GitHub', href: 'https://github.com/hulagerushikesh', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushikesh-hulage-46018522b/', Icon: LinkedinIcon },
  { label: 'Résumé (PDF)', href: '/resume/Rushikesh_Hulage_Resume.pdf', Icon: FileText },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  // Cursor parallax for the ambient background orbs — a soft spring so they
  // drift, not snap. Disabled for reduced-motion and touch (no hover) devices.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const ox = useSpring(px, { stiffness: 40, damping: 18, mass: 0.6 });
  const oy = useSpring(py, { stiffness: 40, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      px.set(nx * 60);
      py.set(ny * 60);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [reducedMotion, px, py]);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <motion.div
        className="grid-bg"
        aria-hidden="true"
        style={{ x: reducedMotion ? 0 : ox, y: reducedMotion ? 0 : oy }}
      />

      <motion.div
        className="section-container hero-grid hero-single"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          paddingTop: 'clamp(116px, 16vh, 180px)',
          paddingBottom: 'clamp(56px, 9vh, 110px)',
          opacity: reducedMotion ? 1 : heroOpacity,
          y: reducedMotion ? 0 : heroY,
        }}
      >
        {/* ── LEFT: positioning ───────────────────────────────────── */}
        <div className="hero-left">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.76rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: 'var(--text-secondary)',
              padding: '8px 16px',
              marginBottom: '26px',
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <span
              style={{
                position: 'relative',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-primary)',
              }}
            >
              <span
                className="animate-pulse-glow"
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--accent-primary)',
                }}
              />
            </span>
            Open to SDE-2 and senior backend roles · relocation or remote
          </motion.div>

          {/* Eyebrow — name demoted to a label. On ≤560px the name prefix is
             hidden so it fits on one line as "Software Engineer, Telstra". */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="hero-eyebrow"
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-text)',
              margin: '0 0 14px',
            }}
          >
            <span className="hero-eyebrow-name">Rushikesh Hulage · </span>Software Engineer · Pune, India
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(2.1rem, 4.8vw, 3.4rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              maxWidth: '22ch',
              margin: '0 0 22px',
            }}
          >
            Backend engineer on Telstra&apos;s customer sign-in platform. I also build and run my
            own <span className="hero-accent">AI systems</span>.
          </motion.h1>

          {/* Subline — concrete scope */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: 'clamp(1.02rem, 1.5vw, 1.24rem)',
              lineHeight: 1.6,
              maxWidth: '52ch',
              color: 'var(--text-secondary)',
              fontWeight: 400,
              margin: '0 0 26px',
            }}
          >
            Three years on OAuth 2.0, OpenID Connect and mTLS at enterprise scale, including a
            team migration of 15+ apps with zero sign-in downtime. Outside work, Atlas,
            VisionTrack and Finertia are live and Sextant is on PyPI, each with its results
            published.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', margin: '8px 0 30px' }}
          >
            <Magnetic>
              <a href="#projects" className="btn-primary">
                See my work <span>↓</span>
              </a>
            </Magnetic>
            <a href="mailto:hulagerushikesh@gmail.com" className="btn-secondary">
              Email me
            </a>
          </motion.div>

          {/* Small links */}
          <motion.nav
            aria-label="Profiles and résumé"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="hero-links"
          >
            {smallLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </a>
            ))}
          </motion.nav>
        </div>

      </motion.div>
    </section>
  );
}
