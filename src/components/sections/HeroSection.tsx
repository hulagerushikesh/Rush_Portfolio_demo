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
  color,
  highlight = false,
}: {
  children: React.ReactNode;
  delay?: number;
  color?: string;
  highlight?: boolean;
}) {
  // `highlight` paints a word-width acid-lime block behind the text with ink
  // letters on top — the hero's loudest accent. Extra vertical padding on the
  // clip mask keeps the block from being cropped by the tight 0.86 line-height.
  return (
    <span
      style={{
        display: 'block',
        overflow: 'hidden',
        paddingBottom: highlight ? '0.16em' : '0.06em',
        paddingTop: highlight ? '0.12em' : 0,
      }}
    >
      <motion.span
        initial={{ y: '120%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'block', color, willChange: 'transform' }}
      >
        {highlight ? (
          <span
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--accent-ink)',
              padding: '0.04em 0.16em',
              marginLeft: '-0.16em',
              lineHeight: 1,
              boxDecorationBreak: 'clone',
              WebkitBoxDecorationBreak: 'clone',
              boxShadow: '6px 6px 0 var(--ink)',
            }}
          >
            {children}
          </span>
        ) : (
          children
        )}
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
  // Big ghost index drifts opposite the content for depth.
  const ghostX = useTransform(scrollYProgress, [0, 1], [0, -160]);

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
      <div className="grid-bg" aria-hidden="true" />

      {/* Oversized ghost wordmark behind everything */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-2vw',
          bottom: '14vh',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(8rem, 26vw, 24rem)',
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(10,10,10,0.08)',
          pointerEvents: 'none',
          zIndex: 0,
          x: reducedMotion ? 0 : ghostX,
          userSelect: 'none',
        }}
      >
        RH
      </motion.span>

      <motion.div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
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
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            border: '2px solid var(--ink)',
            padding: '7px 14px',
            marginBottom: '34px',
            background: 'var(--bg-primary)',
            boxShadow: '3px 3px 0 var(--ink)',
          }}
        >
          <span
            style={{
              position: 'relative',
              width: '8px',
              height: '8px',
              background: 'var(--accent-primary)',
            }}
          >
            <span
              className="animate-pulse-glow"
              style={{
                position: 'absolute',
                inset: '-3px',
                border: '1.5px solid var(--accent-text)',
              }}
            />
          </span>
          Available for senior / platform roles
        </motion.div>

        {/* Name — oversized grotesk, clip-reveal per line */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 12vw, 9rem)',
            lineHeight: 0.86,
            letterSpacing: '-0.045em',
            margin: '0 0 30px',
            textTransform: 'uppercase',
          }}
        >
          <RevealLine delay={0.2}>Rushikesh</RevealLine>
          <RevealLine delay={0.34} highlight>
            Hulage
          </RevealLine>
        </h1>

        {/* Thesis */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            fontSize: 'clamp(1.15rem, 2.3vw, 1.6rem)',
            lineHeight: 1.4,
            maxWidth: '30ch',
            color: 'var(--text-primary)',
            fontWeight: 500,
            margin: '0 0 40px',
          }}
        >
          I build and secure the <GradientText>platforms</GradientText> other teams
          ship on — backend, cloud, and applied <GradientText>AI</GradientText>.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px 44px',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.03em',
            padding: '20px 0',
            marginBottom: '38px',
            borderTop: '2px solid var(--ink)',
            borderBottom: '2px solid var(--ink)',
          }}
        >
          {meta.map((m) => (
            <div key={m.k}>
              <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>{m.k} / </span>
              {m.v}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '42px' }}
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
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--ink)',
                background: 'var(--bg-primary)',
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
              <b>✳</b>
              {w}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
