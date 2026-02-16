import { getPayload } from 'payload';
import config from '@/payload.config';
import { lexicalToPlainText } from '@/lib/lexical';
import { defaultLocale } from '@/lib/i18n';
import { resolveMediaCloudFrontRssSrc } from '@/lib/media';

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
    depth: 1,
    select: {
      id: true,
      title: true,
      datePublished: true,
      content: true,
      type: true,
      picture: true,
    },
  });

  const itemsXml = (results.docs || [])
    .map(doc => {
      const title = escapeXml(doc.title ?? '');
      const url = `${origin}/${defaultLocale}/blog/${doc.id}`;
      const type = typeof doc.type === 'string' ? doc.type : '';
      const category = `mygov-${type}`;
      const descriptionSource = lexicalToPlainText(doc.content as unknown);
      const description = escapeXml(descriptionSource ? String(descriptionSource) : '');
      const picture = resolveMediaCloudFrontRssSrc(doc.picture);

      let pictureUrl = picture ? `${origin}${picture}` : '';
      if (picture.startsWith('https://') && picture.includes('cloudfront.net')) {
        pictureUrl = picture;
      }

      const formatTimestamp = (dateInput: unknown) => {
        const d = dateInput ? new Date(String(dateInput)) : new Date();
        const pad = (n: number) => (n < 10 ? `0${n}` : String(n));
        const yyyy = d.getFullYear();
        const mm = pad(d.getMonth() + 1);
        const dd = pad(d.getDate());
        const hh = pad(d.getHours());
        const min = pad(d.getMinutes());
        const ss = pad(d.getSeconds());
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
      };

      const timestamp = formatTimestamp(doc.datePublished);

      const buildKeywords = (inputTitle: string) => {
        const words = (inputTitle || '')
          .toLowerCase()
          .replace(/[^a-z0-9\s,\-]/g, '')
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 4);
        return words.join(', ');
      };

      const keywords = escapeXml(buildKeywords(doc.title ?? ''));

      return `\n    <item>
      <category>${category}</category>
      <title>${title}</title>
      <link>${url}</link>
      <description>${description}</description>
      ${pictureUrl ? `<media:content type="image/jpeg" url="${pictureUrl}"/>` : ''}
      <keyword>${keywords}</keyword>
      <timestamp>${timestamp}</timestamp>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" ?>
<rss xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
  <channel>
    <title>MyGov Malaysia Blog</title>
    <link>${origin}/blog</link>${itemsXml}\n  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
