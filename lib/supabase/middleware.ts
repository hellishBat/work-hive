// Supabase Middleware
'use server'

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/lib/types/db'

/**
 * Ensures Supabase session cookies are refreshed on each request.
 * This keeps the user logged in across SSR, RSC, and client transitions.
 */
export const updateSession = async (request: NextRequest) => {
  const response = NextResponse.next()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options)
          }
        },
      },
    }
  )

  // Refresh session if expired
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.warn('Session refresh failed:', error.message)
  }

  return response
}
