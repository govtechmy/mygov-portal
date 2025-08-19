import { getMessages, type Locale } from '@/lib/i18n';
import HomePage from '@/components/home/HomePage';
import { getPayload } from 'payload';
import config from '@/payload.config';

export default async function HomeMainPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: 'homePage',
    depth: 3,
  });

  return <HomePage messages={messages} data={data} />;
}
