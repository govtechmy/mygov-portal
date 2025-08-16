'use client';

import { useState } from 'react';
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

  const isMobile = useMediaQuery('(max-width: 640px)');
  const itemsPerPage = isMobile ? 1.25 : 4;

  // Compute the last starting index before overflow
  const maxIndex = Math.max(0, features.length - Math.floor(itemsPerPage));

  const nextFeature = () => {
    if (currentFeatureIndex < maxIndex) {
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
    <section className="bg-white py-16 relative">
      <div className="container mx-auto">
        <div className="overflow-hidden relative">
          {/* Carousel track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentFeatureIndex * 314}px)`,
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{
                  width: '314px',
                  height: '354px',
                }}
              >
                <div
                  className="flex flex-col items-center w-full h-full cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-white p-4"
                  onClick={() => openModal(index)}
                >
                  <div className="flex flex-grow items-center justify-center">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="object-contain w-full h-full"
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
            disabled={currentFeatureIndex === 0}
            className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/80 backdrop-blur-md transition-colors ${
              currentFeatureIndex === 0
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-white'
            }`}
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={nextFeature}
            disabled={currentFeatureIndex >= maxIndex}
            className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/80 backdrop-blur-md transition-colors ${
              currentFeatureIndex >= maxIndex
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-white'
            }`}
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={closeModal}
        >
          <div
            className="relative flex flex-col md:flex-row bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full mx-4"
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

            <div className="flex justify-center">
              <img
                src={features[currentFeatureIndex].open}
                alt={features[currentFeatureIndex].title}
                className="w-[200px] h-[247.08px]"
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
