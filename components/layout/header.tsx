// Header
'use client'

import { Bell, BellDot } from 'lucide-react'
import { SidebarCollapseButton } from '@/components/shared'
import { Button } from '../ui'

const Header = () => (
  <header className="text-muted-foreground border-border m-0 border-b p-4 pl-6 text-sm">
    <div className="container">
      <div className="flex items-center justify-between">
        <SidebarCollapseButton />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          {/* <span className="relative z-0">
            <BellDot className="h-5 w-5" />
            <span className="absolute top-[3px] right-0.5 -z-10 h-1 w-1 animate-pulse rounded-full bg-red-500"></span>
          </span> */}
        </Button>
      </div>
    </div>
  </header>
)

export default Header
