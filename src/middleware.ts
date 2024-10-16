import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  //   const isLoggedIn = true;
  //   const { pathname } = request.nextUrl;

  //   if (pathname === '/sign-in') {
  //     return isLoggedIn ? NextResponse.redirect(new URL('/dashboard', request.url)) : NextResponse.next();
  //   }

  //   return isLoggedIn ? NextResponse.next() : NextResponse.redirect(new URL('/sign-in', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
