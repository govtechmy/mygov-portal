'use client';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturesTilesSection from '@/components/home/FeaturesTilesSection';
import FeaturesCarousel from '@/components/home/FeaturesCarousel';
import FAQSection from '@/components/home/FAQSection';
import KerjasamaSection from './Kerjasama';
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
      <div className=" mx-auto sm:px-[18px] md:px-[24px] lg:px-[24px] xl:px-[24px] max-w-[1328px] !border-x-[1px] !border-[#F4F4F5]">
        <AboutSection title={data.aboutTitle} description={data.aboutDescription} />
        {/* payload data */}
        <FeaturesTilesSection leftItems={data.leftItems} rightItems={data.rightItems} />
        <FeaturesCarousel features={data.features} />
        {/* payload data */}
        <FAQSection items={data.faq} />
        {/*<KerjasamaSection />*/}
      </div>
    </div>
  );
}
