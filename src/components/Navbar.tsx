'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'skills', name: 'Skills', href: '#skills' },
  { id: 'experience', name: 'Experience', href: '#experience' },
  { id: 'projects', name: 'Projects', href: '#projects' },
  { id: 'achievements', name: 'Achievements', href: '#achievements' },
  { id: 'contact', name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position for navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sections = navItems.map((item) => document.getElementById(item.id));

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
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const id = href.replace('#', '');
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
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    background:
                      activeSection === item.id
                        ? 'rgba(99, 102, 241, 0.15)'
                        : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-full)',
                    color:
                      activeSection === item.id
                        ? 'var(--accent-tertiary)'
                        : 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {item.name}
                </button>
              ))}
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
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    fontWeight: activeSection === item.id ? 700 : 400,
                    color:
                      activeSection === item.id
                        ? 'var(--accent-primary)'
                        : 'var(--text-secondary)',
                    padding: '10px 20px',
                    transition: 'color 0.2s',
                    fontFamily: 'inherit',
                  }}
                >
                  {item.name}
                </motion.button>
              ))}
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
