// Sidebar
'use client'

import { BarChart2, Home, LogOut, Settings, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Logo, LogoIcon } from '@/assets'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib'
import { useSidebarStore } from '@/store/sidebar'
import { Separator } from '../ui/separator'

const NAV_ITEMS = [
  { key: 'dashboard', icon: Home },
  { key: 'analytics', icon: BarChart2 },
  { key: 'team', icon: Users },
  { key: 'settings', icon: Settings },
]

const Sidebar = () => {
  const t = useTranslations('Sidebar')
  const pathname = usePathname()

  const collapsed = useSidebarStore((state) => state.collapsed)

  const currentLocale = pathname.split('/')[1] || 'en'

  const navItems = NAV_ITEMS.map((item) => {
    const href =
      item.key === 'dashboard'
        ? `/${currentLocale}`
        : `/${currentLocale}/${item.key}`
    return { ...item, name: t(item.key), href }
  })

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/' // redirect manually
      } else {
        console.error('Logout failed', res.statusText)
      }
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <aside
      className={cn(
        'bg-sidebar relative flex flex-col rounded-xl border shadow-md transition-all duration-300 ease-in-out',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
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
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={name}
              href={href}
              className={cn(
                'hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-nowrap transition-colors',
                isActive &&
                  'bg-primary text-primary-foreground hover:bg-primary/90',
                collapsed && 'justify-center gap-0 px-2'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{name}</span>}
            </Link>
          )
        })}
      </nav>

      <Separator />

      {/* Logout Button */}
      <div className="p-3">
        <Button
          variant="destructive"
          onClick={handleLogout}
          className={cn(
            'flex w-full items-center gap-2 text-sm',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>{t('logout')}</span>}
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar
