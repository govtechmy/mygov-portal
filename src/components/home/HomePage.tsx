'use client';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturesTilesSection from '@/components/home/FeaturesTilesSection';
import FeaturesCarousel from '@/components/home/FeaturesCarousel';
import FAQSection from '@/components/home/FAQSection';
import { HomePage as HomePageType } from '@/payload-types';

interface HomePageProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
  data: HomePageType;
}

export default function HomePage({ messages, data }: HomePageProps) {
  return (
    <div>
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
      {/* pass messages here for client component*/}
      <AboutSection title={data.aboutTitle} description={data.aboutDescription} />
      {/* payload data */}
      <FeaturesTilesSection leftItems={data.leftItems} rightItems={data.rightItems} />
      <FeaturesCarousel features={data.features} />
      {/* payload data */}
      <FAQSection items={data.faq} />
    </div>
  );
}
