// // useLogin.ts
// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export const useLogin = () => {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // Login function
//   const login = async (email: string, password: string) => {
//     setLoading(true)
//     setError(null)

//     try {
//       // Call server login route
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       })

//       if (!res.ok) {
//         const { error: serverError } = await res.json()
//         setError(serverError || 'Login failed')
//         return false
//       }

//       // JWT cookies are set HttpOnly on server
//       // Redirect to home page
//       router.push('/dashboard')
//       return true
//     } catch (err) {
//       setError('Something went wrong')
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   return { login, loading, error }
// }
// hooks/useLogin.ts
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'

export const useLogin = () => {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const { error: serverError } = await res.json()
        setError(serverError || 'Login failed')
        return false
      }

      const userRes = await fetch('/api/auth/me')
      const { user } = await userRes.json()
      setUser(user)

      router.push('/dashboard')
      return true
    } catch (err) {
      setError('Something went wrong')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}
