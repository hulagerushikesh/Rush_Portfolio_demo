import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/firebase/session-cookie';

// Middleware runs on the Edge runtime, which cannot execute the Firebase Admin
// SDK — so this is a presence check for redirect UX only. The actual auth
// boundary is getSessionUser() in the (protected) layout and server actions,
// which cryptographically verifies the cookie.
export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === '/admin/login';

  if (!isLoginRoute && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
