import 'server-only';
import { adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS, queryToRecords } from '@/lib/firebase/collections';
import { isFirebaseConfigured } from '@/lib/firebase/config';
import type { Project, BlogPost } from '@/types/content';

// Guards against a slow/unreachable Firestore hanging page renders.
async function withTimeout<T>(promise: PromiseLike<T>, fallback: T, ms = 3000): Promise<T> {
  const timeout = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
  try {
    return await Promise.race([Promise.resolve(promise), timeout]);
  } catch {
    return fallback;
  }
}

// Sorting in memory rather than via orderBy: an equality filter combined with
// orderBy would need a deployed composite index, and this collection is small
// enough that the tradeoff isn't worth the extra deploy step.
function bySortOrderThenNewest(a: Project, b: Project): number {
  const order = (a.sort_order ?? 0) - (b.sort_order ?? 0);
  if (order !== 0) return order;
  return (b.created_at ?? '').localeCompare(a.created_at ?? '');
}

export async function getPublishedProjects(): Promise<Project[]> {
  if (!isFirebaseConfigured()) return [];

  const projects = await withTimeout(
    queryToRecords<Project>(
      adminDb().collection(COLLECTIONS.projects).where('published', '==', true)
    ),
    [] as Project[]
  );

  return projects.sort(bySortOrderThenNewest);
}

export async function getPublishedProjectBySlug(slug: string): Promise<Project | null> {
  if (!isFirebaseConfigured()) return null;

  const matches = await withTimeout(
    queryToRecords<Project>(
      adminDb()
        .collection(COLLECTIONS.projects)
        .where('slug', '==', slug)
        .where('published', '==', true)
        .limit(1)
    ),
    [] as Project[]
  );

  return matches[0] ?? null;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!isFirebaseConfigured()) return [];

  const posts = await withTimeout(
    queryToRecords<BlogPost>(
      adminDb().collection(COLLECTIONS.blogPosts).where('published', '==', true)
    ),
    [] as BlogPost[]
  );

  return posts.sort((a, b) => (b.published_at ?? '').localeCompare(a.published_at ?? ''));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isFirebaseConfigured()) return null;

  const matches = await withTimeout(
    queryToRecords<BlogPost>(
      adminDb()
        .collection(COLLECTIONS.blogPosts)
        .where('slug', '==', slug)
        .where('published', '==', true)
        .limit(1)
    ),
    [] as BlogPost[]
  );

  return matches[0] ?? null;
}
