import Image from 'next/image';
import { HomePage as homePageType } from '@/payload-types';

interface AboutSectionProps {
  title: homePageType['aboutTitle'];
  description: homePageType['aboutDescription'];
}

export default function AboutSection({
  title,
  description,
}: AboutSectionProps) {
  return (
    <section className="p-8 max-w-[1200px] mx-auto">
      <div className="flex flex-row flex-wrap items-stretch justify-center rounded-[32px] border border-[#F4F4F5]">
        <div className="flex-[400px] lg:pt-16 lg:px-16 pt-8 px-8">
          <div className="mb-4 text-4xl lg:text-2xl md:text-xl sm:text-lg">
            {title}
          </div>

          <div className="text-base leading-relaxed">
            {description}
            <div className="pb-10"></div>
          </div>
        </div>
        <div className="flex-[400px] flex justify-center items-center">
          <div className="relative max-w-[500px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/home/second_section/line-4.png"
                alt="line-4"
                fill
                className="absolute -inset-x-5 inset-y-10 w-full h-full object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <Image
                src="/home/second_section/couples.png"
                alt="couple"
                width={800}
                height={600}
                className="relative w-full h-auto rounded-2xl z-10"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
