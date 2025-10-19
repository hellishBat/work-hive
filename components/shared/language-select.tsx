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
import { cn } from '@/lib'

const locales = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
]

const LanguageSelect = () => {
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
      <SelectTrigger
        className={cn(
          'bg-card text-card-foreground border-border focus:ring-ring flex w-[180px] items-center gap-2 rounded-[var(--radius)]'
        )}
        id="language-select"
      >
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent className="bg-card text-card-foreground border-border">
        {locales.map((l) => (
          <SelectItem
            key={l.code}
            value={l.code}
            className="hover:bg-muted hover:text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Globe className="text-card-foreground h-4 w-4" />
              <span>{l.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LanguageSelect
