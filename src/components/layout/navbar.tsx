'use client';

import { Navbar, NavbarLogo, NavbarMenu, NavbarMenuItem, NavbarAction } from '@govtechmy/myds-react/navbar';
import { Button } from '@govtechmy/myds-react/button';
// import { SunIcon, MoonIcon } from '@govtechmy/myds-react/icon'; // Temporarily disable dark mode - use default light mode - removing bad setState error
import { useTheme } from '@/components/providers/theme-provider';
import { getMessages, type Locale } from '@/lib/i18n';
import LocaleSwitcher from './locale-switcher';
import ModalWindow from './ModalWindow';

import { useEffect, useState } from 'react'; //temporarily disable dark mode - use default light mode - removing bad setState error

interface NavbarComponentProps {
  locale: Locale;
}

export default function NavbarComponent({ locale }: NavbarComponentProps) {
  const messages = getMessages(locale);
  // const { theme, setTheme } = useTheme();
  const { setTheme } = useTheme(); // Comment for now since not using i18n
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  useEffect(() => {
    setTheme('light');
  }, [setTheme]); // default light mode using useEffect, preventing errors
  // const toggleTheme = () => {
  //   setTheme(theme === 'light' ? 'dark' : 'light');
  // };

  return (
    <>
      <Navbar>
        <NavbarLogo
          href={`/${locale}`}
          src="/images/mygov-logo.svg"
          alt="Jata Negara Malaysia"
          className="h-full"
        ></NavbarLogo>

        <NavbarMenu>
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

        <NavbarAction>
          <div className="flex items-center gap-2">
            {/* integrate properly before theme
          <Button
        <div className="flex items-end justify-end gap-2">
          {/* <Button
            variant="default-ghost"
            size="small"
            onClick={toggleTheme}
            className="p-2"
            aria-label={
              theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            }
          >
            {theme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </Button> */}
            <LocaleSwitcher currentLocale={locale} />

            <ModalWindow downloads={messages.navigation.download} messages={messages} />
          </div>
        </NavbarAction>
      </Navbar>
    </>
  );
}
