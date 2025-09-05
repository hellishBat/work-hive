'use client'

import { BarChart2, Folder, Home, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Projects', href: '/dashboard/projects', icon: Folder },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="hidden min-h-screen w-64 flex-col bg-gray-900 p-4 text-gray-300 md:flex">
      <div className="mb-6 text-xl font-bold text-teal-400">WorkHive</div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded px-3 py-2 transition-colors hover:bg-gray-800',
                isActive && 'bg-gray-800 text-teal-400'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
