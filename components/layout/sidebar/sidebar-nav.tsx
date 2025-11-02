// SidebarNav
'use client'

import { BarChart2, Home, Settings, Users } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib'

const NAV_ITEMS = [
  { key: 'dashboard', icon: Home },
  { key: 'analytics', icon: BarChart2 },
  { key: 'team', icon: Users },
  { key: 'settings', icon: Settings },
]

interface SidebarNavProps {
  pathname: string
  collapsed: boolean
  t: (key: string) => string
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  pathname,
  collapsed,
  t,
}) => {
  const currentLocale = pathname.split('/')[1] || 'en'

  const navItems = NAV_ITEMS.map((item) => {
    const href =
      item.key === 'dashboard'
        ? `/${currentLocale}`
        : `/${currentLocale}/${item.key}`
    return { ...item, name: t(item.key), href }
  })

  return (
    <nav className="flex flex-1 flex-col gap-1 p-3 pt-6 pl-0">
      {navItems.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={name}
            href={href}
            className={cn(
              'hover:bg-primary/20 hover:text-primary text-foreground flex items-center gap-3 rounded-r-md py-2.5 pr-3 pl-6 text-sm font-semibold text-nowrap transition-colors hover:shadow-md',
              isActive &&
                'bg-primary/30 hover:bg-primary/20 text-primary shadow-sm',
              collapsed && 'justify-center gap-0'
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{name}</span>}
          </Link>
        )
      })}
    </nav>
  )
}
