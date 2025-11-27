// Action: Get Team Profiles from Supabase
'use server'

import { createSupabaseServerAction } from '@/lib/supabase/server-action'

export const getTeamProfiles = async () => {
  const supabase = await createSupabaseServerAction()

  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, role, has_timetracker, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching team profiles:', error)
    throw new Error('Failed to fetch team profiles')
  }

  return data
}
