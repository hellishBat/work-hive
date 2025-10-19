// // useAuth Hook
// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

// interface User {
//   id: string
//   email?: string
//   role?: string
//   [key: string]: any
// }

// export const useAuth = (allowedRoles: string[] = []) => {
//   const router = useRouter()
//   const [loading, setLoading] = useState(true)
//   const [user, setUser] = useState<User | null>(null)
//   const [role, setRole] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true)

//       try {
//         const res = await fetch('/api/auth/me', { cache: 'no-store' })
//         if (!res.ok) {
//           router.push('/login')
//           return
//         }

//         const data = await res.json()
//         setUser(data.user as User)
//         setRole((data.user.role as string) || null)

//         if (allowedRoles.length && !allowedRoles.includes(data.user.role)) {
//           router.push('/unauthorized')
//         }
//       } catch (err) {
//         console.error('Fetching user failed', err)
//         router.push('/')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUser()
//   }, [router, allowedRoles])

//   return { user, role, loading }
// }
// hooks/useAuth.ts
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'

export const useAuth = (allowedRoles: string[] = []) => {
  const router = useRouter()
  const { user, setUser, loading, setLoading } = useAuthStore()

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' })
        if (!res.ok) {
          router.push('/login')
          return
        }

        const data = await res.json()
        setUser(data.user)

        if (allowedRoles.length && !allowedRoles.includes(data.user.role)) {
          router.push('/unauthorized')
        }
      } catch (err) {
        console.error('Fetching user failed', err)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router, allowedRoles, setUser, setLoading])

  return { user, loading }
}
