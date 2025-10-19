// Card
'use client'

import { cn } from '@/lib'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  title?: string
}

export const Card: React.FC<CardProps> = ({
  size = 'md',
  title,
  className,
  children,
  ...props
}) => {
  const sizes = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <article
      className={cn(
        'bg-card text-muted-foreground rounded-3xl border shadow-md',
        sizes[size],
        className
      )}
      {...props}
    >
      {title && (
        <h3 className="text-primary mb-4 text-xl font-semibold">{title}</h3>
      )}
      {children}
    </article>
  )
}
