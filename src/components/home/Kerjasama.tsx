import Image from 'next/image';

export default function KerjasamaSection() {
  return (
    <section className=" py-[48px] px-[18px] flex flex-col gap-8">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-col items-center justify-center gap-y-4">
            SEBUAH INISIATIF
            <Image src="/images/logo-govtech.png" alt="GovTech Malaysia" width={240} height={85} />
          </div>
          <div className="flex flex-col items-center justify-center gap-y-4">
            DIBANGUNKAN OLEH
            <Image src="/images/logo-kementerian-digital.png" alt="GovTech Malaysia" width={150} height={92} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full text-sm">
        DENGAN KERJASAMA
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image src="/images/logo-mydigital.png" alt="MyDigital" width={210} height={40} />

          <Image src="/images/logo-mynic.png" alt="MyNIC" width={130} height={40} />

          <Image src="/images/logo-cybersecurity-malaysia.png" alt="CyberSecurity Malaysia" width={200} height={40} />
        </div>
      </div>

      <div className="flex flex-col items-center w-full text-sm">
        KOLABORASI STRATEGIK
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image src="/images/logo-mydigitalid.png" alt="MyDigital ID" width={170} height={40} />

          <Image src="/images/logo-mygcc.png" alt="Malaysia Government Call Center" width={140} height={40} />
        </div>
      </div>
    </section>
  );
}
