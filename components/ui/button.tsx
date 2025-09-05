// Button
'use client'

import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'primary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const base = 'rounded-md font-medium transition'

  const variants = {
    default: 'bg-gray-800 text-gray-200 hover:bg-gray-700',
    ghost: 'bg-transparent text-teal-400 hover:bg-gray-800',
    primary: 'bg-teal-500 text-black hover:bg-teal-400',
  }

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
}
