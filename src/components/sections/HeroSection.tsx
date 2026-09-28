'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Mail } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import RotatingWord from '@/components/ui/RotatingWord';
import Magnetic from '@/components/ui/Magnetic';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { usePrefersReducedMotion } from '@/lib/motion';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/hulagerushikesh', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushikesh-hulage-46018522b/', Icon: LinkedinIcon },
  { label: 'Email', href: 'mailto:hulagerushikesh@gmail.com', Icon: Mail },
];

const meta = [
  { k: 'ROLE', v: 'Identity & Platform Engineer' },
  { k: 'AT', v: 'Telstra' },
  { k: 'LOC', v: 'Pune, IN' },
];

// Keywords for the kinetic band under the hero.
const band = ['Identity', 'Platform', 'Security', 'Backend', 'Cloud', 'Applied AI', 'RAG', 'Java', 'Spring', 'GCP'];

// A single display line that clip-reveals: it sits in an overflow-hidden mask
// and slides up from below. <MotionConfig reducedMotion="user"> collapses the
// translate to an instant fade for reduced-motion users.
function RevealLine({
  children,
  delay = 0,
  className,
  padB = '0.1em',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  padB?: string;
}) {
  // A display line that clip-reveals: sits in an overflow-hidden mask and
  // slides up. <MotionConfig reducedMotion="user"> collapses it to a fade.
  // padB gives the mask bottom room so italic descenders (g, q, y) aren't clipped.
  return (
    <span style={{ display: 'block', overflow: 'hidden', paddingBottom: padB }}>
      <motion.span
        className={className}
        initial={{ y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'block', willChange: 'transform' }}
      >
        {children}
      </motion.span>
    </span>
  );
}

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
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          paddingTop: 'clamp(120px, 18vh, 200px)',
          paddingBottom: 'clamp(60px, 8vh, 100px)',
          opacity: reducedMotion ? 1 : heroOpacity,
          y: reducedMotion ? 0 : heroY,
        }}
      >
        {/* Status pill */}
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
            marginBottom: '34px',
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
          Available for senior / platform roles
        </motion.div>

        {/* Kicker — instant context above the name */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-text)',
            margin: '0 0 6px',
          }}
        >
          Software Engineer · Telstra
        </motion.p>

        {/* Name — geometric grotesk, clip-reveal per line */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(2.6rem, 8.5vw, 6.4rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.04em',
            margin: '0 0 26px',
          }}
        >
          <RevealLine delay={0.2}>Rushikesh</RevealLine>
          <RevealLine delay={0.34} className="hero-accent" padB="0.2em">
            Hulage
          </RevealLine>
        </h1>

        {/* Thesis */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)',
            lineHeight: 1.5,
            maxWidth: '32ch',
            color: 'var(--text-secondary)',
            fontWeight: 400,
            margin: '0 0 34px',
          }}
        >
          I build and secure the <GradientText>platforms</GradientText> other teams
          ship on — backend, cloud, and{' '}
          <RotatingWord
            className="hero-accent"
            words={['applied AI', 'RAG systems', 'secure APIs', 'ML pipelines']}
          />
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: '100%',
            maxWidth: '640px',
            gap: '10px 44px',
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0',
            padding: '22px 0',
            marginBottom: '38px',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {meta.map((m) => (
            <div key={m.k}>
              <span style={{ color: 'var(--accent-text)', fontWeight: 700 }}>{m.k} </span>
              {m.v}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '16px', marginBottom: '42px' }}
        >
          <Magnetic>
            <a href="#projects" className="btn-primary">
              View selected work <span>↗</span>
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
          transition={{ duration: 0.6, delay: 0.92 }}
          style={{ display: 'flex', justifyContent: 'flex-start', gap: '14px' }}
        >
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              title={label}
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
      </motion.div>

      {/* Kinetic keyword band — full-bleed, bold */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="marquee"
        aria-hidden="true"
        style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}
      >
        <div className="marquee-row">
          {[...band, ...band].map((w, i) => (
            <span key={i}>
              <b>◆</b>
              {w}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
