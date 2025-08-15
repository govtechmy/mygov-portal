'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@govtechmy/myds-react/button';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@govtechmy/myds-react/dropdown';
import { ChevronDownIcon, GlobeIcon } from '@govtechmy/myds-react/icon';
import { type Locale } from '@/lib/i18n';

interface LocaleSwitcherProps {
  currentLocale: Locale;
}

const localeNames: Record<Locale, string> = {
  'en-GB': 'EN',
  'ms-MY': 'BM',
};

const localeFullNames: Record<Locale, string> = {
  'en-GB': 'English',
  'ms-MY': 'Bahasa Melayu',
};

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const createLocaleHref = (newLocale: string) => {
    // remove current locale from path, then prepend the new one, else it will keep reseting path
    const pathWithoutLocale = pathname.replace(/^\/[^/]+/, '');
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <Dropdown open={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger asChild>
        <Button
          variant="default-outline"
          size="small"
          className="flex items-center border-gray-300 bg-white"
          aria-label="Select language"
        >
          <GlobeIcon className="h-4 w-4 text-gray-700" />
          <span className="font-medium text-gray-700">
            {localeNames[currentLocale]}
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-700" />
        </Button>
      </DropdownTrigger>

      <DropdownContent align="end" className="w-40">
        {Object.entries(localeNames).map(([locale]) => (
          <DropdownItem key={locale} asChild>
            <Link
              href={createLocaleHref(locale)}
              className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-gray-700">
                {localeFullNames[locale as Locale]}
              </span>
              {locale === currentLocale && (
                <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              )}
            </Link>
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}
