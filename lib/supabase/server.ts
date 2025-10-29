// // Supabase Server

// 'use server'

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'
// import type { Database } from '@/lib/types/db'

// /**
//  * Creates a Supabase client for server-side usage (RSC / route handlers).
//  * Uses cookie store getAll/setAll to make it compatible with @supabase/ssr.
//  */
// export const createServerSupabase = async (): Promise<
//   ReturnType<typeof createServerClient<Database>>
// > => {
//   const cookieStore = await cookies()
//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         // supply getAll/setAll as required by the new API
//         getAll: () => cookieStore.getAll(),
//         setAll: (cookiesToSet) => {
//           for (const { name, value, options } of cookiesToSet) {
//             cookieStore.set(name, value, options)
//           }
//         },
//       },
//     }
//   )
// }
// lib/supabase/server.ts
'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/types/db'

export const createServerSupabase = async () => {
  const cookieStore = await cookies()

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options)
            }
          } catch (e) {
            console.error('Supabase cookie error:', e)
          }
        },
      },
    }
  )

  return supabase
}
