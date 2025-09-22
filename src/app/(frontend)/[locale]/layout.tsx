import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteScript from './site-script';
import { isValidLocale } from '@/lib/i18n';
import FooterComponent from '@/components/layout/footer';
import MastheadComponent from '@/components/layout/masthead';
import NavbarComponent from '@/components/layout/navbar';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const metadata: Metadata = {
  title: 'MyGOV Malaysia - Aplikasi Pusat Sehenti Digital Perkhidmatan Kerajaan Malaysia',
  description:
    'MyGOV Malaysia adalah aplikasi yang dibangunkan sebagai menyatukan perkhidmatan kerajaan Malaysia dalam satu aplikasi.',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const payload = await getPayload({ config });
  const footerData = await payload.findGlobal({
    slug: 'footer',
    depth: 3,
  });
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
        <FooterComponent locale={locale} footerData={footerData} />
      </div>
      <SiteScript />
    </>
  );
}
