import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: projectCount }, { count: postCount }, { count: unreadCount }] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('read', false),
  ]);

  const cards = [
    { label: 'Projects', value: projectCount ?? 0, href: '/admin/projects' },
    { label: 'Blog Posts', value: postCount ?? 0, href: '/admin/blog' },
    { label: 'Unread Messages', value: unreadCount ?? 0, href: '/admin/messages' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="glass-card"
            style={{ padding: '24px', textDecoration: 'none', display: 'block' }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{card.value}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>{card.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
