// Dashboard Layout (Client)
'use client'

import React, { useEffect } from 'react'
import { Footer, Header, Sidebar } from '@/components/layout'
import { useAuthStore } from '@/store/auth'

interface Props {
  children: React.ReactNode
  profile: any
}

const DashboardLayoutClient = ({ children, profile }: Props) => {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    if (profile) setUser(profile)
  }, [profile, setUser])

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
    </div>
  )
}

export default DashboardLayoutClient
