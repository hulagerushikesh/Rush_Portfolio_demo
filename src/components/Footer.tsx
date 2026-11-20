const links = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div
        style={{
          maxWidth: 'var(--maxw)',
          margin: '0 auto',
          padding: '28px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
        }}
      >
        <span>© {currentYear} Rushikesh Hulage</span>
        <nav aria-label="Footer" className="footer-index" style={{ display: 'flex', gap: '20px' }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="link-underline"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
