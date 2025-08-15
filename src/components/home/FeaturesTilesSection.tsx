import Image from 'next/image';

export interface TileItem {
  icon: string;
  title: string;
}

interface FeaturesTilesSectionProps {
  leftItems: TileItem[];
  rightItems: TileItem[];
}

export default function FeaturesTilesSection({
  leftItems,
  rightItems,
}: FeaturesTilesSectionProps) {
  return (
    <section className="flex flex-col gap-8 pb-20 font-bold justify-center items-center">
      <h2 className="mb-12 p-5 text-center text-2xl font-[600px] md:text-3xl lg:text-4xl">
        Akses lebih mudah kepada perkhidmatan kerajaan
      </h2>

      <div className="hidden lg:flex gap-24 flex-row relative">
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

        <div className="relative flex-shrink-0">
          <Image
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
  );
}
