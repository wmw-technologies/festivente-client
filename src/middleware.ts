import { NextResponse, type NextRequest } from 'next/server';

const AUTH_ROUTE = '/sign-in';
const PANEL_ROUTE = '/';
const PUBLIC_ROUTES = ['/sign-in'];

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const isAuthenticated = !!request.cookies.get('auth');
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated) return NextResponse.redirect(new URL(PANEL_ROUTE, nextUrl));
  if (!isAuthenticated && !isPublicRoute) return NextResponse.redirect(new URL(AUTH_ROUTE, nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
