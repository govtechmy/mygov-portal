'use client';

import { useState } from 'react';
import useMediaQuery from '@/lib/mediaQuery';
import { ChevronRightIcon, ChevronLeftIcon } from '@govtechmy/myds-react/icon';
import { HomePage as homePageType } from '@/payload-types';
import Image from 'next/image';
import { resolveMediaSrc } from '@/lib/media';

interface FeaturesCarouselProps {
  features: homePageType['features'];
}

export default function FeaturesCarousel({ features }: FeaturesCarouselProps) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 640px)');
  const isLaptop = useMediaQuery('(max-width: 992px)');
  let itemsPerPage = 4; // default desktop

  const safeFeatures = Array.isArray(features) ? features : [];

  if (isMobile) {
    itemsPerPage = 1.25;
  } else if (isLaptop) {
    itemsPerPage = 2;
  }

  // Allow fixed maxIndex for laptop+
  const maxClicks = isLaptop || !isMobile ? 4 : Math.max(0, safeFeatures.length - Math.floor(itemsPerPage));

  const nextFeature = () => {
    if (currentFeatureIndex < maxClicks) {
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

  return (
    <section className=" py-16 relative  md:flex md:justify-end">
      <div className="overflow-hidden relative ">
        {/* Carousel track */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentFeatureIndex * 334}px)`,
          }}
        >
          {safeFeatures.map((feature, index) => {
            const imageSrc = resolveMediaSrc(feature.image);
            return (
              <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{
                  width: '334px',
                  height: '354px',
                }}
              >
                <div
                  className="flex flex-col md:relative md:left-96 top-0 items-center w-full h-full cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-yellow-400"
                  onClick={() => openModal(index)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full bg-white">
                      {imageSrc && (
                        <Image
                          src={imageSrc}
                          alt={feature.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 334px"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrows - bottom right */}
      <div className="absolute -bottom-6 right-10 flex gap-3">
        <button
          onClick={prevFeature}
          disabled={currentFeatureIndex === 0}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/80 backdrop-blur-md transition-colors ${
            currentFeatureIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white'
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={nextFeature}
          disabled={currentFeatureIndex >= maxClicks}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/80 backdrop-blur-md transition-colors ${
            currentFeatureIndex >= maxClicks ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white'
          }`}
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={closeModal}>
          <div
            className="relative flex flex-col md:flex-row bg-white rounded-3xl shadow-xl p-4 max-w-[800px] w-full mx-4"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-row flex-wrap items-center justify-center gap-8">
              <div className="">
                {(() => {
                  const openSrc = resolveMediaSrc(safeFeatures[currentFeatureIndex]?.open);
                  return (
                    <Image
                      src={openSrc}
                      alt={safeFeatures[currentFeatureIndex]?.title ?? ''}
                      width={300}
                      height={300}
                      priority={true}
                    />
                  );
                })()}
              </div>

              <div className="">
                <h2 className="text-2xl font-semibold mb-4">{safeFeatures[currentFeatureIndex]?.title ?? ''}</h2>
                <p className="mt-4 text-gray-700 max-w-sm">{safeFeatures[currentFeatureIndex]?.desc ?? ''}</p>
              </div>
            </div>

            <div className="flex justify-center"></div>
            <div className="flex-auto"></div>
          </div>
        </div>
      )}
    </section>
  );
}
