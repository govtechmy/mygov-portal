import PrivacyPage from '@/components/layout/PrivacyPage';
import { getMessages, type Locale } from '@/lib/i18n';

export default async function PrivacyMainPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return <PrivacyPage messages={messages} />;
}
