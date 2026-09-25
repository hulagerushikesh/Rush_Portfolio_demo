'use client';

import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Experience', href: '#experience' },
    { label: 'Stack', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/hulagerushikesh', Icon: GithubIcon },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushikesh-hulage-46018522b/', Icon: LinkedinIcon },
    { label: 'Email', href: 'mailto:hulagerushikesh@gmail.com', Icon: Mail },
  ];

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '52px 32px 34px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '44px',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '9px',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.95rem',
                fontWeight: 600,
                marginBottom: '14px',
                color: 'var(--text-primary)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  boxShadow: '0 0 0 4px color-mix(in srgb, var(--accent-primary) 14%, transparent)',
                }}
              />
              rushikesh.hulage
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '280px' }}>
              Platform &amp; ML engineer. I build and secure the systems other teams ship on.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Index</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link-underline"
                  style={{
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    width: 'max-content',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Channels</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  title={label}
                  className="glow-hover"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-secondary)',
                    transition: 'all var(--transition-base)',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.04em',
            color: 'var(--text-muted)',
          }}
        >
          <span>© {currentYear} RUSHIKESH HULAGE</span>
          <span>PUNE, IN · 18.52°N 73.86°E</span>
          <span>BUILT WITH NEXT.JS + FRAMER MOTION</span>
        </div>
      </div>
    </footer>
  );
}
