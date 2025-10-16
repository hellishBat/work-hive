// Routing
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // List of all supported locales
  locales: ['en', 'ru', 'uk'],
  // Default locale (used when no locale matches)
  defaultLocale: 'en',
  // Optional: Strategy for locale prefixes. 'always' prefixes all (default behavior).
  // Change to 'as-needed' to hide prefix for default locale (e.g., /dashboard for en, /ru/dashboard for ru).
  localePrefix: 'always', // or 'as-needed'
})
