import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/admin-content';
import ProjectForm from '@/components/admin/ProjectForm';
import { updateProject } from '@/app/actions/projects';
import type { Project } from '@/types/content';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  const updateWithId = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>Edit Project</h1>
      <ProjectForm action={updateWithId} project={project as Project} />
    </div>
  );
}
