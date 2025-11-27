// Dashboard Layout (Client)
'use client'

import React, { useEffect } from 'react'
import { Footer, Header, Sidebar } from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'
import { useAuthStore } from '@/store/auth'

interface Props {
  children: React.ReactNode
  profile: any
}

const DashboardLayoutClient = ({ children, profile }: Props) => {
  const setUser = useAuthStore((s) => s.setUser)
  const setLoading = useAuthStore((s) => s.setLoading)

  useEffect(() => {
    if (profile) {
      setUser(profile)
    }

    setLoading(false)
  }, [profile, setUser, setLoading])

  return (
    <div className="bg-background flex flex-1">
      <Sidebar profile={profile} />
      <main className="flex flex-1 flex-col space-y-4">
        {profile ? (
          <>
            <Header />
            {children}
            <Footer />
          </>
        ) : (
          <div className="p-4 text-red-500">
            No profile found — please log in
          </div>
        )}
      </main>
      <Toaster />
    </div>
  )
}

export default DashboardLayoutClient
