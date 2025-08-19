import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD = process.env.AUTH_TOKEN;
const APP_ENV = process.env.APP_ENV; // local | staging | production

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip auth for Next internal routes and static assets (e.g., public files)
  if (pathname.startsWith('/_next') || /\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Skip authentication for local environment
  if (APP_ENV === 'local' || APP_ENV === 'production') {
    return NextResponse.next();
  }

  // Currently basic auth for both staging and production
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');

    if (scheme === 'Basic') {
      const buff = Buffer.from(encoded, 'base64');
      const [user, pass] = buff.toString().split(':');
      if (user === 'admin' && pass === PASSWORD) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Run on all paths
export const config = {
  matcher: ['/:path*'],
};
