// ThemeSelect
'use client'

import { Laptop, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const ThemeSelect = () => {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('Settings')

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger
        className={cn(
          'bg-card text-card-foreground border-border focus:ring-ring w-[180px] rounded-[var(--radius)]'
        )}
      >
        <SelectValue placeholder={t('themeSystem')} />
      </SelectTrigger>
      <SelectContent className="bg-card text-card-foreground border-border">
        <SelectItem
          value="system"
          className="hover:bg-muted hover:text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Laptop className="text-card-foreground h-4 w-4" />
            <span>{t('themeSystem')}</span>
          </div>
        </SelectItem>
        <SelectItem
          value="dark"
          className="hover:bg-muted hover:text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Moon className="text-card-foreground h-4 w-4" />
            <span>{t('themeDark')}</span>
          </div>
        </SelectItem>
        <SelectItem
          value="light"
          className="hover:bg-muted hover:text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Sun className="text-card-foreground h-4 w-4" />
            <span>{t('themeLight')}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ThemeSelect
