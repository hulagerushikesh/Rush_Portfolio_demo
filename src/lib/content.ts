import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { Project, BlogPost } from '@/types/content';

// Guards against a slow/unreachable Supabase project hanging page renders.
async function withTimeout<T>(promise: PromiseLike<T>, fallback: T, ms = 3000): Promise<T> {
  const timeout = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
  try {
    return await Promise.race([Promise.resolve(promise), timeout]);
  } catch {
    return fallback;
  }
}

export async function getPublishedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const data = await withTimeout(
    supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .then((res) => res.data),
    null
  );

  return (data as Project[]) ?? [];
}

export async function getPublishedProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const data = await withTimeout(
    supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then((res) => res.data),
    null
  );

  return (data as Project) ?? null;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const data = await withTimeout(
    supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then((res) => res.data),
    null
  );

  return (data as BlogPost[]) ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const data = await withTimeout(
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then((res) => res.data),
    null
  );

  return (data as BlogPost) ?? null;
}
