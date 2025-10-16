// // API Auth Logout Route
// 'use server'

// import { NextResponse } from 'next/server'

// // POST /api/auth/logout
// export const POST = async () => {
//   const isProd = process.env.NODE_ENV === 'production'

//   const clearCookie = (name: string) =>
//     [
//       `${name}=`,
//       'HttpOnly',
//       'Path=/',
//       'Max-Age=0',
//       isProd ? 'Secure' : '',
//       'SameSite=Lax',
//     ]
//       .filter(Boolean)
//       .join('; ')

//   const response = NextResponse.json({ success: true })
//   response.headers.append('Set-Cookie', clearCookie('access_token'))
//   response.headers.append('Set-Cookie', clearCookie('refresh_token'))

//   return response
// }
'use server'

import { NextResponse } from 'next/server'

export const POST = async () => {
  const isProd = process.env.NODE_ENV === 'production'

  const clearCookie = (name: string) =>
    [
      `${name}=`,
      'HttpOnly',
      'Path=/',
      'Max-Age=0',
      isProd ? 'Secure' : '',
      'SameSite=Lax',
    ]
      .filter(Boolean)
      .join('; ')

  const response = NextResponse.json({ success: true })

  // Clear cookies
  response.headers.append('Set-Cookie', clearCookie('access_token'))
  response.headers.append('Set-Cookie', clearCookie('refresh_token'))

  return response
}
