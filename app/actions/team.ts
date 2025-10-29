// Actions: Team Management
'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabase as createServerClient } from '@/lib/supabase/server'

// Fetch all team members
export async function getTeamProfiles() {
  const supabase = await createServerClient()

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

// Fetch single user by ID
export async function getUserById(id: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

// Create new user (admin only)
export async function createUser({
  email,
  name,
  role,
}: {
  email: string
  name: string
  role: string
}) {
  const supabase = await createServerClient()

  // Create user in Auth
  const { data: user, error: authError } = await supabase.auth.admin.createUser(
    {
      email,
      email_confirm: true,
      user_metadata: { full_name: name },
    }
  )

  if (authError) throw authError

  // Profile will be auto-created by Edge Function sync-users
  revalidatePath('/dashboard/team')
  return user
}

// Delete user
export async function deleteUser(userId: string) {
  const supabase = await createServerClient()

  // Delete from Auth
  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) throw error

  // profiles record will be deleted by cascade or manually
  await supabase.from('profiles').delete().eq('id', userId)

  revalidatePath('/dashboard/team')
}
