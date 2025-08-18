import ContactPage from '@/components/layout/ContactPage';
import { getMessages, type Locale } from '@/lib/i18n';

export default async function ContactMainPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return <ContactPage messages={messages} />;
}
