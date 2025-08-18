'use client';

import { useState, useRef, useEffect } from 'react';
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
  // separate states
  const [currentFeatureIndexMobile, setCurrentFeatureIndexMobile] = useState(0);
  const [currentFeatureIndexDesktop, setCurrentFeatureIndexDesktop] =
    useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // refs
  const carouselRefMobile = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const isDesktop = useMediaQuery('(min-width: 993px)');

  const itemWidth = 338; // 314px + 24px
  let itemsPerPage = 3; // desktop shows 4 items
  if (isMobile) {
    itemsPerPage = 1.25;
  } else if (isTablet) {
    itemsPerPage = 2;
  }

  const maxClicksMobile = Math.max(
    0,
    features.length - Math.floor(itemsPerPage)
  );
  const maxClicksDesktop = Math.min(
    Math.max(0, features.length - itemsPerPage),
    3
  );

  // mobile scroll tracking
  useEffect(() => {
    const carouselElement = carouselRefMobile.current;
    if (!carouselElement || isDesktop) return;

    const handleScroll = () => {
      const newIndex = Math.round(carouselElement.scrollLeft / itemWidth);
      setCurrentFeatureIndexMobile(newIndex);
    };

    carouselElement.addEventListener('scroll', handleScroll);
    return () => {
      carouselElement.removeEventListener('scroll', handleScroll);
    };
  }, [isDesktop, itemWidth]);

  // button actions
  const nextFeature = () => {
    if (isDesktop) {
      if (currentFeatureIndexDesktop < maxClicksDesktop) {
        setCurrentFeatureIndexDesktop(currentFeatureIndexDesktop + 1);
      }
    } else {
      if (currentFeatureIndexMobile < maxClicksMobile) {
        const nextIndex = currentFeatureIndexMobile + 1;
        setCurrentFeatureIndexMobile(nextIndex);
        carouselRefMobile.current?.scrollTo({
          left: nextIndex * itemWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  const prevFeature = () => {
    if (isDesktop) {
      if (currentFeatureIndexDesktop > 0) {
        setCurrentFeatureIndexDesktop(currentFeatureIndexDesktop - 1);
      }
    } else {
      if (currentFeatureIndexMobile > 0) {
        const prevIndex = currentFeatureIndexMobile - 1;
        setCurrentFeatureIndexMobile(prevIndex);
        carouselRefMobile.current?.scrollTo({
          left: prevIndex * itemWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  const openModal = (index: number) => {
    isDesktop
      ? setCurrentFeatureIndexDesktop(index)
      : setCurrentFeatureIndexMobile(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // which index are we on
  const currentIndex = isDesktop
    ? currentFeatureIndexDesktop
    : currentFeatureIndexMobile;
  const maxClicks = isDesktop ? maxClicksDesktop : maxClicksMobile;

  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="flex flex-col gap-12">
        {/* Mobile + Tablet View (scrollable) */}
        <div
          ref={carouselRefMobile}
          className="xl:hidden flex flex-row gap-6 overflow-x-auto"
        >
          {features.map((feature, index) => (
            <img
              key={feature.title}
              src={feature.image}
              alt={feature.title}
              className="w-[314px] h-[354px] border-solid border-8 border-[#E4E4E7] flex-shrink-0 cursor-pointer"
              onClick={() => openModal(index)}
            />
          ))}
        </div>

        {/* Desktop View (no scroll, only buttons) */}

        <div className="hidden xl:flex overflow-hidden relative w-full">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${currentFeatureIndexDesktop * itemWidth}px)`,
            }}
          >
            {features.map((feature, index) => (
              <img
                key={feature.title}
                src={feature.image}
                alt={feature.title}
                className="w-[314px] h-[354px] border-solid border-8 border-[#E4E4E7] flex-shrink-0 cursor-pointer"
                onClick={() => openModal(index)}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={prevFeature}
            disabled={currentIndex === 0}
            className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/80 backdrop-blur-md transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-white'
            }`}
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={nextFeature}
            disabled={currentIndex >= maxClicks}
            className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/80 backdrop-blur-md transition-colors ${
              currentIndex >= maxClicks
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-white'
            }`}
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Modal */}
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
              ✕
            </button>

            <div className="flex justify-center">
              <img
                src={features[currentIndex].open}
                alt={features[currentIndex].title}
                className="w-[200px] h-[247.08px]"
              />
            </div>
            <div className="flex-auto">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {features[currentIndex].title}
                </h2>
                <p className="mt-4 text-gray-700 max-w-sm">
                  {features[currentIndex].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
