import BlogPage from '@/components/layout/BlogPage';
import { getMessages, type Locale } from '@/lib/i18n';

export default async function BlogMainPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return <BlogPage messages={messages} />;
}
