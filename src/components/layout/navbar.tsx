'use client';

import {
  Navbar,
  NavbarLogo,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuDropdown,
  NavbarAction,
} from "@govtechmy/myds-react/navbar";
import { Button } from "@govtechmy/myds-react/button";
import { SunIcon, MoonIcon } from "@govtechmy/myds-react/icon";
import { useTheme } from "@/components/providers/theme-provider";
import { getMessages, type Locale } from "@/lib/i18n";
import LocaleSwitcher from "./locale-switcher";

interface NavbarComponentProps {
  locale: Locale;
}

export default function NavbarComponent({ locale }: NavbarComponentProps) {
  const messages = getMessages(locale);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Navbar>
      <NavbarLogo 
        href={`/${locale}`}
        src="/images/mygov-logo.svg"
        alt="Jata Negara Malaysia"
        className="h-full"
      >
      </NavbarLogo>
      
      <NavbarMenu>
        <NavbarMenuItem href={`/${locale}/services`}>
          {messages.navigation.services}
        </NavbarMenuItem>
        <NavbarMenuItem href={`/${locale}/information`}>
          {messages.navigation.information}
        </NavbarMenuItem>
        <NavbarMenuDropdown title={messages.navigation.about}>
          <NavbarMenuItem href={`/${locale}/about/ministry`}>
            {messages.navigation.ministry}
          </NavbarMenuItem>
          <NavbarMenuItem href={`/${locale}/about/contact`}>
            {messages.navigation.contact}
          </NavbarMenuItem>
        </NavbarMenuDropdown>
        <NavbarMenuItem href={`/${locale}/news`}>
          {messages.navigation.news}
        </NavbarMenuItem>
      </NavbarMenu>
      
      <NavbarAction>
        <div className="flex items-center space-x-2">
          <LocaleSwitcher currentLocale={locale} />
          <Button
            variant="default-ghost"
            size="small"
            onClick={toggleTheme}
            className="p-2"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </NavbarAction>
    </Navbar>
  );
}
