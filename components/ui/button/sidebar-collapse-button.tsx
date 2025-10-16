// SidebarCollapseButton
'use client'

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useSidebarStore } from '@/store/sidebar'
import { Button } from './'

export const SidebarCollapseButton = () => {
  const { collapsed, toggle } = useSidebarStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {collapsed ? (
        <PanelLeftOpen className="h-5 w-5" />
      ) : (
        <PanelLeftClose className="h-5 w-5" />
      )}
    </Button>
  )
}
