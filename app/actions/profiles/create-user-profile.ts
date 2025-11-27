// Action: Create User Profile
'use server'

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/db'

interface CreateUserInput {
  email: string
  password: string
}

export const createUserProfile = async (input: CreateUserInput) => {
  const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  try {
    // 1️⃣ Создаём пользователя в Auth
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.createUser({
        email: input.email,
        password: input.password,
        email_confirm: true, // сразу подтверждён
      })

    if (userError) throw userError
    if (!userData?.user) throw new Error('User creation failed')

    const userId = userData.user.id
    const userEmail = userData.user.email

    // 2️⃣ Синхронизация профиля сразу после создания пользователя
    try {
      // Получаем всех сотрудников с таким email
      const { data: employees } = await supabaseAdmin
        .from('employees')
        .select('id, email, role, name')
        .eq('email', userEmail)

      // Проверяем, есть ли уже профиль
      const { data: existingProfiles } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', userId)

      const emp = employees?.[0]
      const existing = existingProfiles?.[0]

      const roleMap = ['user', 'manager', 'admin', 'owner']
      const now = new Date().toISOString()

      const profileUpdate: any = {
        id: userId,
        email: userEmail,
      }

      if (!existing?.name)
        profileUpdate.name = emp?.name || userEmail?.split('@')[0]
      if (!existing?.role && emp?.role !== undefined)
        profileUpdate.role = roleMap[emp.role] ?? 'user'
      if (!existing?.employee_id && emp?.id) profileUpdate.employee_id = emp.id
      if (
        existing?.has_timetracker === null ||
        existing?.has_timetracker === undefined
      )
        profileUpdate.has_timetracker = !!emp

      if (!existing) profileUpdate.created_at = now
      if (Object.keys(profileUpdate).length > 2) profileUpdate.updated_at = now

      await supabaseAdmin
        .from('profiles')
        .upsert(profileUpdate, { onConflict: ['id'] })
    } catch (syncErr: any) {
      console.error('Profile sync failed:', syncErr)
    }

    return {
      success: true,
      user: userData.user,
    }
  } catch (err: any) {
    console.error('Error creating user profile:', err)
    return { success: false, error: err.message }
  }
}
