import 'server-only';
import { staticProjects, getStaticProjectBySlug } from '@/data/projects';
import type { Project } from '@/types/content';

// The portfolio is content-driven from the static catalog in src/data/projects.ts.
// (Firebase/Firestore and the admin CMS were removed — a portfolio doesn't need a
// database or an auth layer; edit the catalog in code and redeploy.)

export async function getPublishedProjects(): Promise<Project[]> {
  return staticProjects;
}

export async function getPublishedProjectBySlug(slug: string): Promise<Project | null> {
  return getStaticProjectBySlug(slug);
}
