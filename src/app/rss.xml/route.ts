import { getPayload } from 'payload';
import config from '@/payload.config';
import { lexicalToPlainText } from '@/lib/lexical';
import { defaultLocale } from '@/lib/i18n';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(request: Request) {
  const payload = await getPayload({ config });
  const origin = new URL(request.url).origin;

  const results = await payload.find({
    collection: 'blog',
    limit: 50,
    sort: '-datePublished',
    depth: 0,
    select: {
      id: true,
      title: true,
      datePublished: true,
      content: true,
    },
  });

  const itemsXml = (results.docs || [])
    .map(doc => {
      const title = escapeXml(doc.title ?? '');
      const url = `${origin}/${defaultLocale}/blog/${doc.id}`;
      const guid = url;
      const pubDate = doc.datePublished ? new Date(doc.datePublished).toUTCString() : new Date().toUTCString();
      const descriptionSource = lexicalToPlainText(doc.content as unknown);
      const description = escapeXml(descriptionSource ? String(descriptionSource) : '');
      return `\n    <item>\n      <title>${title}</title>\n      <link>${url}</link>\n      <guid isPermaLink=\"true\">${guid}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description>${description}</description>\n    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>MyGov Portal Blog</title>
    <link>${origin}</link>
    <description>Latest articles from MyGov Portal</description>
    <language>ms-MY</language>${itemsXml}\n  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
