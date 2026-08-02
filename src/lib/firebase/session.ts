import 'server-only';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { isFirebaseConfigured } from '@/lib/firebase/config';
import { SESSION_COOKIE } from '@/lib/firebase/session-cookie';

export { SESSION_COOKIE, SESSION_MAX_AGE_MS } from '@/lib/firebase/session-cookie';

export interface SessionUser {
  uid: string;
  email: string | null;
}

/**
 * The real auth boundary. Middleware only checks that a cookie exists (the Edge
 * runtime cannot run the Admin SDK), so every protected surface must call this.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  if (!isFirebaseConfigured()) return null;

  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return null;

  try {
    const claims = await adminAuth().verifySessionCookie(cookie, true);
    return { uid: claims.uid, email: claims.email ?? null };
  } catch {
    return null;
  }
}

export async function requireSessionUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error('Not authenticated');
  return user;
}
