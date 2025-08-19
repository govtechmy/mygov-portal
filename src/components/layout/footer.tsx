'use client';

import { Footer, SiteInfo, FooterSection, SiteLink, FooterLogo } from '@govtechmy/myds-react/footer';
import { type Locale } from '@/lib/i18n';
import Image from 'next/image';

interface FooterComponentProps {
  locale: Locale;
}

export default function FooterComponent({ locale }: FooterComponentProps) {
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
        <div className="flex gap-3 max-lg:flex-col">
          <p>© 2025 Kementerian Digital. Semua hakcipta terpelihara.</p>
          <p className="text-[#D4D4D8] max-lg:hidden">|</p>

          <div className="flex flex-grow gap-3 items-center">
            <SiteLink>Disclaimer</SiteLink>
            <SiteLink>Privacy Policy</SiteLink>
          </div>
        </div>
        <p>Last updated: 15th Aug 2025</p>
      </FooterSection>
    </Footer>
  );
}
