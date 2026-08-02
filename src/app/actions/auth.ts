'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from '@/lib/firebase/session-cookie';

export async function signOut() {
  (await cookies()).set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  redirect('/admin/login');
}
