import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith('/profile') ||
    pathname.startsWith('/new-product') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/offers');
  const isAuthRole = pathname === '/login' || pathname === '/register';

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRole && token) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/new-product/:path*',
    '/login',
    '/register',
    '/settings',
    '/offers',
    '/offers/:path*',
  ],
};
