'use client';
import Image from 'next/image';
import HeroPattern from '@/components/layout/heroPattern';
import BlueCircleGradient from '../layout/blueCircleGradient';
import Link from 'next/link';

interface HeroSectionProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
}

export default function HeroSection({ messages }: HeroSectionProps) {
  return (
    <section className="relative w-screen p-3 overflow-hidden bg-gradient-radial from-brand-200 from-0% via-[#F1F5FF] via-[27.57%] to-white to-100%">
      <div className="absolute inset-0 z-0">
        <HeroPattern />
        <BlueCircleGradient />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div className="flex flex-col items-center md:items-start space-y-6 text-center md:text-start">
          <div className="text-[18px] tracking-wide font-medium text-[#2563EB] md:text-base">
            {messages.homepg.herosection.mygovmy}
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight">
            {messages.homepg.herosection.header1}
            <br />
            {messages.homepg.herosection.header2} <br />
            {messages.homepg.herosection.header3}
          </h1>
          <p className="text-base font-normal text-[#3F3F46]">
            {messages.homepg.herosection.parag}
          </p>

          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <Link href="https://apps.apple.com/my/app/mygov-malaysia/id6502623525">
              <div className="flex bg-black h-[40px] w-[120px] items-center gap-2 rounded-md border border-[#A6A6A6] p-2 text-white shadow-md transition-shadow hover:shadow-lg">
                <Image
                  src="/home/first_section/Apple.png"
                  alt="App Store"
                  width={21}
                  height={24}
                />
                <div className="flex flex-col text-[10px]">
                  <span> {messages.homepg.herosection.buttondownload}</span>
                  <span className="font-semibold">
                    {' '}
                    {messages.homepg.herosection.buttonapple}
                  </span>
                </div>
              </div>
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=my.gov.onegovappstore.jdn&hl=en">
              <div className="flex bg-black h-[40px] w-[120px] items-center gap-2 rounded-md border border-[#A6A6A6] p-2 text-white shadow-md transition-shadow hover:shadow-lg">
                <Image
                  src="/home/first_section/Playstore.png"
                  alt="Google Play"
                  width={21}
                  height={24}
                />
                <div className="flex flex-col text-[10px]">
                  <span> {messages.homepg.herosection.buttondownload}</span>
                  <span className="font-semibold">
                    {messages.homepg.herosection.buttongoogle}
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <span className="text-sm text-gray-600">
              {messages.homepg.herosection.inisiatif}
            </span>
            <Image
              src="/home/first_section/sentuhanmadani.png"
              alt="Madani"
              width={84}
              height={32}
            />
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <Image
            src="/home/first_section/hand_holding_phone.png"
            alt="Hand holding a phone with MyGov app"
            width={650}
            height={850}
            priority
          />
        </div>
      </div>
    </section>
  );
}
