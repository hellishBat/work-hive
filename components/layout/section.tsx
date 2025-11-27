// Section
'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib'

interface SectionProps {
  title: string
  description?: string
  className?: string
  children: ReactNode
}

export const Section = ({
  title,
  description,
  className,
  children,
}: SectionProps) => {
  return (
    <section className={cn('m-0 px-6 pt-6 pb-12', className)}>
      <div className="container">
        <h2
          className={`text-primary text-3xl font-bold ${cn('mb-2', !description && 'mb-6')}`}
        >
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground mb-6">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
