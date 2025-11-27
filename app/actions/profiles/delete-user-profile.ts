// Action: Delete User Profile
'use server'

import {
  createSupabaseAdminAction,
  createSupabaseServerAction,
} from '@/lib/supabase/server-action'

/**
 * Deletes a user both from Supabase Auth and profiles table.
 * Only allowed for users with role: manager, admin, or owner.
 */
export const deleteUserProfile = async (userId: string) => {
  try {
    // Create Supabase clients
    const supabase = await createSupabaseServerAction() // anon key (for session)
    const supabaseAdmin = await createSupabaseAdminAction() // service role key (full access)

    // 1️⃣ Get current authenticated user
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !currentUser) {
      throw new Error('Unauthorized: no active session')
    }

    // 2️⃣ Get current user profile and check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', currentUser.id)
      .single()

    if (profileError || !profile) {
      throw new Error('Profile not found for current user')
    }

    const allowedRoles = ['manager', 'admin', 'owner']
    if (!allowedRoles.includes(profile.role)) {
      throw new Error('Access denied: insufficient permissions')
    }

    // 3️⃣ Delete user from Supabase Auth (admin API)
    const { error: deleteAuthError } =
      await supabaseAdmin.auth.admin.deleteUser(userId)
    if (deleteAuthError) {
      throw new Error(`Auth deletion failed: ${deleteAuthError.message}`)
    }

    // 4️⃣ Delete corresponding profile record
    const { error: deleteProfileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', userId)

    if (deleteProfileError) {
      throw new Error(`Profile deletion failed: ${deleteProfileError.message}`)
    }

    // ✅ Success
    return { success: true, message: 'User and profile deleted successfully' }
  } catch (error: any) {
    console.error('Error deleting user profile:', error)
    return { success: false, error: error.message }
  }
}
