// AbsenceChip
'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib'
import { ABSENCE_CONFIG, AbsenceType } from './constants'

interface AbsenceChipProps {
  type: AbsenceType
  className?: string
}

export const AbsenceChip = ({ type, className }: AbsenceChipProps) => {
  const t = useTranslations('Common')
  const config = ABSENCE_CONFIG[type]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.5rem] leading-0 font-medium',
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      {config.icon}
      {t(`Absence.${type}`)}
    </span>
  )
}
