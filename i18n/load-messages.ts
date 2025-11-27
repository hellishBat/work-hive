// i18n LoadMessages
import { routing } from './routing'

export const loadMessages = async (
  locale: string
): Promise<{ locale: string; messages: any }> => {
  // Validate locale, fallback to default
  if (!routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  const namespaces = [
    'common',
    'home',
    'dashboard',
    'analytics',
    'team',
    'employee',
    'settings',
    'sidebar',
  ]

  const messages = await Promise.all(
    namespaces.map(async (ns) => {
      try {
        const nsMessages = await import(`../messages/${locale}/${ns}.json`)
        return {
          [ns.charAt(0).toUpperCase() + ns.slice(1)]: nsMessages.default,
        }
      } catch (error) {
        console.warn(
          `Failed to load ${ns} for ${locale}, falling back to empty object`
        )
        return {}
      }
    })
  ).then((results) => Object.assign({}, ...results))

  return { locale, messages }
}
