// Sidebar
'use client'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { logoutAction } from '@/app/actions/auth/logout'
import { usePathname } from '@/i18n/navigation'
import { cn } from '@/lib'
import { useSidebarStore } from '@/store/ui'
import { SidebarFooter, SidebarLogo, SidebarNav } from './'

interface SidebarProps {
  profile: {
    name?: string | null
    email?: string | null
    role?: string | null
    avatar_url?: string | null
  }
}

export const Sidebar: React.FC<SidebarProps> = ({ profile }) => {
  const t = useTranslations('Sidebar')
  const pathname = usePathname()
  const collapsed = useSidebarStore((state) => state.collapsed)
  const [pending, startTransition] = useTransition()

  const handleLogout = () => startTransition(() => logoutAction())

  return (
    <aside
      className={cn(
        'bg-sidebar flex flex-col border-r shadow-sm transition-all duration-300 ease-in-out',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <SidebarLogo collapsed={collapsed} />
      <SidebarNav pathname={pathname} collapsed={collapsed} t={t} />

      <SidebarFooter
        collapsed={collapsed}
        profile={profile}
        onLogout={handleLogout}
      />
    </aside>
  )
}

export default Sidebar
