import BlogForm from '@/components/admin/BlogForm';
import { createBlogPost } from '@/app/actions/blog';

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>New Blog Post</h1>
      <BlogForm action={createBlogPost} />
    </div>
  );
}
