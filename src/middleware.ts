import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = process.env.AUTH_TOKEN
const USER = process.env.AUTH_USER

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization')

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')

    if (scheme === 'Basic') {
      const buff = Buffer.from(encoded, 'base64')
      const [user, pass] = buff.toString().split(':')
      if (user === 'admin' && pass === PASSWORD) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

// Run on all paths
export const config = {
  matcher: ['/:path*'],
}
