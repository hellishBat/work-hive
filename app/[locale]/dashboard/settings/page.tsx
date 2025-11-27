// Settings Page
'use client'

import { useEffect, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { updateMyProfile } from '@/app/actions/profiles/update-my-profile'
import { Section } from '@/components/layout'
import { LanguageSelect, ThemeSelect, UserItem } from '@/components/shared'
import {
  Card,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui'
import { useAuthStore } from '@/store/auth'

export const SettingsPage = () => {
  const t = useTranslations('Settings')
  const tThemeOptions = (key: string) => t(`interface.themeOptions.${key}`)
  const tLanguageOptions = (key: string) =>
    t(`interface.languageOptions.${key}`)
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const setUser = useAuthStore((s) => s.setUser)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (user) {
      setName(user.name ?? '')
    }
  }, [user])

  const handleSave = () => {
    if (!user) return

    startTransition(async () => {
      try {
        const updated = await updateMyProfile({ name })
        setUser(updated)
        setOpen(false)

        // UPDATED: Use new message key
        toast.success(t('profile.messages.success', { name: updated.name }))
      } catch (err) {
        console.error(err)
        // UPDATED: Use new error key
        toast.error(t('profile.messages.error'))
      }
    })
  }

  if (loading) {
    return (
      <Section title={t('title')}>
        <p className="text-muted-foreground text-sm">{t('profile.loading')}</p>
      </Section>
    )
  }

  if (!user) {
    return (
      <Section title={t('title')}>
        <p className="text-muted-foreground text-sm">
          {t('profile.notAuthenticated')}
        </p>
      </Section>
    )
  }

  return (
    <Section title={t('title')}>
      <div className="space-y-12">
        {/* ------------------------- PROFILE SECTION ------------------------- */}
        <div className="grid grid-cols-[400px_1fr] items-start gap-x-12 gap-y-6">
          <div className="pr-4">
            <h2 className="text-lg font-semibold">{t('profile.title')}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {t('profile.description')}
            </p>
          </div>

          <Card size="lg" className="flex flex-col gap-4 p-4">
            <UserItem
              user={user}
              name={name}
              setName={setName}
              open={open}
              setOpen={setOpen}
              isPending={isPending}
              loading={loading}
              onSave={handleSave}
            />
          </Card>
        </div>

        {/* ------------------------ INTERFACE SECTION ------------------------ */}
        <div className="grid grid-cols-[400px_1fr] items-start gap-x-12 gap-y-6">
          <div className="pr-4">
            <h2 className="text-lg font-semibold">{t('interface.title')}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {t('interface.description')}
            </p>
          </div>

          <Card size="lg" className="flex flex-col gap-4 p-4">
            {/* Theme */}
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>{t('interface.theme')}</ItemTitle>
                <ItemDescription>
                  {t('interface.themeDescription')}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <ThemeSelect t={tThemeOptions} />
              </ItemActions>
            </Item>

            {/* Language */}
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>{t('interface.language')}</ItemTitle>
                <ItemDescription>
                  {t('interface.languageDescription')}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <LanguageSelect t={tLanguageOptions} />
              </ItemActions>
            </Item>
          </Card>
        </div>
      </div>
    </Section>
  )
}

export default SettingsPage
