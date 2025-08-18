import Image from 'next/image';
import HeroPattern from '@/components/layout/heroPattern';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-screen p-3 overflow-hidden bg-gradient-radial from-brand-200 from-0% via-[#F1F5FF] via-[27.57%] to-white to-100%">
      <div className="absolute inset-0 z-0">
        <HeroPattern />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div className="flex flex-col items-center md:items-start space-y-6 text-center md:text-start">
          <div className="text-[18px] tracking-wide font-medium text-[#2563EB] md:text-base">
            MYGOV MALAYSIA
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight">
            Aplikasi Pusat Sehenti <br />
            Digital Perkhidmatan <br /> Kerajaan
          </h1>
          <p className="text-base font-normal text-[#3F3F46]">
            Menyatukan Perkhidmatan Kerajaan dalam Satu Aplikasi
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
                  <span>Muat Turun di</span>
                  <span className="font-semibold">App Store</span>
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
                  <span>Muat Turun di</span>
                  <span className="font-semibold">Google Play</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <span className="text-sm text-gray-600">Sebuah inisiatif</span>
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
