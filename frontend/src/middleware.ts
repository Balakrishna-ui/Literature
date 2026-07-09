import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const pathname = request.nextUrl.pathname;
  
  const isAdminPath = pathname.startsWith('/admin');
  const isLoginPath = pathname === '/admin/login';
  
  const isApiPath = pathname.startsWith('/api');
  const isAuthApi = pathname.startsWith('/api/auth');

  // Admin routing logic
  if (!isLoginPath && isAdminPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginPath && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // API protection logic
  if (isApiPath && !isAuthApi) {
    // Only allow GET requests for unauthenticated users, protect POST, PUT, DELETE
    if (request.method !== 'GET' && !token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
