import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteScript from "./site-script";
import { isValidLocale } from "@/lib/i18n";
import FooterComponent from "@/components/layout/footer";
import MastheadComponent from "@/components/layout/masthead";
import NavbarComponent from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "MyGov Portal - Malaysian Government Services",
  description:
    "Official Malaysian government portal providing access to government services and information",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale parameter
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen transition-colors duration-200">
        <MastheadComponent locale={locale} />
        <NavbarComponent locale={locale} />
        {children}
        <FooterComponent locale={locale} />
      </div>
      <SiteScript />
    </>
  );
}
