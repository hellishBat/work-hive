// Settings Page
'use client'

import { useState } from 'react'
import { Mail, Save, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SectionWrapper } from '@/components/layout'
import { LanguageSelect, ThemeSelect } from '@/components/shared'
import {
  Button,
  Card,
  Input,
  Label,
  SelectGroup,
  SelectLabel,
} from '@/components/ui'

const SettingsPage = () => {
  const t = useTranslations('Settings')
  const [username, setUsername] = useState('WorkHive User')
  const [email, setEmail] = useState('user@workhive.com')

  const handleSave = () => alert(t('saveSettings'))

  return (
    <SectionWrapper title={t('title')}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card size="lg" title={t('userProfile')}>
          <div className="flex flex-col">
            <div className="mb-4 flex flex-col gap-2">
              <Label
                htmlFor="username"
                className="text-muted-foreground text-sm font-medium"
              >
                {t('username')}
              </Label>
              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-input text-foreground border-border rounded-[var(--radius)] pl-10"
                  placeholder={t('username')}
                />
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-muted-foreground text-sm font-medium"
              >
                {t('email')}
              </Label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input text-foreground border-border rounded-[var(--radius)] pl-10"
                  placeholder={t('email')}
                />
              </div>
            </div>

            <Button
              variant="default"
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {t('saveSettings')}
            </Button>
          </div>
        </Card>
        <Card size="lg" title={t('interfaceSettings')}>
          <div className="flex flex-col gap-4">
            <SelectGroup>
              <SelectLabel>{t('theme')}</SelectLabel>
              <ThemeSelect />
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>{t('language')}</SelectLabel>
              <LanguageSelect />
            </SelectGroup>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  )
}

export default SettingsPage
