// RoleChip
'use client'

import { JSX } from 'react'
import { Crown, Medal, User, Users } from 'lucide-react'
import { Chip } from '@/components/ui'

export type RoleType = 'User' | 'Manager' | 'Admin' | 'Owner'

interface RoleChipProps {
  role: RoleType
  label?: string
  className?: string
}

const ROLE_CONFIG: Record<
  RoleType,
  { icon: JSX.Element; bg: string; border: string; text: string }
> = {
  User: {
    icon: <User className="h-3 w-3 text-blue-700 dark:text-blue-300" />,
    bg: 'bg-blue-800/10 dark:bg-blue-300/10',
    border: 'border-blue-600/40 dark:border-blue-300/40',
    text: 'text-blue-700 dark:text-blue-300',
  },
  Manager: {
    icon: <Users className="h-3 w-3 text-green-700 dark:text-green-300" />,
    bg: 'bg-green-800/10 dark:bg-green-300/10',
    border: 'border-green-600/40 dark:border-green-300/40',
    text: 'text-green-700 dark:text-green-300',
  },
  Admin: {
    icon: <Medal className="h-3 w-3 text-fuchsia-700 dark:text-fuchsia-300" />,
    bg: 'bg-fuchsia-800/10 dark:bg-fuchsia-300/10',
    border: 'border-fuchsia-600/40 dark:border-fuchsia-300/40',
    text: 'text-fuchsia-700 dark:text-fuchsia-300',
  },
  Owner: {
    icon: <Crown className="h-3 w-3 text-amber-700 dark:text-amber-300" />,
    bg: 'bg-amber-800/10 dark:bg-amber-300/10',
    border: 'border-amber-600/40 dark:border-amber-300/40',
    text: 'text-amber-700 dark:text-amber-300',
  },
}

export const RoleChip = ({ role, label, className }: RoleChipProps) => {
  const config = ROLE_CONFIG[role]
  return <Chip {...config} label={label ?? role} className={className} />
}
