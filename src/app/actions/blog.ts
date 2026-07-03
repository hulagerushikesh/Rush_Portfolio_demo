'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function parseBlogForm(formData: FormData) {
  const tags = String(formData.get('tags') || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const published = formData.get('published') === 'on';
  const existingPublishedAt = String(formData.get('existing_published_at') || '').trim() || null;

  return {
    slug: String(formData.get('slug') || '').trim(),
    title: String(formData.get('title') || '').trim(),
    excerpt: String(formData.get('excerpt') || '').trim() || null,
    content: String(formData.get('content') || ''),
    cover_image_url: String(formData.get('cover_image_url') || '').trim() || null,
    tags,
    published,
    published_at: published ? existingPublishedAt ?? new Date().toISOString() : existingPublishedAt,
  };
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient();
  const data = parseBlogForm(formData);

  const { error } = await supabase.from('blog_posts').insert(data);
  if (error) throw new Error(error.message);

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = parseBlogForm(formData);

  const { error } = await supabase.from('blog_posts').update(data).eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}
