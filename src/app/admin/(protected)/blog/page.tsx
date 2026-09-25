import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/admin-content';
import { deleteBlogPost } from '@/app/actions/blog';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';
import AdminListItem from '@/components/admin/AdminListItem';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { BlogPost } from '@/types/content';

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Blog Posts</h1>
        <Button asChild size="sm">
          <Link href="/admin/blog/new">+ New Post</Link>
        </Button>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {((posts as BlogPost[]) ?? []).map((post, i) => (
          <AdminListItem key={post.id} index={i}>
            <Card className="flex flex-wrap items-center justify-between gap-4 p-4 px-5">
              <div>
                <div style={{ fontWeight: 600 }}>{post.title}</div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/blog/{post.slug}</span>
                  <Badge variant={post.published ? 'accent' : 'muted'}>
                    {post.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/admin/blog/${post.id}/edit`}>Edit</Link>
                </Button>
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
            </Card>
          </AdminListItem>
        ))}
        {(!posts || posts.length === 0) && <p style={{ color: 'var(--text-muted)' }}>No blog posts yet.</p>}
      </div>
    </div>
  );
}
