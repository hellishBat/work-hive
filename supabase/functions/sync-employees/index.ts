// sync-employees Edge Function
// Fetch employees from ScreenshotMonitor and upsert into Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Get environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const SCREENSHOT_MONITOR_TOKEN = Deno.env.get('SCREENSHOT_MONITOR_TOKEN')

// Check environment
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase environment variables are missing')
}
if (!SCREENSHOT_MONITOR_TOKEN) {
  throw new Error('Screenshot Monitor token is missing')
}

// Initialize Supabase client with service role key
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Type definitions
interface Employee {
  id: number
  name: string
  email: string | null
  role?: number
  registered: boolean
  lastActive: number | null
  activityStatus: string
  company?: string
  [key: string]: any
}

export default async function handler(req: Request): Promise<Response> {
  try {
    console.log('Starting ScreenshotMonitor sync...')

    // Fetch data from ScreenshotMonitor API
    const res = await fetch(
      'https://screenshotmonitor.com/api/v2/GetCommonData',
      {
        method: 'GET',
        headers: {
          'X-SSM-Token': SCREENSHOT_MONITOR_TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(
        `ScreenshotMonitor API failed: ${res.status} ${res.statusText} - ${text}`
      )
    }

    const json = await res.json()

    // Extract all employees from all companies
    const employees: Employee[] = []
    if (Array.isArray(json.companies)) {
      for (const company of json.companies) {
        if (Array.isArray(company.employments)) {
          const enriched = company.employments.map((emp) => ({
            ...emp,
            company: company.name, // add company name
          }))
          employees.push(...enriched)
        }
      }
    }

    if (employees.length === 0) {
      return new Response(JSON.stringify({ message: 'No employees to sync' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log(`Found ${employees.length} employees to sync`)

    // Upsert employees in batches
    const batchSize = 50
    let syncedCount = 0

    for (let i = 0; i < employees.length; i += batchSize) {
      const batch = employees.slice(i, i + batchSize)

      const upsertData = batch.map((emp) => ({
        id: String(emp.id),
        name: emp.name || '',
        email: emp.email || null,
        role: emp.role ?? 0,
        registered: emp.registered ?? false,
        company: emp.company || null, // company included
        last_active: emp.lastActive
          ? new Date(emp.lastActive * 1000).toISOString()
          : null, // last active converted
        activity_status: emp.activityStatus || 'offline',
        raw_data: emp,
        synced_at: new Date().toISOString(),
      }))

      const { error } = await supabase.from('employees').upsert(upsertData, {
        onConflict: 'id',
        ignoreDuplicates: false,
      })

      if (error) {
        console.error(
          `Batch ${Math.floor(i / batchSize) + 1} upsert error:`,
          error
        )
        throw new Error(
          `Failed to upsert batch ${Math.floor(i / batchSize) + 1}: ${error.message}`
        )
      }

      syncedCount += batch.length
      console.log(
        `Synced batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
          employees.length / batchSize
        )}`
      )
    }

    console.log(`Successfully synced ${syncedCount} employees`)

    return new Response(
      JSON.stringify({
        message: `Successfully synced ${syncedCount} employees`,
        count: syncedCount,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err: any) {
    console.error('Sync error:', err)
    return new Response(
      JSON.stringify({
        error: err.message,
        timestamp: new Date().toISOString(),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Optional: Run handler if deployed
if (Deno.env.get('DENO_DEPLOYMENT_ID')) {
  Deno.serve(handler)
}
