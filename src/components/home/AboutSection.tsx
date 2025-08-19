'use client';
import Image from 'next/image';
// import { HomePage as homePageType } from '@/payload-types'; // Comment since not used for now to avoid lint error

interface AboutSectionProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
}
export default function AboutSection({}: AboutSectionProps) {
  //export default function AboutSection({ messages }: AboutSectionProps) { // Comment for now since not using i18n
  return (
    <section className="p-8 max-w-[1000px] mx-auto">
      <div className="rounded-[32px] border border-[#F4F4F5] flex flex-row items-center justify-center">
        <div className="flex flex-row flex-wrap items-stretch justify-center max-w-[800px]">
          <div className="flex-[400px] lg:pt-12 lg:px-12 pt-8 px-8">
            <div className="mb-4 text-4xl lg:text-2xl md:text-xl sm:text-lg">Apa itu MyGOV Malaysia?</div>

            <div className="text-base leading-relaxed">
              MyGOV Malaysia merupakan aplikasi yang dibangunkan sebagai pusat rujukan sehenti bagi perkhidmatan umum
              yang ditawarkan kerajaan Malaysia. Melalui MyGOV Malaysia, anda dapat melakukan semakan, membuat
              permohonan, menerima notifikasi di samping ciri-ciri lain yang bakal dilancarkan.
              <div className="pb-10"></div>
            </div>
          </div>
          <div className="flex-[400px] flex justify-center items-end">
            <div className="relative max-w-[500px]">
              <Image
                src="/home/second_section/line-4.png"
                alt="background line for couple image"
                fill
                className="lg:!hidden"
                style={{ top: '-1vw', left: '-3vw', transform: 'scale(0.9)' }}
              />
              <Image
                src="/home/second_section/line-4.png"
                alt="background line for couple image"
                fill
                className="hidden lg:block"
                style={{ top: '2vw', left: '-3vw', transform: 'scale(0.9)' }}
              />
              <Image
                src="/home/second_section/couples.png"
                alt="couple image"
                width={400}
                height={400}
                priority
                className="relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
