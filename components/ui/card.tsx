// Card
'use client'

import { cn } from '@/lib'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-gray-900 text-gray-200 shadow-md',
    outlined: 'bg-gray-950 border border-gray-800 text-gray-200',
  }

  const sizes = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <div
      className={cn(variants[variant], sizes[size], 'rounded-xl', className)}
      {...props}
    >
      {children}
    </div>
  )
}
