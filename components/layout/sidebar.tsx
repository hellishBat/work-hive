// Sidebar
'use client'

import { useTransition } from 'react'
import { BarChart2, Home, Settings, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { logoutAction } from '@/app/actions/auth/logout'
import { Logo, LogoIcon } from '@/assets'
import { Separator } from '@/components/ui'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib'
import { useSidebarStore } from '@/store/ui'
import { NavUser } from '../ui/nav-user'

interface SidebarProps {
  profile: {
    name?: string | null
    email?: string | null
    role?: string | null
    avatar_url?: string | null
  }
}

const NAV_ITEMS = [
  { key: 'dashboard', icon: Home },
  { key: 'analytics', icon: BarChart2 },
  { key: 'team', icon: Users },
  { key: 'settings', icon: Settings },
]

const Sidebar: React.FC<SidebarProps> = ({ profile }) => {
  const t = useTranslations('Sidebar')
  const pathname = usePathname()
  const collapsed = useSidebarStore((state) => state.collapsed)
  const [pending, startTransition] = useTransition()

  const currentLocale = pathname.split('/')[1] || 'en'

  const navItems = NAV_ITEMS.map((item) => {
    const href =
      item.key === 'dashboard'
        ? `/${currentLocale}`
        : `/${currentLocale}/${item.key}`
    return { ...item, name: t(item.key), href }
  })

  const handleLogout = () => {
    startTransition(() => logoutAction())
  }

  return (
    <aside
      className={cn(
        'bg-sidebar flex flex-col border-r shadow-sm transition-all duration-300 ease-in-out',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center justify-between px-4 py-5 transition-all',
          collapsed && 'justify-center px-2'
        )}
      >
        <div className="flex items-center justify-center">
          {collapsed ? (
            <LogoIcon
              className="text-primary transition-all"
              width={28}
              height={28}
            />
          ) : (
            <Logo
              className="text-primary transition-all"
              width={130}
              height={28}
              style={{ minWidth: 100 }}
            />
          )}
        </div>
      </div>

      <Separator />

      {/* Navigation */}
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

      {/* Sidebar footer */}
      <div className="border-border flex justify-center border-t px-3 py-1.5">
        <NavUser
          collapsed={collapsed}
          user={{
            name: profile?.name || 'Unknown',
            email: profile?.email || '',
            role: profile?.role || '',
            avatar_url: profile?.avatar_url || '',
          }}
          onLogout={handleLogout}
        />
      </div>
    </aside>
  )
}

export default Sidebar
