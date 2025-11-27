// // Constants
export const ROLE_MAP = {
  '0': 'User',
  '1': 'Manager',
  '2': 'Admin',
  '3': 'Owner',
} as const

export type RoleKey = keyof typeof ROLE_MAP // '0' | '1' | '2' | '3'
export type RoleName = (typeof ROLE_MAP)[RoleKey] // 'User' | 'Manager' | 'Admin' | 'Owner'
// lib/constants/links.ts

// export const LINKS = {
//   // Public
//   HOME: '/',
//   LOGIN: '/login',

//   // Dashboard
//   DASHBOARD: '/dashboard',
//   ANALYTICS: '/dashboard/analytics',
//   TEAM: '/dashboard/team',
//   SETTINGS: '/dashboard/settings',

//   // Dynamic
//   teamMember: (id: string) => `/dashboard/team/${id}` as const,
//   employee: (id: string) => `/dashboard/employee/${id}` as const,
// } as const

// // Helper for i18n routes
// export const withLocale = (locale: string, path: string) =>
//   `/${locale}${path === '/' ? '' : path}` as const
