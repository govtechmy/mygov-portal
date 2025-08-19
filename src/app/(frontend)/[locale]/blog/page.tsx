import BlogPage from '@/components/layout/BlogPage';
import { getMessages, type Locale } from '@/lib/i18n';
import { searchResultMap } from '@/lib/search';
import type { PaginatedDocs } from 'payload';
import type { Blog } from '@/payload-types';

export default async function BlogMainPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  // Fetch initial results on the server for fastest first paint
  const initial = (await searchResultMap('', 'Semua', '', '', 1)) as PaginatedDocs<Blog>;
  const initialDocs = initial?.docs ?? [];
  // totalDocs in Payload paginated response; fall back to total or docs length
  // @ts-expect-error allow different shapes
  const initialTotal = initial?.totalDocs ?? initial?.total ?? initialDocs.length;

  return <BlogPage messages={messages} initialDocs={initialDocs} initialTotal={initialTotal} />;
}
