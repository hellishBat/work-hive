// Loader
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { LogoIcon } from '@/assets'
import { cn } from '@/lib'

type SizeKey = 'sm' | 'md' | 'lg'

interface LogoLoaderProps {
  loading?: boolean
  size?: SizeKey | number
  className?: string
  ariaLabel?: string
  minDuration?: number // optional: defaults to 1500ms
}

const SIZE_MAP: Record<SizeKey, string> = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({
  loading = false,
  size = 'md',
  className,
  ariaLabel = 'Loading',
  minDuration = 1500, // default minimum show time
}) => {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Ensure loader stays visible for at least minDuration
  useEffect(() => {
    if (loading) {
      setVisible(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    // loading is false → keep it visible for minDuration more
    if (visible) {
      timerRef.current = setTimeout(() => {
        setVisible(false)
      }, minDuration)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [loading, minDuration, visible])

  // Loader is completely hidden
  if (!visible) return null

  const sizeClass = typeof size === 'number' ? `${size}px` : SIZE_MAP[size]

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn('inline-flex items-center', className)}
    >
      <LogoIcon
        className={cn(
          typeof size === 'number' ? undefined : sizeClass,
          'transition-transform duration-300 ease-in-out motion-safe:animate-spin'
        )}
        style={
          typeof size === 'number' ? { width: size, height: size } : undefined
        }
      />
      <span className="sr-only">{ariaLabel}</span>
    </span>
  )
}

export default LogoLoader
