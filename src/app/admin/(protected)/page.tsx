import Link from 'next/link';
import CountUp from '@/components/ui/CountUp';
import { getDashboardCounts } from '@/lib/admin-content';

export default async function AdminDashboardPage() {
  const { projectCount, postCount, unreadCount } = await getDashboardCounts();

  const cards = [
    { label: 'Projects', value: projectCount, href: '/admin/projects' },
    { label: 'Blog Posts', value: postCount, href: '/admin/blog' },
    { label: 'Unread Messages', value: unreadCount, href: '/admin/messages' },
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
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              <CountUp value={String(card.value)} />
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>{card.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
