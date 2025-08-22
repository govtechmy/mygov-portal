import FAQSection from '@/components/home/FAQSection';
import { getPayload } from 'payload';
import config from '@/payload.config';

export default async function FAQPage() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: 'homePage',
    depth: 3,
  });
  return <FAQSection items={data.faq} />;
}
