// Supabase Server Action
'use server'

import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/types/db'

// Supabase Client for Server Actions (with cookie management)
export const createSupabaseServerAction = async () => {
  const cookieStore = await cookies() // ← await!

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (e) {
            console.error('Supabase cookie error (Server Action):', e)
          }
        },
      },
    }
  )
}

// Admin Supabase Client for Server Actions (with Service Role Key)
export const createSupabaseAdminAction = async () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
