'use client';

import { useState } from 'react';
import Image from 'next/image';
import useMediaQuery from '@/lib/mediaQuery';
import { ChevronRightIcon, ChevronLeftIcon } from '@govtechmy/myds-react/icon';

export interface FeatureItem {
  image: string;
  title: string;
  open: string;
  desc: string;
  support?: string;
}

interface FeaturesCarouselProps {
  features: FeatureItem[];
}

export default function FeaturesCarousel({ features }: FeaturesCarouselProps) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 4;

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

  const isMobile = useMediaQuery('(max-width: 640px)');
  const itemsPerPageMobile = isMobile ? 1.25 : itemsPerPage;

  return (
    <section className="bg-white py-16 relative">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentFeatureIndex * (100 / itemsPerPageMobile)}%)`,
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsPerPageMobile}%` }}
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
    </section>
  );
}
