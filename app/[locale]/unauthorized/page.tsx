// Unauthorized Page
'use client'

import { useTranslations } from 'next-intl'

const UnauthorizedPage = () => {
  const t = useTranslations('Common')
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold text-red-500">
        {t('unauthorizedTitle')}
      </h1>
      <p className="text-secondary">{t('unauthorizedMessage')}</p>
    </div>
  )
}

export default UnauthorizedPage
