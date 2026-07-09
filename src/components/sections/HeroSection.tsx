'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail } from 'lucide-react';
import ParticleBackground from '@/components/ui/ParticleBackground';
import GradientText from '@/components/ui/GradientText';
import Magnetic from '@/components/ui/Magnetic';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { usePrefersReducedMotion } from '@/lib/motion';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/hulagerushikesh', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushikesh-hulage-46018522b/', Icon: LinkedinIcon },
  { label: 'Email', href: 'mailto:hulagerushikesh@gmail.com', Icon: Mail },
];

const roles = [
  'Software Engineer',
  'ML Engineer',
  'Cloud Architect',
  'Platform Engineer',
];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  useEffect(() => {
    if (reducedMotion) return;
    const role = roles[currentRole];

    // Full word typed: rest with a blinking cursor, then start deleting.
    if (!isDeleting && displayText === role) {
      setIsIdle(true);
      const timeout = setTimeout(() => {
        setIsIdle(false);
        setIsDeleting(true);
      }, 2200);
      return () => clearTimeout(timeout);
    }

    // Fully deleted: move on to the next role.
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
      return;
    }

    // Human-ish variable keystroke timing.
    const delay = isDeleting ? 35 + Math.random() * 25 : 55 + Math.random() * 60;
    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting ? displayText.slice(0, -1) : role.slice(0, displayText.length + 1)
      );
    }, delay);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, reducedMotion]);

  // Reduced motion: show the first role statically, no typing loop.
  const typedText = reducedMotion ? roles[0] : displayText;
  // Terminal-style syntax pass: the role's last word gets the accent color.
  const typedWords = typedText.split(' ');
  const typedHead = typedWords.slice(0, -1).join(' ');
  const typedTail = typedWords[typedWords.length - 1] ?? '';

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <ParticleBackground />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 24px',
          // Style-bound motion values bypass MotionConfig — gate manually.
          opacity: reducedMotion ? 1 : heroOpacity,
          y: reducedMotion ? 0 : heroY,
          scale: reducedMotion ? 1 : heroScale,
        }}
      >
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'rgba(217, 119, 6, 0.1)',
            border: '1px solid rgba(217, 119, 6, 0.2)',
            borderRadius: '9999px',
            marginBottom: '24px',
            fontSize: '0.9rem',
            color: 'var(--accent-tertiary)',
          }}
        >
          Hey there, I&apos;m
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          <GradientText>Rushikesh Hulage</GradientText>
        </motion.h1>

        {/* Typewriter Role — terminal-window chrome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'inline-block',
            textAlign: 'left',
            marginBottom: '24px',
            minWidth: '300px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-glass)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'rgba(255, 247, 237, 0.02)',
            }}
          >
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }} />
            <span
              style={{
                marginLeft: '8px',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              whoami.sh
            </span>
          </div>
          <div
            style={{
              padding: '14px 18px',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 'clamp(1rem, 2.8vw, 1.4rem)',
              minHeight: '2.5rem',
              fontWeight: 500,
            }}
          >
            <span style={{ color: 'var(--accent-primary)' }}>$</span>{' '}
            <span style={{ color: 'var(--text-primary)' }}>
              {typedHead}
              {typedHead && ' '}
            </span>
            <span style={{ color: 'var(--accent-tertiary)' }}>{typedTail}</span>
            {/* Cursor: solid while typing, blinks only while resting — like a real terminal. */}
            {!reducedMotion && (
              <span
                style={{
                  color: 'var(--accent-primary)',
                  marginLeft: '2px',
                }}
                className={isIdle ? 'animate-typewriter-cursor' : undefined}
              >
                |
              </span>
            )}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
          }}
        >
          I build and ship production systems — from secure cloud infrastructure
          to AI pipelines that solve problems other teams rely on.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          <Magnetic>
            <a href="#projects" className="btn-primary">
              <span>View My Work ↓</span>
            </a>
          </Magnetic>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              title={label}
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-glass)',
                color: 'var(--text-secondary)',
                transition: 'all 0.3s',
                textDecoration: 'none',
              }}
              className="glow-hover"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '24px',
            height: '40px',
            border: '2px solid var(--border-subtle)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8px',
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 12] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '3px',
              height: '8px',
              borderRadius: '2px',
              background: 'var(--accent-primary)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
