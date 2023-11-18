import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// this middleware will check if the user is logged in and redirect to the login page if not. if the user is logged in, it will continue to the next middleware or route handler witch allowed the user to access the page

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath =
    path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  } else if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/profile', '/login', '/signup', '/profile/:id'],
}
