'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@govtechmy/myds-react/icon';
import { HomePage as homePageType, Faq } from '@/payload-types';

interface FAQSectionProps {
  items: homePageType['faq'];
}

export default function FAQSection({ items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Soalan Lazim (FAQ)</h2>
      <div className="space-y-4">
        {(items as Faq[] | undefined)?.map((item, index) => (
          <div key={index} className="border-b border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition"
            >
              <span className="font-medium">{item?.question}</span>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 border-t border-gray-200 bg-gray-50 text-[#3F3F46] whitespace-pre-line">
                {item.answers}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
