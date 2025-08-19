import { getMessages, type Locale } from '@/lib/i18n';
import HomePage from '@/components/home/HomePage';

export default async function HomeMainPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return <HomePage messages={messages} />;
}
