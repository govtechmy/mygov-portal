'use client';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturesTilesSection from '@/components/home/FeaturesTilesSection';
import FeaturesCarousel from '@/components/home/FeaturesCarousel';
import FAQSection from '@/components/home/FAQSection';
import { data } from '@/constants/home';

interface HomePageProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
}

export default function HomePage({ messages }: HomePageProps) {
  return (
    <div className="mx-auto px-[18px] sm:px-[18px] md:px-[24px] lg:px-[24px] xl:px-[24px] max-w-[1328px] py-16">
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
      <AboutSection messages={messages} />
      {/* payload data */}
      <FeaturesTilesSection leftItems={data.leftItems} rightItems={data.rightItems} />
      <FeaturesCarousel features={data.features} />
      {/* payload data */}
      <FAQSection items={data.faq} />
    </div>
  );
}
