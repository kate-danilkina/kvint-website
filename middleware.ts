import { NextResponse, type NextRequest } from 'next/server'

// Pages removed for good. 410 tells search engines to drop them faster than a redirect
const GONE = new Set(['/cases/premium-grey-zone'])

export function middleware(req: NextRequest) {
  if (GONE.has(req.nextUrl.pathname)) {
    return new NextResponse('Страница удалена', {
      status: 410,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    })
  }
  return NextResponse.next()
}

export const config = { matcher: ['/cases/:path*'] }
