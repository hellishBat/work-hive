// Action: Get the authenticated user's profile from Supabase
'use server'

import { createServerSupabase } from '@/lib/supabase/server'

export const getUserProfile = async () => {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id) // profiles.id = auth.uuid
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return profile
}
