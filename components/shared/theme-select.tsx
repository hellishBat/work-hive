// ThemeSelect
'use client'

import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'

interface ThemeSelectProps {
  t: (key: string) => string
}

const ThemeSelect = ({ t }: ThemeSelectProps) => {
  const { theme, setTheme } = useTheme()
  // No interal useTranslations here

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger>
        <SelectValue placeholder={t('system')} />
      </SelectTrigger>
      <SelectContent className="bg-card text-card-foreground border-border">
        <SelectItem
          value="system"
          className="hover:bg-muted hover:text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Laptop className="h-4 w-4" />
            <span>{t('system')}</span>
          </div>
        </SelectItem>
        <SelectItem
          value="dark"
          className="hover:bg-muted hover:text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>{t('dark')}</span>
          </div>
        </SelectItem>
        <SelectItem
          value="light"
          className="hover:bg-muted hover:text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>{t('light')}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ThemeSelect
