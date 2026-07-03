import ImageUploadField from './ImageUploadField';
import type { BlogPost } from '@/types/content';

export default function BlogForm({
  action,
  post,
}: {
  action: (formData: FormData) => void | Promise<void>;
  post?: BlogPost;
}) {
  return (
    <form action={action} className="glass-card" style={{ padding: '32px', display: 'grid', gap: '20px' }}>
      <input type="hidden" name="existing_published_at" value={post?.published_at ?? ''} readOnly />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label className="form-label">Title</label>
          <input name="title" className="form-input" defaultValue={post?.title} required />
        </div>
        <div>
          <label className="form-label">Slug</label>
          <input
            name="slug"
            className="form-input"
            defaultValue={post?.slug}
            required
            pattern="[a-z0-9-]+"
            title="lowercase letters, numbers, hyphens only"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Excerpt</label>
        <textarea name="excerpt" className="form-input" rows={2} defaultValue={post?.excerpt ?? ''} />
      </div>

      <ImageUploadField name="cover_image_url" label="Cover Image" defaultValue={post?.cover_image_url} />

      <div>
        <label className="form-label">Content (Markdown/MDX)</label>
        <textarea
          name="content"
          className="form-input"
          rows={16}
          style={{ fontFamily: 'var(--font-geist-mono)' }}
          defaultValue={post?.content}
          required
        />
      </div>

      <div>
        <label className="form-label">Tags (comma-separated)</label>
        <input name="tags" className="form-input" defaultValue={post?.tags?.join(', ')} />
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <input type="checkbox" name="published" defaultChecked={post?.published} /> Published
      </label>

      <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
        <span>{post ? 'Save Changes' : 'Publish Post'}</span>
      </button>
    </form>
  );
}
