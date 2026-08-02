import 'server-only';
import { adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS, queryToRecords, toRecord } from '@/lib/firebase/collections';
import type { Project, BlogPost, ContactMessage } from '@/types/content';

const byNewest = (a: { created_at: string }, b: { created_at: string }) =>
  (b.created_at ?? '').localeCompare(a.created_at ?? '');

export async function getAllProjects(): Promise<Project[]> {
  const projects = await queryToRecords<Project>(adminDb().collection(COLLECTIONS.projects));
  return projects.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || byNewest(a, b));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await queryToRecords<BlogPost>(adminDb().collection(COLLECTIONS.blogPosts));
  return posts.sort(byNewest);
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  const messages = await queryToRecords<ContactMessage>(adminDb().collection(COLLECTIONS.messages));
  return messages.sort(byNewest);
}

export async function getProjectById(id: string): Promise<Project | null> {
  return toRecord<Project>(await adminDb().collection(COLLECTIONS.projects).doc(id).get());
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return toRecord<BlogPost>(await adminDb().collection(COLLECTIONS.blogPosts).doc(id).get());
}

export async function getDashboardCounts() {
  const db = adminDb();
  const [projects, posts, unread] = await Promise.all([
    db.collection(COLLECTIONS.projects).count().get(),
    db.collection(COLLECTIONS.blogPosts).count().get(),
    db.collection(COLLECTIONS.messages).where('read', '==', false).count().get(),
  ]);

  return {
    projectCount: projects.data().count,
    postCount: posts.data().count,
    unreadCount: unread.data().count,
  };
}
