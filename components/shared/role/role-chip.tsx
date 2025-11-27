// RoleChip
'use client'

import { Chip } from '@/components/ui'
import type { RoleType } from './'
import { ROLE_CONFIG } from './'

interface RoleChipProps {
  role?: string | null
  label?: string
  className?: string
  t?: (key: string) => string
}

export const RoleChip = ({ role, label, className, t }: RoleChipProps) => {
  const normalizedRole: RoleType = (role?.toLowerCase() as RoleType) || 'user'
  const config = ROLE_CONFIG[normalizedRole]

  const displayLabel =
    label ??
    (t
      ? t(`roles.${normalizedRole}`)
      : normalizedRole[0].toUpperCase() + normalizedRole.slice(1))

  return <Chip {...config} label={displayLabel} className={className} />
}
