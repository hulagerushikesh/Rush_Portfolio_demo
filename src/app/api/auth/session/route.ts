import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { isFirebaseConfigured } from '@/lib/firebase/config';
import { SESSION_COOKIE, SESSION_MAX_AGE_MS } from '@/lib/firebase/session-cookie';

export const runtime = 'nodejs';

const ALLOWED_ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export async function POST(request: Request) {
  if (!isFirebaseConfigured()) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const { idToken } = await request.json().catch(() => ({ idToken: null }));
  if (typeof idToken !== 'string' || !idToken) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  try {
    const decoded = await adminAuth().verifyIdToken(idToken, true);

    // Firebase Auth lets any account in the project sign in. The portfolio has
    // exactly one legitimate admin, so gate on an explicit allowlist.
    const email = decoded.email?.toLowerCase();
    if (ALLOWED_ADMIN_EMAILS.length && (!email || !ALLOWED_ADMIN_EMAILS.includes(email))) {
      return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
    }

    const sessionCookie = await adminAuth().createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_MS,
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_MS / 1000,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  return response;
}
