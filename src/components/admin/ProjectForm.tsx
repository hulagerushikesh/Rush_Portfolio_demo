import ImageUploadField from './ImageUploadField';
import type { Project } from '@/types/content';

export default function ProjectForm({
  action,
  project,
}: {
  action: (formData: FormData) => void | Promise<void>;
  project?: Project;
}) {
  return (
    <form action={action} className="glass-card" style={{ padding: '32px', display: 'grid', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label className="form-label">Title</label>
          <input name="title" className="form-input" defaultValue={project?.title} required />
        </div>
        <div>
          <label className="form-label">Slug</label>
          <input
            name="slug"
            className="form-input"
            defaultValue={project?.slug}
            required
            pattern="[a-z0-9-]+"
            title="lowercase letters, numbers, hyphens only"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-input"
          rows={3}
          defaultValue={project?.description}
          required
        />
      </div>

      <div>
        <label className="form-label">Content (optional, long-form details)</label>
        <textarea name="content" className="form-input" rows={6} defaultValue={project?.content} />
      </div>

      <ImageUploadField name="image_url" label="Image" defaultValue={project?.image_url} />

      <div>
        <label className="form-label">Technologies (comma-separated)</label>
        <input name="technologies" className="form-input" defaultValue={project?.technologies?.join(', ')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label className="form-label">GitHub URL</label>
          <input name="github_url" className="form-input" defaultValue={project?.github_url ?? ''} />
        </div>
        <div>
          <label className="form-label">Live URL</label>
          <input name="live_url" className="form-input" defaultValue={project?.live_url ?? ''} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <label className="form-label">Status</label>
          <select name="status" className="form-input" defaultValue={project?.status ?? 'active'}>
            <option value="active">Active</option>
            <option value="coming-soon">Coming Soon</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label className="form-label">Date</label>
          <input name="project_date" className="form-input" defaultValue={project?.project_date ?? ''} placeholder="2026" />
        </div>
        <div>
          <label className="form-label">Sort Order</label>
          <input name="sort_order" type="number" className="form-input" defaultValue={project?.sort_order ?? 0} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <input type="checkbox" name="featured" defaultChecked={project?.featured} /> Featured
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <input type="checkbox" name="published" defaultChecked={project?.published ?? true} /> Published
        </label>
      </div>

      <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
        <span>{project ? 'Save Changes' : 'Create Project'}</span>
      </button>
    </form>
  );
}
