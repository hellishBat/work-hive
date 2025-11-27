// Action: Get User By ID from Supabase
'use server'

import { createSupabaseServerAction } from '@/lib'

export const getUserById = async (id: string) => {
  const supabase = await createSupabaseServerAction()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}
