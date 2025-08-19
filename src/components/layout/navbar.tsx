'use client';

import { Navbar, NavbarLogo, NavbarMenu, NavbarMenuItem, NavbarAction } from '@govtechmy/myds-react/navbar';
import { useTheme } from '@/components/providers/theme-provider';
import { getMessages, type Locale } from '@/lib/i18n';
import LocaleSwitcher from './locale-switcher';
import ModalWindow from './ModalWindow';
import { useEffect, useState } from 'react';

// todos
// 1. fix color for toggle theme. hotfix set theme as light
// 2. lang

interface NavbarComponentProps {
  locale: Locale;
}

export default function NavbarComponent({ locale }: NavbarComponentProps) {
  const messages = getMessages(locale);
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <Navbar>
        <NavbarLogo
          href={`/${locale}`}
          src="/images/mygov-logo.svg"
          alt="Jata Negara Malaysia"
          className="h-full"
        ></NavbarLogo>

        <NavbarMenu classNameNavDesktop="" classNameNavMobile={`top-[-2vh] ${isHidden ? 'block' : 'hidden'}`}>
          <NavbarMenuItem className="flex-none w-fit" href={`/${locale}`}>
            {messages.navigation.main}
          </NavbarMenuItem>
          <NavbarMenuItem className="flex-none w-fit" href={`/${locale}/blog`}>
            {messages.navigation.blog}
          </NavbarMenuItem>
          <NavbarMenuItem className="flex-none w-fit" href={`/${locale}/contact`}>
            {messages.navigation.contact}
          </NavbarMenuItem>
        </NavbarMenu>

        <NavbarAction onClick={() => setIsHidden(prev => !prev)}>
          <div className="flex items-center gap-2">
            <LocaleSwitcher currentLocale={locale} />
            <ModalWindow downloads={messages.navigation.download} messages={messages} />
          </div>
        </NavbarAction>
      </Navbar>
    </>
  );
}
