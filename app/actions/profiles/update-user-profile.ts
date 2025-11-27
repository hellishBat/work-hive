'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerAction } from '@/lib/supabase/server-action'
import { getSessionUserProfile } from './get-session-user-profile'

export const updateUserProfile = async (
  id: string,
  updates: { name?: string; role?: string; has_timetracker?: boolean }
) => {
  const currentUser = await getSessionUserProfile()
  if (!currentUser) throw new Error('Unauthorized')

  const allowed = ['manager', 'admin', 'owner']
  if (!allowed.includes(currentUser.role)) {
    throw new Error('Forbidden: insufficient role')
  }

  const supabase = await createSupabaseServerAction()

  const { error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/team')
  return { success: true }
}
