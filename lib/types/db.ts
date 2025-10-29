// // Lib Types
// export type Employee = {
//   id: string
//   name: string
//   email?: string | null
//   role?: number | null
//   registered?: boolean | null
//   last_active?: string | null // ISO timestamp
//   activity_status?: 'online' | 'offline' | string | null
//   raw_data?: Record<string, any> | null
//   synced_at?: string | null
//   created_at?: string | null
//   updated_at?: string | null
//   company?: string | null
// }

// export type Profile = {
//   id: string // uuid
//   role?: 'user' | 'admin' | 'manager' | 'owner' | string | null
//   created_at?: string | null
//   has_timetracker?: boolean | null
//   employee_id?: string | null
//   email?: string | null
// }

// export type WorkLog = {
//   id: number // bigint in DB mapped to number
//   user_id: string
//   started_at: string // ISO timestamp
//   ended_at?: string | null
//   duration_minutes?: number | null
//   project?: string | null
//   notes?: string | null
// }

// export type Database = {
//   employees: Employee
//   profiles: Profile
//   work_logs: WorkLog
// }
// Typed Supabase schema
export type Employee = {
  id: string
  name: string
  email?: string | null
  role?: number | null
  registered?: boolean | null
  last_active?: string | null
  activity_status?: 'online' | 'offline' | string | null
  raw_data?: Record<string, unknown> | null
  synced_at?: string | null
  created_at?: string | null
  updated_at?: string | null
  company?: string | null
}

export type Profile = {
  id: string
  name?: string | null
  email?: string | null
  role?: 'user' | 'admin' | 'manager' | 'owner' | string | null
  employee_id?: string | null
  has_timetracker?: boolean | null
  created_at?: string | null
  updated_at?: string | null
}

export type WorkLog = {
  id: number
  user_id: string
  started_at: string
  ended_at?: string | null
  duration_minutes?: number | null
  project?: string | null
  notes?: string | null
}

export type Database = {
  employees: Employee
  profiles: Profile
  work_logs: WorkLog
}
