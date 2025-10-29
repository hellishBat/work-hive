// Supabase Client
'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/db'

export const createClientSupabase = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
