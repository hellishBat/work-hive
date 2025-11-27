// Action: Get the authenticated user's profile from Supabase
'use server'

import { createSupabaseServerComponent } from '@/lib'

export const getSessionUserProfile = async () => {
  const supabase = await createSupabaseServerComponent()
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
