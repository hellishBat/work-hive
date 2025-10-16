// Footer
'use client'

import { Heart } from '@/assets'
import { cn } from '@/lib/utils'

const Footer: React.FC<{ className?: string }> = ({ className }) => (
  <footer
    className={cn(
      'text-secondary border-border bg-card flex w-full items-center justify-center gap-2 border-t py-4 text-xs',
      className
    )}
  >
    <span>Coded with</span>
    <Heart className="opacity-50" />
    <span>by Valentine Samoylov for NYKS Solutions</span>
  </footer>
)

export default Footer
