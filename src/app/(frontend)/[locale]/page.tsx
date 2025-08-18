import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturesTilesSection from '@/components/home/FeaturesTilesSection';
import FeaturesCarousel from '@/components/home/FeaturesCarousel';
import FAQSection from '@/components/home/FAQSection';
import { data } from '@/constants/home';
import { getMessages, type Locale } from '@/lib/i18n';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);

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
      {/* pass messages here for client component*/}
      <HeroSection messages={messages} />
      <AboutSection />
      <FeaturesTilesSection
        leftItems={data.leftItems}
        rightItems={data.rightItems}
      />
      <FeaturesCarousel features={data.features} />
      <FAQSection items={data.faq} />
    </>
  );
}
