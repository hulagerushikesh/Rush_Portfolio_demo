import Link from 'next/link';
import { getAllProjects } from '@/lib/admin-content';
import { deleteProject } from '@/app/actions/projects';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';
import AdminListItem from '@/components/admin/AdminListItem';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Project } from '@/types/content';

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Projects</h1>
        <Button asChild size="sm">
          <Link href="/admin/projects/new">+ New Project</Link>
        </Button>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {((projects as Project[]) ?? []).map((project, i) => (
          <AdminListItem key={project.id} index={i}>
            <Card className="flex flex-wrap items-center justify-between gap-4 p-4 px-5">
              <div>
                <div style={{ fontWeight: 600 }}>{project.title}</div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{project.slug}</span>
                  <Badge variant={project.published ? 'accent' : 'muted'}>
                    {project.published ? 'Published' : 'Draft'}
                  </Badge>
                  {project.featured && <Badge variant="outline">Featured</Badge>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/admin/projects/${project.id}/edit`}>Edit</Link>
                </Button>
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
            </Card>
          </AdminListItem>
        ))}
        {(!projects || projects.length === 0) && <p style={{ color: 'var(--text-muted)' }}>No projects yet.</p>}
      </div>
    </div>
  );
}
