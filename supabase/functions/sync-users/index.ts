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

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()

    // The users array is in json.users
    const users = json.users
    if (!Array.isArray(users)) {
      throw new Error('Users data is not an array')
    }

    for (const user of users) {
      if (!user.email) continue

      // Find employee by email
      const { data: emp, error: empError } = await supabase
        .from('employees')
        .select('id, role')
        .eq('email', user.email)
        .limit(1)
        .single()

      if (empError && empError.code !== 'PGRST116') {
        console.error('Employee lookup failed:', empError)
      }

      const roleMap = ['user', 'manager', 'admin', 'owner']
      const role = emp ? roleMap[emp.role] || 'user' : 'user'

      // Upsert into profiles
      const { error: upsertError } = await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email,
        role,
        employee_id: emp?.id ?? null,
        has_timetracker: !!emp,
        created_at: new Date().toISOString(),
      })

      if (upsertError) {
        console.error('Failed to upsert profile:', upsertError)
      }
    }

    return new Response(
      JSON.stringify({ status: 'ok', synced: users.length }),
      {
        status: 200,
      }
    )
  } catch (err: any) {
    console.error('Sync failed:', err)
    return new Response(
      JSON.stringify({ status: 'error', error: err.message }),
      { status: 500 }
    )
  }
})
