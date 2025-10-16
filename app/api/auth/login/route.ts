// API Auth Login Route
'use server'

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { signJwt, signRefreshJwt } from '@/lib/utils/jwt'

// POST /api/auth/login
export const POST = async (req: Request) => {
  const { email, password } = await req.json()

  const supabaseServer = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabaseServer.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const payload = {
    id: data.user.id,
    email: data.user.email,
    role: data.user.user_metadata?.role ?? 'user',
  }

  const accessToken = signJwt(payload, '1h')
  const refreshToken = signRefreshJwt(
    { sub: data.user.id, role: payload.role },
    '7d'
  )
  const isProd = process.env.NODE_ENV === 'production'

  // Function to build cookie string
  const cookieString = (name: string, token: string, maxAge: number) =>
    [
      `${name}=${token}`,
      'HttpOnly',
      'Path=/',
      `Max-Age=${maxAge}`,
      isProd ? 'Secure' : '',
      'SameSite=Lax',
    ]
      .filter(Boolean)
      .join('; ')

  const response = NextResponse.json({ user: payload })
  response.headers.append(
    'Set-Cookie',
    cookieString('access_token', accessToken, 60 * 60)
  )
  response.headers.append(
    'Set-Cookie',
    cookieString('refresh_token', refreshToken, 60 * 60 * 24 * 7)
  )

  return response
}
