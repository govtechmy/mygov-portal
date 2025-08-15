'use client';
import { useState } from 'react';
import HeroPattern from '@/components/layout/heroPattern';
import useMediaQuery from '@/lib/mediaQuery';
import { leftItems, rightItems } from '@/constants/home/third_section';
import { features } from '@/constants/home/fourth_section';
import { faq } from '@/constants/home/faq';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from '@govtechmy/myds-react/icon';
import Image from 'next/image';

export default function HomePage() {
  const itemsPerPage = 4;
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextFeature = () => {
    if (currentFeatureIndex < features.length - itemsPerPage) {
      setCurrentFeatureIndex(prev => prev + 1);
    }
  };

  const prevFeature = () => {
    if (currentFeatureIndex > 0) {
      setCurrentFeatureIndex(prev => prev - 1);
    }
  };

  const openModal = (index: number) => {
    setCurrentFeatureIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isMobile = useMediaQuery('(max-width: 640px)');
  const itemsPerPageMobile = isMobile ? 1.25 : itemsPerPage;

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
      <section className="relative w-screen p-3 overflow-hidden bg-gradient-radial from-brand-200 from-0% via-[#F1F5FF] via-[27.57%] to-white to-100%">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0">
          <HeroPattern />
        </div>

        {/* Foreground content */}
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

            {/* App store buttons */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
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
            </div>

            {/* Initiative logo */}
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

          {/* Phone image */}
          <div className="relative flex items-center justify-center">
            <Image
              src="/home/first_section/hand_holding_phone.png"
              alt="Hand holding a phone with MyGov app"
              width={650}
              height={850}
            />
          </div>
        </div>
      </section>

      <section className="p-8 lg:p-16 md:p-12 sm:p-4 max-w-[1000px] mx-auto">
        <div className="flex flex-row flex-wrap items-stretch justify-center rounded-[32px] border border-[#F4F4F5]">
          <div className="flex-[400px] lg:pt-16 lg:px-16 pt-8 px-8">
            <div className="mb-4 text-4xl lg:text-2xl md:text-xl sm:text-lg">
              Apa itu MyGOV Malaysia?
            </div>

            <div className="text-base leading-relaxed">
              MyGOV Malaysia merupakan aplikasi yang dibangunkan sebagai pusat
              rujukan sehenti bagi perkhidmatan umum yang ditawarkan kerajaan
              Malaysia. Melalui MyGOV Malaysia, anda dapat melakukan semakan,
              membuat permohonan, menerima notifikasi di samping ciri-ciri lain
              yang bakal dilancarkan.
              <div className="pb-10"></div>
            </div>
          </div>
          <div className="flex-[400px] flex justify-center items-center">
            <div className="relative max-w-[500px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/home/second_section/line-4.png"
                  alt="line-4"
                  className="absolute -inset-x-5 inset-y-10 w-full h-full object-cover rounded-2xl"
                />
                <Image
                  src="/home/second_section/couples.png"
                  alt="couple"
                  className="relative w-full h-auto rounded-2xl z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 pb-20 font-bold justify-center items-center">
        <h2 className="mb-12 p-5 text-center text-2xl font-[600px] md:text-3xl lg:text-4xl">
          Akses lebih mudah kepada perkhidmatan kerajaan
        </h2>

        <div className="hidden lg:flex gap-24 flex-row relative">
          {/* Left column */}
          <div className="flex flex-col justify-center gap-6">
            {leftItems.map((item, i) => (
              <div
                key={i}
                className="flex w-[200px] flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={78}
                  height={78}
                  className="mb-3"
                />
                <p className="text-center text-sm font-medium">{item.title}</p>
              </div>
            ))}
          </div>

          {/* Phone image and connector lines */}
          <div className="relative flex-shrink-0">
            <Image
              src="/home/third_section/phone.png"
              alt="MyGOV Malaysia App"
              width={300}
              height={600}
              className="object-cover"
            />

            {/* Lines */}
            <div
              className="absolute dashed-line-gray connector-dot z-10"
              style={{
                top: '190px',
                left: '-45px',
                width: '46px',
                transform: 'rotate(-180deg)',
              }}
            ></div>
            <div
              className="absolute dashed-line-gray connector-dot z-10"
              style={{
                top: '370px',
                left: '-45px',
                width: '46px',
                transform: 'rotate(-180deg)',
              }}
            ></div>
            <div
              className="absolute dashed-line-gray connector-dot z-10"
              style={{
                top: '535px',
                left: '-45px',
                width: '46px',
                transform: 'rotate(-180deg)',
              }}
            ></div>

            <div
              className="absolute dashed-line-gray connector-dot z-10"
              style={{
                top: '100px',
                right: '-45px',
                width: '46px',
              }}
            ></div>
            <div
              className="absolute dashed-line-gray connector-dot z-10"
              style={{
                top: '285px',
                right: '-46px',
                width: '46px',
              }}
            ></div>
            <div
              className="absolute dashed-line-gray connector-dot z-10"
              style={{
                top: '450px',
                right: '-44px',
                width: '46px',
              }}
            ></div>
            <div
              className="absolute dashed-line-gray connector-dot z-10"
              style={{
                top: '620px',
                right: '-42px',
                width: '46px',
              }}
            ></div>
          </div>

          {/* Right column */}
          <div className="flex flex-col justify-center gap-6">
            {rightItems.map((item, i) => (
              <div
                key={i}
                className="flex w-[200px] flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={78}
                  height={78}
                  className="mb-3"
                />
                <p className="text-center text-sm font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:hidden p-5">
          {[...leftItems, ...rightItems].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={78}
                height={78}
                className="mb-3"
              />
              <p className="text-center text-sm font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden relative">
            {/* Carousel track */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentFeatureIndex * (100 / itemsPerPageMobile)
                }%)`,
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{
                    width: `${100 / itemsPerPageMobile}%`, // mobile width
                  }}
                >
                  <div
                    className="flex flex-col items-center w-full h-[352px] cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-white p-4"
                    onClick={() => openModal(index)}
                  >
                    <div className="flex flex-grow items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={200}
                        height={400}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows - bottom right */}
          <div className="absolute bottom-4 right-6 flex gap-3">
            <button
              onClick={prevFeature}
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors"
              aria-label="Previous feature"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={nextFeature}
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors"
              aria-label="Next feature"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={closeModal}
        >
          <div
            className="relative flex bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-[#E4E4E7] text-gray-500 hover:text-gray-800"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex-auto">
              <Image
                src={features[currentFeatureIndex].open}
                alt={features[currentFeatureIndex].title}
                width={300}
                height={350}
                className=""
              />
            </div>
            <div className="flex-auto">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {features[currentFeatureIndex].title}
                </h2>
                <p className="mt-4 text-gray-700 max-w-sm">
                  {features[currentFeatureIndex].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">Soalan Lazim (FAQ)</h2>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition"
              >
                <span className="font-medium">{item.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="p-4 border-t border-gray-200 bg-gray-50 text-gray-700">
                  {item.answers}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
