// Footer
'use client'

import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Footer: React.FC<{ className?: string }> = ({ className }) => (
  <footer
    className={cn(
      'flex w-full items-center justify-center gap-2 border-t border-gray-800 bg-gray-950 p-4 text-sm text-gray-400',
      className
    )}
  >
    <span>Coded with</span>
    <Heart className="h-4 w-4 text-red-500" />
    <span>by Valentine Samoylov</span>
  </footer>
)
