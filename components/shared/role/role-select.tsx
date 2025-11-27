// RoleSelect
'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { cn } from '@/lib'
import { ROLE_CONFIG, RoleType } from './'

interface RoleSelectProps {
  value: RoleType
  onChange: (value: RoleType) => void
  t: (key: string) => string
  disabled?: boolean
}

export const RoleSelect: React.FC<RoleSelectProps> = ({
  value,
  onChange,
  t,
  disabled,
}) => {
  const roles: RoleType[] = ['user', 'manager', 'admin', 'owner']
  const selectedConfig = value ? ROLE_CONFIG[value] : null

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          'min-w-40 border transition-colors',
          selectedConfig?.bg,
          selectedConfig?.border,
          selectedConfig?.text
        )}
      >
        {/* <div className="flex items-center gap-2"> */}
        {/* {selectedConfig?.icon} */}
        <SelectValue placeholder={t('table.role')} />
        {/* </div> */}
      </SelectTrigger>

      <SelectContent
        position="popper"
        sideOffset={5}
        className="w-[var(--radix-select-trigger-width)]"
      >
        {roles.map((role) => {
          const config = ROLE_CONFIG[role]

          return (
            <SelectItem key={role} value={role}>
              {config.icon}
              <span className="flex-1">{t(`roles.${role}`)}</span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
