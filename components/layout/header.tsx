// Header
'use client'

import * as Avatar from '@radix-ui/react-avatar'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarCollapseButton } from '@/components/ui/button/sidebar-collapse-button'

const Header = () => (
  <header className="border-border bg-card text-card-foreground flex items-center justify-between border-b p-4 shadow-md">
    <div className="flex items-center gap-4">
      <SidebarCollapseButton />
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
    </div>

    <Avatar.Root className="bg-muted relative h-8 w-8 overflow-hidden rounded-full">
      <Avatar.Image
        className="h-full w-full object-cover"
        src="/path-to-avatar.jpg"
        alt="User Avatar"
      />
      <Avatar.Fallback
        className="bg-muted text-primary-foreground flex h-full w-full items-center justify-center text-sm font-bold"
        delayMs={600}
      >
        W
      </Avatar.Fallback>
    </Avatar.Root>
  </header>
)

export default Header
