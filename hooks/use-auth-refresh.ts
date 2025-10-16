// useAuthRefresh Hook
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const useAuthRefresh = (intervalMinutes: number = 5) => {
  const router = useRouter()

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await fetch('/api/auth/refresh', { method: 'POST' })
        if (!res.ok) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          router.push('/login')
          return
        }

        const data = await res.json()
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token)
        }
      } catch (err) {
        console.error('Refresh token failed', err)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router.push('/login')
      }
    }

    refreshToken()

    const timer = setInterval(refreshToken, intervalMinutes * 60 * 1000)

    return () => clearInterval(timer)
  }, [router, intervalMinutes])
}
