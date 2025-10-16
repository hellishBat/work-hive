// // Middleware
// import createMiddleware from 'next-intl/middleware'
// import type { NextRequest } from 'next/server'
// import { routing } from '@/i18n/routing'

// // import { verifyJwt } from '@/lib/utils/jwt' // optional if server-side auth

// const i18nMiddleware = createMiddleware(routing)

// export const middleware = async (req: NextRequest) => {
//   // Run i18n middleware first
//   const i18nResponse = await i18nMiddleware(req)
//   if (i18nResponse) return i18nResponse

//   // Optional server-side JWT check (not mandatory if you use useAuth and API)
//   // const token = req.cookies.get('sb-access-token')?.value
//   // if (!token) return redirectToLogin(req)

//   return undefined
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }

// // Optional redirect function if you want server-side auth
// // const redirectToLogin = (req: NextRequest) => {
// //   const url = req.nextUrl.clone()
// //   url.pathname = '/login'
// //   return NextResponse.redirect(url)
// // }
import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'
import { verifyJwt } from '@/lib/utils/jwt'

// i18n middleware
export const withI18n = createMiddleware(routing)

// JWT auth middleware
export const withAuth = async (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const locales = ['en', 'ru', 'uk']

  // Allow public pages (home, next.js internals)
  if (
    pathname === '/' ||
    locales.some((l) => pathname === `/${l}/`) ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get('access_token')?.value
  if (!token) {
    return redirectToHome(req, locales)
  }

  try {
    await verifyJwt(token)
    return NextResponse.next()
  } catch (err) {
    console.error('JWT verification failed:', err)
    return redirectToHome(req, locales)
  }
}

// Redirect to localized home page
const redirectToHome = (req: NextRequest, locales: string[]) => {
  const homeUrl = req.nextUrl.clone()
  const firstSegment = req.nextUrl.pathname.split('/')[1]
  const locale = locales.includes(firstSegment)
    ? firstSegment
    : routing.defaultLocale || 'en'
  homeUrl.pathname = `/${locale}/`
  return NextResponse.redirect(homeUrl)
}

// Combined middleware
export const middleware = async (req: NextRequest) => {
  const i18nResponse = await withI18n(req)
  if (i18nResponse) return i18nResponse

  const authResponse = await withAuth(req)
  return authResponse
}

// Apply to all routes except API & static assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
