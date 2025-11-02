// Action: Log In
'use server'

import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase/server'

/**
 * Authenticates user via Supabase email/password
 * and redirects to dashboard on success.
 */
export const loginAction = async (formData: FormData) => {
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '').trim()

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.session) {
    console.error('Login failed:', error?.message)
    return { error: 'Invalid credentials' }
  }

  // Session is automatically stored via cookies
  redirect('/dashboard')
}
