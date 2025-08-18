import { getMessages, type Locale } from '@/lib/i18n';
import BlogInfoPage from '@/components/layout/BlogInfoPage';

export default async function BlogInfoMainPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return <BlogInfoPage messages={messages} />;
}
