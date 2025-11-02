// SidebarLogo
'use client'

import { Logo, LogoIcon } from '@/assets'
import { cn } from '@/lib'

interface SidebarLogoProps {
  collapsed: boolean
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed }) => {
  return (
    <div
      className={cn(
        'border-border flex items-center justify-between border-b px-4 py-5 transition-all',
        collapsed && 'justify-center px-2'
      )}
    >
      {collapsed ? (
        <LogoIcon className="text-primary" width={28} height={28} />
      ) : (
        <Logo
          className="text-primary"
          width={130}
          height={28}
          style={{ minWidth: 100 }}
        />
      )}
    </div>
  )
}
