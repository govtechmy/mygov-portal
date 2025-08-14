import { type Locale } from "@/lib/i18n";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  return <div>mainpage</div>;
}
