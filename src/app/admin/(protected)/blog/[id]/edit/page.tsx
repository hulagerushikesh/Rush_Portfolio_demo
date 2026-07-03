import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import BlogForm from '@/components/admin/BlogForm';
import { updateBlogPost } from '@/app/actions/blog';
import type { BlogPost } from '@/types/content';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single();

  if (!post) notFound();

  const updateWithId = updateBlogPost.bind(null, post.id);

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>Edit Blog Post</h1>
      <BlogForm action={updateWithId} post={post as BlogPost} />
    </div>
  );
}
