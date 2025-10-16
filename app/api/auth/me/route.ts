// API Auth Me Route
'use server'

import { NextResponse } from 'next/server'
import { verifyJwt } from '@/lib/utils/jwt'

// GET /api/auth/me
export const GET = async (req: Request) => {
  const cookieHeader = req.headers.get('cookie') || ''
  const accessToken = cookieHeader
    .split('; ')
    .find((c) => c.startsWith('access_token='))
    ?.split('=')[1]

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await verifyJwt(accessToken)
    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
