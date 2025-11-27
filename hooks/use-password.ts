// usePassword Hook
'use client'

import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export const usePassword = (initialPassword = '') => {
  const [password, setPassword] = useState(initialPassword)

  const generatePassword = useCallback(() => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let newPassword = ''
    for (let i = 0; i < 16; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
  }, [])

  const copyPassword = useCallback(async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      toast.success('Password copied!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to copy password')
    }
  }, [password])

  return { password, setPassword, generatePassword, copyPassword }
}
