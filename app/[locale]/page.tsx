// Home Page
'use client'

import { useTranslations } from 'next-intl'
import { LoginDialog } from '@/components/features'

const HomePage = () => {
  const t = useTranslations('Home')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-primary text-4xl font-bold">{t('title')}</h1>
      <p className="text-secondary">{t('description')}</p>
      <LoginDialog />
    </div>
  )
}

export default HomePage
