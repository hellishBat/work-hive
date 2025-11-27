// AbsenceSelect
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
import { ABSENCE_CONFIG } from './'
import type { AbsenceType } from './'

interface AbsenceSelectProps {
  value: AbsenceType
  onChange: (value: AbsenceType) => void
  t: (key: string) => string
  disabled?: boolean
}

export const AbsenceSelect: React.FC<AbsenceSelectProps> = ({
  value,
  onChange,
  t,
  disabled,
}) => {
  const types: AbsenceType[] = ['Sick', 'Vacation']

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="min-w-[150px]">
        <SelectValue placeholder={t('Absence.select')} />
      </SelectTrigger>

      <SelectContent>
        {types.map((type) => {
          const config = ABSENCE_CONFIG[type]
          return (
            <SelectItem
              key={type}
              value={type}
              className={cn(
                `flex items-center gap-2 rounded-md px-2 py-1`,
                `data-[highlighted]:bg-[${config.bg}] data-[highlighted]:text-[${config.text}]`,
                `data-[state=checked]:bg-[${config.bg}] data-[state=checked]:text-[${config.text}]`
              )}
            >
              {config.icon}
              <span className="flex-1">{t(`Absence.${type}`)}</span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
