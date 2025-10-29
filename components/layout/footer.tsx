// Footer
'use client'

import { useTranslations } from 'next-intl'
import { Heart } from '@/assets'
import { cn } from '@/lib'

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations('Common.footer')

  return (
    <footer
      className={cn(
        'text-muted-foreground border-border mt-auto w-full border-t py-5 text-xs leading-5',
        className
      )}
    >
      <div className="container">
        <div className="flex items-center justify-center gap-2">
          <span>{t('codedWith')}</span>
          <Heart />
          <span>{t('by')}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
