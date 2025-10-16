// Constants
export const ROLE_MAP = {
  '0': 'User',
  '1': 'Manager',
  '2': 'Admin',
  '3': 'Owner',
} as const

export type RoleKey = keyof typeof ROLE_MAP // '0' | '1' | '2' | '3'
export type RoleName = (typeof ROLE_MAP)[RoleKey] // 'User' | 'Manager' | 'Admin' | 'Owner'
