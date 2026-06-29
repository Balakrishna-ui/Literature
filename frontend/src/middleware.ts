import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPath = request.nextUrl.pathname === '/admin/login';

  // If user is not logged in and tries to access admin routes
  if (!isLoginPath && isAdminPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If user is logged in and tries to access login page
  if (isLoginPath && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
