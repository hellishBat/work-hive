// SidebarFooter
'use client'

import { NavUser } from './nav-user'

interface SidebarFooterProps {
  collapsed: boolean
  profile: {
    name?: string | null
    email?: string | null
    role?: string | null
    avatar_url?: string | null
  }
  onLogout: () => void
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  collapsed,
  profile,
  onLogout,
}) => {
  return (
    <div className="border-border flex justify-center border-t px-3 py-1.5">
      <NavUser
        collapsed={collapsed}
        user={{
          name: profile?.name || 'Unknown',
          email: profile?.email || '',
          role: profile?.role || '',
          avatar_url: profile?.avatar_url || '',
        }}
        onLogout={onLogout}
      />
    </div>
  )
}
