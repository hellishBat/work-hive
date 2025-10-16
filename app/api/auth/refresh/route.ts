// API Auth Refresh Route
'use server'

import { NextResponse } from 'next/server'
import { signJwt, verifyRefreshJwt } from '@/lib/utils/jwt'

// POST /api/auth/refresh
export const POST = async (req: Request) => {
  const cookieHeader = req.headers.get('cookie') || ''
  const refreshToken = cookieHeader
    .split('; ')
    .find((c) => c.startsWith('refresh_token='))
    ?.split('=')[1]

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Missing refresh token' },
      { status: 401 }
    )
  }

  try {
    const decoded = await verifyRefreshJwt(refreshToken)
    const newAccessToken = signJwt(
      { id: decoded.sub, role: decoded.role },
      '1h'
    )
    const isProd = process.env.NODE_ENV === 'production'

    const cookieString = [
      `access_token=${newAccessToken}`,
      'HttpOnly',
      'Path=/',
      `Max-Age=${60 * 60}`,
      isProd ? 'Secure' : '',
      'SameSite=Lax',
    ]
      .filter(Boolean)
      .join('; ')

    const response = NextResponse.json({ success: true })
    response.headers.append('Set-Cookie', cookieString)
    return response
  } catch {
    return NextResponse.json(
      { error: 'Invalid refresh token' },
      { status: 401 }
    )
  }
}
