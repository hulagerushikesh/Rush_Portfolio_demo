'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

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
  const supabase = await createClient();
  const data = parseProjectForm(formData);

  const { error } = await supabase.from('projects').insert(data);
  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = parseProjectForm(formData);

  const { error } = await supabase.from('projects').update(data).eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/admin/projects');
}
