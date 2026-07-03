'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const MotionLink = motion.create(Link);

const navItems = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'projects', name: 'Projects', href: '#projects' },
  { id: 'blog', name: 'Blog', href: '/blog' },
  { id: 'experience', name: 'Experience', href: '#experience' },
  { id: 'skills', name: 'Skills', href: '#skills' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'achievements', name: 'Achievements', href: '#achievements' },
  { id: 'contact', name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (pathname.startsWith('/blog')) {
      setActiveSection('blog');
    }
  }, [pathname]);

  // Track scroll position for navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with Intersection Observer (re-attach when the
  // route changes, since section elements only exist on the home page).
  useEffect(() => {
    if (pathname !== '/') return;

    const observers: IntersectionObserver[] = [];
    const sections = navItems
      .filter((item) => item.href.startsWith('#'))
      .map((item) => document.getElementById(item.id));

    sections.forEach((section) => {
      if (!section) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const id = href.replace('#', '');

    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          position: 'fixed',
          top: '16px',
          left: 0,
          right: 0,
          margin: '0 auto',
          zIndex: 100,
          width: 'calc(100% - 48px)',
          maxWidth: '1100px',
          padding: '14px 32px',
          borderRadius: 'var(--radius-xl)',
          background: scrolled
            ? 'rgba(10, 10, 15, 0.88)'
            : 'rgba(10, 10, 15, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${scrolled ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
          boxShadow: scrolled ? 'var(--shadow-glow)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
          }}
        >
          {/* Logo — left */}
          <button
            onClick={() => handleNavClick('#home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              fontWeight: 800,
              padding: 0,
              transition: 'transform 0.2s',
              justifySelf: 'start',
            }}
            className="gradient-text"
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            R.
          </button>

          {/* Desktop nav — center */}
          <div
            style={{
              display: 'none',
              gap: '6px',
              alignItems: 'center',
              justifySelf: 'center',
            }}
            className="desktop-nav"
          >
            {navItems
              .filter((item) => item.id !== 'home')
              .map((item) => {
                const isActive = activeSection === item.id;
                const style: React.CSSProperties = {
                  position: 'relative',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  color: isActive ? 'var(--accent-tertiary)' : 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                };
                const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                };
                const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                };
                const pill = isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(217, 119, 6, 0.15)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                );

                if (item.href.startsWith('#')) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.href)}
                      style={style}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    >
                      {pill}
                      {item.name}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={style}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  >
                    {pill}
                    {item.name}
                  </Link>
                );
              })}
          </div>

          {/* Right spacer for desktop — balances the grid */}
          <div className="desktop-nav-spacer" style={{ display: 'none', justifySelf: 'end' }} />

          {/* Right spacer / Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              position: 'relative',
              width: '28px',
              height: '24px',
              justifySelf: 'end',
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                height: '2px',
                width: '100%',
                background: 'var(--text-primary)',
                borderRadius: '2px',
                transition: 'all 0.3s',
                top: isMenuOpen ? '11px' : '4px',
                transform: isMenuOpen ? 'rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '11px',
                height: '2px',
                width: '100%',
                background: 'var(--text-primary)',
                borderRadius: '2px',
                transition: 'all 0.3s',
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 0,
                height: '2px',
                width: '100%',
                background: 'var(--text-primary)',
                borderRadius: '2px',
                transition: 'all 0.3s',
                top: isMenuOpen ? '11px' : '18px',
                transform: isMenuOpen ? 'rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 10, 15, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 99,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                const style: React.CSSProperties = {
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  padding: '10px 20px',
                  transition: 'color 0.2s',
                  fontFamily: 'inherit',
                  textDecoration: 'none',
                };

                if (item.href.startsWith('#')) {
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={() => handleNavClick(item.href)}
                      style={style}
                    >
                      {item.name}
                    </motion.button>
                  );
                }

                return (
                  <MotionLink
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                    style={style}
                  >
                    {item.name}
                  </MotionLink>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-nav-spacer {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
