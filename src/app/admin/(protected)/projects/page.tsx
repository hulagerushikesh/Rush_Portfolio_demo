import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { deleteProject } from '@/app/actions/projects';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';
import AdminListItem from '@/components/admin/AdminListItem';
import type { Project } from '@/types/content';

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary">
          <span>+ New Project</span>
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {((projects as Project[]) ?? []).map((project, i) => (
          <AdminListItem key={project.id} index={i}>
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
              <div style={{ fontWeight: 600 }}>{project.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                /{project.slug} · {project.published ? 'Published' : 'Draft'}
                {project.featured ? ' · Featured' : ''}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Edit
              </Link>
              <form action={deleteProject.bind(null, project.id)}>
                <ConfirmSubmitButton
                  confirmMessage={`Delete "${project.title}"? This can't be undone.`}
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
        {(!projects || projects.length === 0) && <p style={{ color: 'var(--text-muted)' }}>No projects yet.</p>}
      </div>
    </div>
  );
}
