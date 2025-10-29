// StatusChip
'use client'

import { JSX } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { Chip } from '@/components/ui'

export type StatusType = 'active' | 'inactive'

interface StatusChipProps {
  status: StatusType
  label?: string
  className?: string
}

const STATUS_CONFIG: Record<
  StatusType,
  { icon: JSX.Element; bg: string; border: string; text: string }
> = {
  active: {
    icon: (
      <CheckCircle className="h-3 w-3 text-emerald-700 dark:text-emerald-300" />
    ),
    bg: 'bg-emerald-800/10 dark:bg-emerald-300/10',
    border: 'border-emerald-600/40 dark:border-emerald-300/40',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  inactive: {
    icon: <XCircle className="h-3 w-3 text-rose-700 dark:text-rose-300" />,
    bg: 'bg-rose-800/10 dark:bg-rose-300/10',
    border: 'border-rose-600/40 dark:border-rose-300/40',
    text: 'text-rose-700 dark:text-rose-300',
  },
}

export const StatusChip = ({ status, label, className }: StatusChipProps) => {
  const config = STATUS_CONFIG[status]
  return <Chip {...config} label={label ?? status} className={className} />
}
