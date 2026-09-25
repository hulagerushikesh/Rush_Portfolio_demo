import { getAllMessages } from '@/lib/admin-content';
import { markMessageRead, deleteMessage } from '@/app/actions/messages';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';
import AdminListItem from '@/components/admin/AdminListItem';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { ContactMessage } from '@/types/content';

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>Messages</h1>
      <div style={{ display: 'grid', gap: '12px' }}>
        {((messages as ContactMessage[]) ?? []).map((msg, i) => (
          <AdminListItem key={msg.id} index={i}>
            <Card
              className="p-5"
              style={{ borderLeft: msg.read ? undefined : '3px solid var(--accent-primary)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{msg.subject}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {msg.name} &lt;{msg.email}&gt; · {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <form action={markMessageRead.bind(null, msg.id, !msg.read)}>
                    <Button type="submit" variant="secondary" size="sm">
                      {msg.read ? 'Mark unread' : 'Mark read'}
                    </Button>
                  </form>
                  <form action={deleteMessage.bind(null, msg.id)}>
                    <ConfirmSubmitButton
                      confirmMessage="Delete this message?"
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '0.8rem', color: '#f87171' }}
                    >
                      Delete
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </div>
              <p style={{ marginTop: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                {msg.message}
              </p>
            </Card>
          </AdminListItem>
        ))}
        {(!messages || messages.length === 0) && <p style={{ color: 'var(--text-muted)' }}>No messages yet.</p>}
      </div>
    </div>
  );
}
