import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturesTilesSection from '@/components/home/FeaturesTilesSection';
import FeaturesCarousel from '@/components/home/FeaturesCarousel';
import FAQSection from '@/components/home/FAQSection';
import { getPayload } from 'payload';
import config from '@/payload.config';

export default async function HomePage() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: 'homePage',
    depth: 3,
  });

  return (
    <>
      {/* Hidden SPLaSK Contact Details tag for crawler detection */}
      {/*<div
        {...{ "splwpk-contact-details": "splwpk-contact-details" }}
        {...{ "splwpk-contact-details-timestamp": timestamp }}
        className="sr-only"
        aria-hidden="true"
      >
        Contact Details Available
      </div>*/}
      <HeroSection />
      <AboutSection
        title={data.aboutTitle}
        description={data.aboutDescription}
      />
      <FeaturesTilesSection
        leftItems={data.leftItems}
        rightItems={data.rightItems}
      />
      <FeaturesCarousel features={data.features} />
      <FAQSection items={data.faq} />
    </>
  );
}
