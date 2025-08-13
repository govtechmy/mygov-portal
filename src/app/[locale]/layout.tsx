import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteScript from "./site-script";
import { isValidLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "MyGov Portal - Malaysian Government Services",
  description: "Official Malaysian government portal providing access to government services and information",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate locale parameter
  if (!isValidLocale(locale)) {
    notFound();
  }
  
  return (
    <>
      {children}
      <SiteScript />
    </>
  );
}
