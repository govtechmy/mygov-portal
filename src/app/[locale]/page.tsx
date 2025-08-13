import FooterComponent from "@/components/layout/footer";
import MastheadComponent from "@/components/layout/masthead";
import NavbarComponent from "@/components/layout/navbar";
import { type Locale } from "@/lib/i18n";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <MastheadComponent locale={locale} />
      <NavbarComponent locale={locale} />
      <div className="container mx-auto px-4 py-8 text-center text-4xl">Noob.</div>
      <FooterComponent locale={locale} />
    </div>
  );
}
