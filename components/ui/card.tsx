// Card
'use client'

import React from 'react'
import { cn } from '@/lib'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  title?: string
  headerSlot?: React.ReactNode // <-- slot for header actions
}

export const Card: React.FC<CardProps> = ({
  size = 'md',
  title,
  headerSlot,
  className,
  children,
  ...props
}) => {
  const sizes = { sm: 'p-2', md: 'p-4', lg: 'p-6' }

  return (
    <article
      className={cn(
        'bg-card rounded-3xl border shadow-md',
        sizes[size],
        className
      )}
      {...props}
    >
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-primary text-xl font-semibold">{title}</h3>
          {headerSlot && <div>{headerSlot}</div>}
        </div>
      )}
      {children}
    </article>
  )
}
