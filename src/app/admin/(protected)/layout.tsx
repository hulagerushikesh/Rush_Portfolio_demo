import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/actions/auth';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/messages', label: 'Messages' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <header
        className="glass"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Link href="/admin" className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: 800, textDecoration: 'none' }}>
            R. Admin
          </Link>
          <nav style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</span>
          <form action={signOut}>
            <button type="submit" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>{children}</main>
    </div>
  );
}
