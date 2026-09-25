'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Magnetic from '@/components/ui/Magnetic';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { usePrefersReducedMotion } from '@/lib/motion';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/hulagerushikesh', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushikesh-hulage-46018522b/', Icon: LinkedinIcon },
  { label: 'Email', href: 'mailto:hulagerushikesh@gmail.com', Icon: Mail },
];

const meta = [
  { k: 'ROLE /', v: 'Identity & Platform Engineer' },
  { k: 'AT /', v: 'Telstra' },
  { k: 'LOC /', v: 'Pune, IN' },
];

// Renders text as per-letter spans that rise into place — used for the hero
// name. Framer's <MotionConfig reducedMotion="user"> collapses these to an
// instant fade for reduced-motion users, so no manual gate is needed.
function RisingLetters({ text, delay = 0, color }: { text: string; delay?: number; color?: string }) {
  return (
    <span style={{ color, display: 'inline-block' }}>
      {[...text].map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', willChange: 'transform' }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
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
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div className="grid-bg" aria-hidden="true" />

      <motion.div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          paddingTop: 'clamp(120px, 18vh, 200px)',
          paddingBottom: 'clamp(80px, 12vh, 140px)',
          opacity: reducedMotion ? 1 : heroOpacity,
          y: reducedMotion ? 0 : heroY,
        }}
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-strong)',
            padding: '6px 13px',
            borderRadius: 'var(--radius-full)',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              position: 'relative',
              width: '7px',
              height: '7px',
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
                border: '1px solid var(--accent-primary)',
              }}
            />
          </span>
          Available for senior / platform roles
        </motion.div>

        {/* Name — mono display, per-letter rise */}
        <h1
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontWeight: 600,
            fontSize: 'clamp(2.6rem, 9vw, 6rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            margin: '0 0 26px',
          }}
        >
          <RisingLetters text="Rushikesh" delay={0.2} />
          <br />
          <RisingLetters text="Hulage" delay={0.2 + 0.28} color="var(--text-muted)" />
        </h1>

        {/* Thesis */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)',
            lineHeight: 1.5,
            maxWidth: '32ch',
            color: 'var(--text-primary)',
            margin: '0 0 38px',
          }}
        >
          I build and secure the <GradientText>platforms</GradientText> other teams
          ship on — backend, cloud, and applied <GradientText>AI</GradientText>.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px 40px',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.03em',
            padding: '20px 0',
            marginBottom: '34px',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {meta.map((m) => (
            <div key={m.k}>
              <span style={{ color: 'var(--text-muted)' }}>{m.k} </span>
              {m.v}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '40px' }}
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
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: 'flex', gap: '14px' }}
        >
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              title={label}
              className="glow-hover"
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                transition: 'all var(--transition-base)',
                textDecoration: 'none',
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ color: 'var(--accent-primary)' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
