import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the user visits the root path '/', redirect to '/movies'
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/movies';
    return NextResponse.redirect(url);
  }

  // Allow all other requests to continue
  return NextResponse.next();
}

// Optional: specify which paths this middleware applies to (all paths here)
export const config = {
  matcher: ['/'],
};
