'use client';

import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const otherLocale = currentLocale === 'en-GB' ? 'ms-MY' : 'en-GB';
  const otherLocaleName = currentLocale === 'en-GB' ? 'Bahasa Melayu' : 'English';
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 dark:text-gray-300">Language:</span>
      <Link
        href={`/${otherLocale}`}
        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
      >
        {otherLocaleName}
      </Link>
    </div>
  );
}
