'use client';

import { Footer, SiteInfo, FooterSection, FooterLogo } from '@govtechmy/myds-react/footer';
import { FacebookIcon, TwitterXIcon, InstagramIcon } from '@govtechmy/myds-react/icon';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';
import Image from 'next/image';

interface FooterComponentProps {
  locale: Locale;
}
export default function FooterComponent({}: FooterComponentProps) {
  // Comment for now since not using i18n
  // export default function FooterComponent({ locale }: FooterComponentProps) {
  return (
    <Footer>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-col items-center justify-center gap-y-4">
            SEBUAH INISIATIF
            <FooterLogo
              logo={<Image src="/images/logo-govtech.png" alt="GovTech Malaysia" width={240} height={85} />}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-y-4">
            DIBANGUNKAN OLEH
            <FooterLogo
              logo={<Image src="/images/logo-kementerian-digital.png" alt="GovTech Malaysia" width={150} height={92} />}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full pt-4 gap-y-4">
        DENGAN KERJASAMA
        <div className="flex flex-row items-center gap-6">
          <FooterLogo logo={<Image src="/images/logo-mydigital.png" alt="MyDigital" width={210} height={40} />} />

          <FooterLogo logo={<Image src="/images/logo-mynic.png" alt="MyNIC" width={130} height={40} />} />

          <FooterLogo
            logo={
              <Image
                src="/images/logo-cybersecurity-malaysia.png"
                alt="CyberSecurity Malaysia"
                width={200}
                height={40}
              />
            }
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full pt-4 gap-y-4">
        KOLABORASI STRATEGIK
        <div className="flex flex-row items-center gap-6">
          <FooterLogo logo={<Image src="/images/logo-mydigitalid.png" alt="MyDigital ID" width={170} height={40} />} />

          <FooterLogo
            logo={<Image src="/images/logo-mygcc.png" alt="Malaysia Government Call Center" width={140} height={40} />}
          />
        </div>
      </div>

      <FooterSection className="w-full">
        <SiteInfo></SiteInfo>
      </FooterSection>

      <FooterSection className="text-txt-black-500 md:max-lg:gap-4.5 mx-auto flex w-full max-w-[1000px] max-lg:flex-col justify-between border-none text-sm max-md:gap-4 lg:gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <p className="text-xs md:text-sm">© 2025 Kementerian Digital. Semua hakcipta terpelihara.</p>

            {/* <div className="flex gap-3 items-center">
              <SiteLink className="text-xs md:text-sm">Disclaimer</SiteLink>
              <SiteLink className="text-xs md:text-sm">Privacy Policy</SiteLink>
            </div> */}
          </div>
          <div className="flex flex-row gap-3">
            <Link
              href=""
              className=" bg-[#F1F5FF] p-2 rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center hover:shadow-md hover:shadow-gray-300 hover:bg-gray-200"
            >
              <FacebookIcon scale={32} className="md:scale-40 text-[#2563EB]" />
            </Link>
            <Link
              href=""
              className=" bg-[#F1F5FF] p-2 rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center hover:shadow-md hover:shadow-gray-300 hover:bg-gray-200"
            >
              <TwitterXIcon scale={32} className="md:scale-40 text-[#2563EB]" />
            </Link>
            <Link
              href=""
              className=" bg-[#F1F5FF] p-2 rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center hover:shadow-md hover:shadow-gray-300 hover:bg-gray-200"
            >
              <InstagramIcon scale={32} className="md:scale-40 text-[#2563EB]" />
            </Link>
          </div>
        </div>
        <p className="text-xs md:text-sm">Last updated: 15th Aug 2025</p>
      </FooterSection>
    </Footer>
  );
}
