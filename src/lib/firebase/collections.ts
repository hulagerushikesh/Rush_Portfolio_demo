import 'server-only';
import type { DocumentSnapshot, Query } from 'firebase-admin/firestore';

export const COLLECTIONS = {
  projects: 'projects',
  blogPosts: 'blog_posts',
  messages: 'messages',
} as const;

// Firestore has no schema, so a doc written by an older shape can be missing
// fields the UI treats as required. Normalising here keeps every consumer honest.
export function toRecord<T>(snap: DocumentSnapshot): T | null {
  const data = snap.data();
  if (!data) return null;
  return { ...data, id: snap.id } as T;
}

export async function queryToRecords<T>(query: Query): Promise<T[]> {
  const snap = await query.get();
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }) as T);
}

export function nowIso(): string {
  return new Date().toISOString();
}
