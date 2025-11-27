// LanguageSelect
'use client'

import { Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'

const LOCALE_CODES = ['en', 'ru', 'uk']

interface LanguageSelectProps {
  t: (key: string) => string
}

const LanguageSelect = ({ t }: LanguageSelectProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1] || 'en'

  const changeLocale = (locale: string) => {
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/'))
  }

  return (
    <Select value={currentLocale} onValueChange={changeLocale}>
      <SelectTrigger id="language-select">
        <SelectValue placeholder={t(currentLocale)} />
      </SelectTrigger>
      <SelectContent className="bg-card text-card-foreground border-border">
        {LOCALE_CODES.map((code) => (
          <SelectItem
            key={code}
            value={code}
            className="hover:bg-muted hover:text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{t(code)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LanguageSelect
