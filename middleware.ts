import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const publicRoutes: string[] = ['/login', '/register', '/']
  const privateRoutes: string[] = ['/admin', '/dashboard', '/profile']
  const isPublicRoute: boolean = publicRoutes.includes(request.nextUrl.pathname)
  const isPrivateRoute: boolean = privateRoutes.includes(
    request.nextUrl.pathname,
  )

  console.log('Middleware executing for path:', request.nextUrl.pathname)
  console.log('Token:', token)
  console.log('Is public route:', isPublicRoute)
  console.log('Is private route:', isPrivateRoute)

  if (isPrivateRoute && !token) {
    console.log('Redirecting to login: no token for private route')
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  if (isPublicRoute && token) {
    console.log('Redirecting to dashboard: token exists on public route')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  console.log('Proceeding with request')
  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register', '/', '/admin', '/dashboard', '/profile'],
}
