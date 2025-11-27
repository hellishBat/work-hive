// Absence constants
'use client'

import { JSX } from 'react'
import { BriefcaseMedical, TreePalm } from 'lucide-react'

export type AbsenceType = 'Sick' | 'Vacation'

export const ABSENCE_CONFIG: Record<
  AbsenceType,
  { icon: JSX.Element; bg: string; border: string; text: string }
> = {
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
}
