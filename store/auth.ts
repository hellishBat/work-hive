// Auth Store
'use client'

import { create } from 'zustand'

interface UserProfile {
  id: string
  email?: string
  role?: string
  name?: string
  employee_id?: string
  [key: string]: any
}

interface AuthState {
  user: UserProfile | null
  loading: boolean
  setUser: (user: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  logout: (locale?: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  logout: async (locale = 'en') => {
    try {
      await fetch(`/${locale}/api/auth/logout`, { method: 'POST' })
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      set({ user: null })
    } catch (err) {
      console.error('Logout failed', err)
    }
  },
}))
