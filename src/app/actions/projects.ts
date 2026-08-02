'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS, nowIso } from '@/lib/firebase/collections';
import { requireSessionUser } from '@/lib/firebase/session';

function parseProjectForm(formData: FormData) {
  const technologies = String(formData.get('technologies') || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    slug: String(formData.get('slug') || '').trim(),
    title: String(formData.get('title') || '').trim(),
    description: String(formData.get('description') || '').trim(),
    content: String(formData.get('content') || ''),
    image_url: String(formData.get('image_url') || '').trim() || null,
    technologies,
    status: String(formData.get('status') || 'active'),
    featured: formData.get('featured') === 'on',
    github_url: String(formData.get('github_url') || '').trim() || null,
    live_url: String(formData.get('live_url') || '').trim() || null,
    project_date: String(formData.get('project_date') || '').trim() || null,
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') || 0),
  };
}

export async function createProject(formData: FormData) {
  await requireSessionUser();
  const data = parseProjectForm(formData);
  const timestamp = nowIso();

  await adminDb()
    .collection(COLLECTIONS.projects)
    .add({ ...data, created_at: timestamp, updated_at: timestamp });

  revalidatePath('/');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
  await requireSessionUser();
  const data = parseProjectForm(formData);

  await adminDb()
    .collection(COLLECTIONS.projects)
    .doc(id)
    .update({ ...data, updated_at: nowIso() });

  revalidatePath('/');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function deleteProject(id: string) {
  await requireSessionUser();
  await adminDb().collection(COLLECTIONS.projects).doc(id).delete();

  revalidatePath('/');
  revalidatePath('/admin/projects');
}
