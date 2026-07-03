import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProjectForm from '@/components/admin/ProjectForm';
import { updateProject } from '@/app/actions/projects';
import type { Project } from '@/types/content';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single();

  if (!project) notFound();

  const updateWithId = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>Edit Project</h1>
      <ProjectForm action={updateWithId} project={project as Project} />
    </div>
  );
}
