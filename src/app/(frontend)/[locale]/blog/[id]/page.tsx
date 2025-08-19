import { getMessages, type Locale } from '@/lib/i18n';
import BlogInfoPage from '@/components/layout/BlogInfoPage';
import { getPayload } from 'payload';
import config from '@/payload.config';

export default async function BlogInfoMainPage({ params }: { params: Promise<{ locale: Locale; id: string }> }) {
  const { locale, id } = await params;
  const messages = await getMessages(locale);

  const payload = await getPayload({ config });
  const blog = await payload.find({
    collection: 'blog',
    where: { id: { equals: id } },
  });

  return <BlogInfoPage messages={messages} blog={blog.docs[0]} />;
}
