// Global Layout (Locale)
import '@/styles/globals.css'
import { ReactNode } from 'react'
import { createTranslator, NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { Noto_Sans } from 'next/font/google'
import { Footer } from '@/components/layout'
import { loadMessages } from '@/i18n/load-messages'

const notoSans = Noto_Sans({ subsets: ['latin', 'cyrillic'] })

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params
  const { locale: validatedLocale, messages } = await loadMessages(locale)
  const t = createTranslator({
    locale: validatedLocale,
    messages,
    namespace: 'Home',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params
  const { locale: loadedLocale, messages } = await loadMessages(locale)

  return (
    <html lang={locale} className={notoSans.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={loadedLocale} messages={messages}>
            <main className="global-main">{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
