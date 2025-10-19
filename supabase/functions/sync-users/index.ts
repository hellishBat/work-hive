// SyncUsers function for Supabase Edge
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    // Fetch all auth users via Admin API
    const res = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/auth/v1/admin/users`,
      {
        headers: {
          apiKey: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
          Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!}`,
        },
      }
    )
    if (!res.ok)
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`)

    const { users } = await res.json()
    if (!Array.isArray(users)) throw new Error('Users data is not an array')

    // Fetch all employees corresponding to users
    const emails = users.map((u) => u.email).filter(Boolean)
    const { data: employees } = await supabase
      .from('employees')
      .select('id, email, role, name')
      .in('email', emails)

    const roleMap = ['user', 'manager', 'admin', 'owner']

    // Fetch existing profiles
    const userIds = users.map((u) => u.id)
    const { data: existingProfiles } = await supabase
      .from('profiles')
      .select('*')
      .in('id', userIds)

    // Lookup maps
    const empMap = new Map(employees?.map((e) => [e.email, e]))
    const profileMap = new Map(existingProfiles?.map((p) => [p.id, p]))

    const upsertData: any[] = []

    for (const user of users) {
      if (!user.email) continue

      const emp = empMap.get(user.email)
      const existing = profileMap.get(user.id)

      // Prepare object for upsert
      const profileUpdate: any = {}

      // Only set name if not exists
      if (!existing?.name) {
        profileUpdate.name = emp?.name || user.email.split('@')[0]
      }

      // Only set role if not exists
      if (!existing?.role && emp?.role !== undefined && emp?.role !== null) {
        profileUpdate.role = roleMap[emp.role] ?? 'user'
      }

      // Always set employee_id and has_timetracker
      if (!existing?.employee_id && emp?.id) profileUpdate.employee_id = emp.id
      if (
        existing?.has_timetracker === null ||
        existing?.has_timetracker === undefined
      ) {
        profileUpdate.has_timetracker = !!emp
      }

      // Timestamps
      const now = new Date().toISOString()
      if (!existing) profileUpdate.created_at = now
      if (Object.keys(profileUpdate).length > 0) profileUpdate.updated_at = now

      // Only upsert if there are changes or new record
      if (Object.keys(profileUpdate).length > 0) {
        upsertData.push({ id: user.id, email: user.email, ...profileUpdate })
      }
    }

    if (upsertData.length > 0) {
      const { error } = await supabase
        .from('profiles')
        .upsert(upsertData, { onConflict: ['id'] })
      if (error) console.error('Batch upsert failed:', error)
    }

    return new Response(
      JSON.stringify({ status: 'ok', synced: upsertData.length }),
      { status: 200 }
    )
  } catch (err: any) {
    console.error('Sync failed:', err)
    return new Response(
      JSON.stringify({ status: 'error', error: err.message }),
      { status: 500 }
    )
  }
})
