// NavUser
'use client'

import * as Avatar from '@radix-ui/react-avatar'
import { ChevronsUpDown, LogOut, Settings, User } from 'lucide-react'
import { RoleChip } from '@/components/shared'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { cn } from '@/lib'

interface NavUserProps {
  collapsed?: boolean
  user: {
    name?: string | null
    email?: string | null
    role?: string | null
    avatar_url?: string | null
  }
  onLogout?: () => void
}

export const NavUser: React.FC<NavUserProps> = ({
  collapsed = false,
  user,
  onLogout,
}) => {
  const initials =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '?'

  const AvatarBlock = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses =
      size === 'sm' ? 'h-10 w-10' : size === 'lg' ? 'h-16 w-16' : 'h-12 w-12'

    const textSize = size === 'lg' ? 'text-2xl' : 'text-sm'

    return (
      <Avatar.Root
        className={cn(
          'border-border bg-muted relative shrink-0 overflow-hidden rounded-md border',
          sizeClasses
        )}
      >
        <Avatar.Image
          src={user?.avatar_url || ''}
          alt={user?.name || 'User'}
          className="h-full w-full object-cover"
        />
        <Avatar.Fallback
          className={cn(
            'text-primary-foreground flex h-full w-full items-center justify-center font-bold',
            textSize
          )}
        >
          {initials}
        </Avatar.Fallback>
      </Avatar.Root>
    )
  }

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'flex h-12 w-full items-center gap-3 rounded-lg p-2 transition-colors duration-150',
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            // Highlight trigger when dropdown is open
            'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
            collapsed && 'w-12 justify-center px-0'
          )}
        >
          <AvatarBlock size="sm" />
          {!collapsed && (
            <>
              <div className="flex flex-1 flex-col items-start text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        side={collapsed ? 'right' : 'top'}
        align={collapsed ? 'end' : 'center'}
        sideOffset={4}
        className={cn(
          'rounded-lg p-1',
          collapsed
            ? 'min-w-56'
            : 'w-[var(--radix-dropdown-menu-trigger-width)]' // match trigger width
        )}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex min-w-0 flex-1 flex-col items-start p-2">
            <span className="mb-1 w-full truncate overflow-hidden font-medium whitespace-nowrap">
              {user?.name}
            </span>
            <span className="text-muted-foreground mb-2 w-full truncate overflow-hidden text-xs whitespace-nowrap">
              {user?.email}
            </span>
            {user?.role && <RoleChip role={user?.role} />}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <User className="h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
