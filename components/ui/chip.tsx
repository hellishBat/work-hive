// Chip
import { JSX } from 'react'
import { cn } from '@/lib'

interface ChipProps {
  icon: JSX.Element
  label: string
  bg: string
  border: string
  text: string
  className?: string
}

export const Chip = ({
  icon,
  label,
  bg,
  border,
  text,
  className,
}: ChipProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.5rem] leading-0 font-medium',
      bg,
      border,
      text,
      className
    )}
  >
    {icon}
    {label}
  </span>
)
