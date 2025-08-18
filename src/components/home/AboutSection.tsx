import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="p-8 max-w-[1200px] mx-auto">
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
        <div className="flex-[400px] flex justify-center items-end">
          <div className="relative max-w-[500px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/home/second_section/line-4.png"
                alt="background line for couple image"
                fill
                className="absolute -inset-x-5 inset-y-10 w-full h-full object-cover rounded-2xl"
              />
              <Image
                src="/home/second_section/couples.png"
                alt="couple image"
                width={1200}
                height={1200}
                className="relative w-full h-auto rounded-2xl z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
