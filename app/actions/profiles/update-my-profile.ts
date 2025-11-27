// Action: Update My Profile
'use server'

import { createSupabaseServerAction } from '@/lib/supabase/server-action'
import { getSessionUserProfile } from './get-session-user-profile'

export const updateMyProfile = async (payload: { name: string }) => {
  const currentUser = await getSessionUserProfile()
  if (!currentUser) throw new Error('Unauthorized')

  const supabase = await createSupabaseServerAction()

  const { data, error } = await supabase
    .from('profiles')
    .update({
      name: payload.name,
      updated_at: new Date().toISOString(),
    })
    .eq('id', currentUser.id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return data
}
