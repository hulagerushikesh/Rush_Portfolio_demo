import ProjectForm from '@/components/admin/ProjectForm';
import { createProject } from '@/app/actions/projects';

export default function NewProjectPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>New Project</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
