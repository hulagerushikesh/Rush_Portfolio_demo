import { notFound } from 'next/navigation';
import { getBlogPostById } from '@/lib/admin-content';
import BlogForm from '@/components/admin/BlogForm';
import { updateBlogPost } from '@/app/actions/blog';
import type { BlogPost } from '@/types/content';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) notFound();

  const updateWithId = updateBlogPost.bind(null, post.id);

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>Edit Blog Post</h1>
      <BlogForm action={updateWithId} post={post as BlogPost} />
    </div>
  );
}
