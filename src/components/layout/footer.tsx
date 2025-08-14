"use client";

import {
  Footer,
  SiteInfo,
  FooterSection,
  SiteLinkGroup,
  SiteLink,
  FooterLogo,
} from "@govtechmy/myds-react/footer";
import { getMessages, type Locale } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

interface FooterComponentProps {
  locale: Locale;
}

export default function FooterComponent({ locale }: FooterComponentProps) {
  const messages = getMessages(locale);

  return (
    <Footer>
      <FooterSection className="w-full">
        <SiteInfo>
          <div className="flex items-center gap-x-2.5">
            <FooterLogo
              logo={
                <Image
                  src="/images/mygov-logo.svg"
                  alt="Jata Negara Malaysia"
                  width={220}
                  height={87}
                />
              }
            />
          </div>
        </SiteInfo>

        <div className="col-span-full lg:col-start-5 lg:col-end-13 flex justify-end gap-12">
          <SiteLinkGroup groupTitle="MyGOV Malaysia">
            <SiteLink href="#">Perkidmatan</SiteLink>
            <SiteLink href="#">FAQ</SiteLink>
            <SiteLink href="#">Blog</SiteLink>
            <SiteLink href="#">Hubungi Kami</SiteLink>
          </SiteLinkGroup>
          <SiteLinkGroup groupTitle="Open Source">
            <SiteLink href="#">Github Repo</SiteLink>
            <SiteLink href="#">Figma</SiteLink>
          </SiteLinkGroup>
        </div>
      </FooterSection>

      <FooterSection className="text-txt-black-500 md:max-lg:gap-4.5 mx-auto flex w-full max-w-[1280px] max-lg:flex-col justify-between border-none text-sm max-md:gap-4 lg:gap-6">
        <div className="flex gap-3 max-lg:flex-col">
          <p>© 2025 Kementerian Digital. Semua hakcipta terpelihara.</p>
          <p className="text-[#D4D4D8] max-lg:hidden">|</p>

          <div className="flex flex-grow gap-3 items-center">
            <SiteLink>Disclaimer</SiteLink>
            <SiteLink>Privacy Policy</SiteLink>
          </div>
        </div>
        <p>Last updated: 11th March 2025</p>
      </FooterSection>
    </Footer>
  );
}
