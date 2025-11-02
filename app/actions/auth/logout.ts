// Action: Log out
'use server'

import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase/server'

/**
 * Logs out the current user and clears Supabase cookies.
 */
export const logoutAction = async () => {
  const supabase = await createServerSupabase()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.warn('Logout failed:', error.message)
  }

  redirect('/login')
}
