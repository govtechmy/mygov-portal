'use client';
import { useState } from 'react';

export interface TileItem {
  icon: string;
  title: string;
  highlights: string[];
}

interface FeaturesTilesSectionProps {
  leftItems: TileItem[];
  rightItems: TileItem[];
}

export default function FeaturesTilesSection({
  leftItems,
  rightItems,
}: FeaturesTilesSectionProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  // State to track the item being hovered over.
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isItemVisible = (id: string) => activeItem === id || hoveredItem === id;

  const renderTiles = (items: TileItem[], side: 'left' | 'right') => {
    return items.map((item, i) => {
      //unique ID for each tile to manage state.
      const id = `${side}-${i}`;
      const isVisible = isItemVisible(id);

      return (
        <div
          key={i}
          className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer"
          onClick={() => setActiveItem(activeItem === id ? null : id)}
          onMouseEnter={() => setHoveredItem(id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {/* Tile content: Icon and Title */}
          <div className="flex flex-col items-center">
            <img
              src={item.icon}
              alt={item.title}
              width={78}
              height={78}
              className="mb-3"
            />
            <p className="text-center text-sm font-medium">{item.title}</p>
          </div>

          {/* Highlights section: Toggles visibility with animation */}
          <div
            className={`
              mt-2 transition-all duration-500 ease-in-out overflow-hidden
              ${isVisible ? 'max-h-96' : 'max-h-0'}
            `}
          >
            <div className="text-center text-xs font-medium text-gray-500 pt-2">
              <ul className="list-disc list-inside space-y-1">
                {item.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="flex flex-col pb-20 font-bold justify-center items-center">
      <h2 className="mb-12 p-5 text-center text-2xl font-[600px] md:text-3xl lg:text-4xl">
        Akses lebih mudah kepada perkhidmatan kerajaan
      </h2>

      {/* This section is for large screens (lg) only */}
      <div className="hidden lg:flex gap-24 flex-row relative">
        <div className="flex flex-col justify-center gap-6 w-[200px]">
          {renderTiles(leftItems, 'left')}
        </div>

        <div className="relative flex-shrink-0">
          <img
            src="/home/third_section/phone.png"
            alt="MyGOV Malaysia App"
            width={300}
            height={600}
            className="object-cover"
          />

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
            style={{ top: '100px', right: '-45px', width: '46px' }}
          ></div>
          <div
            className="absolute dashed-line-gray connector-dot z-10"
            style={{ top: '285px', right: '-46px', width: '46px' }}
          ></div>
          <div
            className="absolute dashed-line-gray connector-dot z-10"
            style={{ top: '450px', right: '-44px', width: '46px' }}
          ></div>
          <div
            className="absolute dashed-line-gray connector-dot z-10"
            style={{ top: '620px', right: '-42px', width: '46px' }}
          ></div>
        </div>

        <div className="flex flex-col justify-center gap-6 w-[200px]">
          {renderTiles(rightItems, 'right')}
        </div>
      </div>

      {/* This section is for mobile/smaller screens */}
      <div className="flex flex-row flex-wrap gap-6 lg:hidden p-5 items-stretch justify-center">
        {[...leftItems, ...rightItems].map((item, i) => (
          <div
            key={i}
            className="flex flex-col w-[200px] items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <img
              src={item.icon}
              alt={item.title}
              width={78}
              height={78}
              className="mb-3"
            />
            <p className="text-center text-sm font-medium">{item.title}</p>
            <div className="text-center text-xs font-medium text-gray-500 mt-1">
              <ul className="list-disc list-inside">
                {item.highlights.map((highlight, index) => (
                  <li className="p-1" key={index}>
                    {' '}
                    {highlight}{' '}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
