'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS, nowIso } from '@/lib/firebase/collections';
import { requireSessionUser } from '@/lib/firebase/session';

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
    published_at: published ? (existingPublishedAt ?? nowIso()) : existingPublishedAt,
  };
}

export async function createBlogPost(formData: FormData) {
  await requireSessionUser();
  const data = parseBlogForm(formData);
  const timestamp = nowIso();

  await adminDb()
    .collection(COLLECTIONS.blogPosts)
    .add({ ...data, created_at: timestamp, updated_at: timestamp });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireSessionUser();
  const data = parseBlogForm(formData);

  await adminDb()
    .collection(COLLECTIONS.blogPosts)
    .doc(id)
    .update({ ...data, updated_at: nowIso() });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function deleteBlogPost(id: string) {
  await requireSessionUser();
  await adminDb().collection(COLLECTIONS.blogPosts).doc(id).delete();

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}
