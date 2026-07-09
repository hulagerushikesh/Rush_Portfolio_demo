import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { deleteBlogPost } from '@/app/actions/blog';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';
import AdminListItem from '@/components/admin/AdminListItem';
import type { BlogPost } from '@/types/content';

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Blog Posts</h1>
        <Link href="/admin/blog/new" className="btn-primary">
          <span>+ New Post</span>
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {((posts as BlogPost[]) ?? []).map((post, i) => (
          <AdminListItem key={post.id} index={i}>
          <div
            className="glass-card"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{post.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                /blog/{post.slug} · {post.published ? 'Published' : 'Draft'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                href={`/admin/blog/${post.id}/edit`}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Edit
              </Link>
              <form action={deleteBlogPost.bind(null, post.id)}>
                <ConfirmSubmitButton
                  confirmMessage={`Delete "${post.title}"? This can't be undone.`}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#f87171' }}
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
          </AdminListItem>
        ))}
        {(!posts || posts.length === 0) && <p style={{ color: 'var(--text-muted)' }}>No blog posts yet.</p>}
      </div>
    </div>
  );
}
