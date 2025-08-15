import enGB from '../../messages/en-GB.json';
import msMY from '../../messages/ms-MY.json';

export type Locale = 'en-GB' | 'ms-MY';

export const locales: Locale[] = ['en-GB', 'ms-MY'];

export const defaultLocale: Locale = 'ms-MY';

export const messages = {
  'en-GB': enGB,
  'ms-MY': msMY,
} as const;

export function getMessages(locale: Locale) {
  return messages[locale] || messages[defaultLocale];
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
