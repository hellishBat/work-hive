// AbsenceChip
'use client'

import { BriefcaseMedical, TreePalm } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib'

type AbsenceType = 'Sick' | 'Vacation'

type AbsenceChipProps = {
  type: AbsenceType
  className?: string
}

export const AbsenceChip = ({ type, className }: AbsenceChipProps) => {
  const t = useTranslations('Common') // namespace common → Absence

  const config = {
    Sick: {
      icon: (
        <BriefcaseMedical className="h-3 w-3 text-rose-700 dark:text-rose-300" />
      ),
      bg: 'bg-rose-800/10 dark:bg-rose-300/10',
      border: 'border-rose-600/40 dark:border-rose-300/40',
      text: 'text-rose-700 dark:text-rose-300',
    },
    Vacation: {
      icon: <TreePalm className="h-3 w-3 text-lime-700 dark:text-lime-300" />,
      bg: 'bg-lime-800/10 dark:bg-lime-300/10',
      border: 'border-lime-600/40 dark:border-lime-300/40',
      text: 'text-lime-700 dark:text-lime-300',
    },
  }[type]

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

export default AbsenceChip
