'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Mail } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { usePrefersReducedMotion } from '@/lib/motion';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/hulagerushikesh', Icon: GithubIcon, aria: 'GitHub profile' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rushikesh-hulage-46018522b/',
    Icon: LinkedinIcon,
    aria: 'LinkedIn profile',
  },
  { label: 'Email', href: 'mailto:hulagerushikesh@gmail.com', Icon: Mail, aria: 'Email Rushikesh' },
];

// Proof strip — four hardest facts, straight from the résumé. On mobile these
// wrap to a 2×2 grid.
const proof = [
  'Part of 15+ app migrations · zero auth downtime',
  'mTLS cert rotation automated',
  'Top 10 · Google APAC 2025',
  'Hugging Face Transformers contributor',
];

// "Live in production" card — real, shipped work. Each links to its case study.
const liveWork = [
  {
    name: 'Atlas',
    slug: 'atlas',
    blurb: 'Agentic RAG platform, multi-tenant, live on GCP',
    live: 'https://atlas.hulage.in',
  },
  {
    name: 'VisionTrack',
    slug: 'visiontrack',
    blurb: 'Real-time multi-object tracker, published PyPI SDK',
    live: 'https://visiontrack.hulage.in',
  },
  {
    name: 'Finertia',
    slug: 'finertia',
    blurb: 'Momentum backtesting SaaS on a pure pandas engine',
    live: 'https://finertia.hulage.in',
  },
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
        className="section-container hero-grid"
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
            Open to SDE-2 / senior-track roles
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
            <span className="hero-eyebrow-name">Rushikesh Hulage · </span>Software Engineer, Telstra
          </motion.p>

          {/* H1 — positioning statement.
             Alternatives (kept for reference):
             2. "Backend engineer on Telstra's customer identity platform. I also ship AI systems."
             3. "Identity & backend engineer at Telstra, building applied-AI systems in production." */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(2.1rem, 4.6vw, 3rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              maxWidth: '24ch',
              margin: '0 0 22px',
            }}
          >
            I work on customer identity at Telstra — and ship{' '}
            <span className="hero-accent">AI systems</span> to production.
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
            I&apos;m a backend engineer on Telstra&apos;s customer identity (CIAM) platform,
            working on the Java/Spring Boot services behind login, registration, MFA and
            account recovery — OAuth 2.0/OIDC, mTLS and edge WAF on AWS. Outside work I build
            applied-AI systems: Atlas, VisionTrack and Finertia, all live.
          </motion.p>

          {/* Proof strip */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="hero-proof"
            aria-label="Highlights"
          >
            {proof.map((p) => (
              <li key={p} className="hero-proof-item">
                <span className="hero-proof-tick" aria-hidden="true" />
                {p}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.64 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', margin: '30px 0 30px' }}
          >
            <Magnetic>
              <a href="#projects" className="btn-primary">
                See projects <span>↗</span>
              </a>
            </Magnetic>
            <a href="#contact" className="btn-secondary">
              Get in touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.76 }}
            style={{ display: 'flex', gap: '14px' }}
          >
            {socialLinks.map(({ label, href, Icon, aria }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={aria}
                className="glow-hover glass"
                style={{
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-soft)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: live-in-production card ───────────────────────── */}
        <motion.aside
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="glass-card hero-card"
          aria-label="Live in production"
        >
          <div className="hero-card-eyebrow">
            <span className="hero-live-dot" aria-hidden="true" />
            Live in production
          </div>

          <ul className="hero-work">
            {liveWork.map((w) => (
              <li key={w.slug} className="hero-work-item">
                <div className="hero-work-top">
                  <span className="hero-work-name">{w.name}</span>
                  <span className="hero-work-links">
                    <Link href={`/projects/${w.slug}`}>Read</Link>
                    <a href={w.live} target="_blank" rel="noopener noreferrer">
                      Live ↗
                    </a>
                  </span>
                </div>
                <p className="hero-work-blurb">{w.blurb}</p>
              </li>
            ))}
          </ul>

          <Link href="#projects" className="hero-work-all">
            All projects →
          </Link>
        </motion.aside>
      </motion.div>
    </section>
  );
}
