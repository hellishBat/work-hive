// SectionWrapper
'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib'

interface SectionWrapperProps {
  title: string
  description?: string
  className?: string
  children: ReactNode
}

export const SectionWrapper = ({
  title,
  description,
  className,
  children,
}: SectionWrapperProps) => {
  return (
    <section className={cn('pt-4 pl-6', className)}>
      <h2
        className={`text-primary text-3xl font-bold ${cn('mb-2', !description && 'mb-6')}`}
      >
        {title}
      </h2>
      {description && <p className="text-secondary mb-6">{description}</p>}
      {children}
    </section>
  )
}
