'use client';

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
      <FooterSection>
        <SiteInfo>
          <FooterLogo
            logo={
              <Image 
                src="/images/mygov-logo.svg" 
                alt="Jata Negara Malaysia" 
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            }
          />
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">
              tbd
            </p>
            <p className="text-sm font-medium">
              {messages.footer.followUs}
            </p>
          </div>
        </SiteInfo>
        
        <SiteLinkGroup groupTitle={messages.footer.groups.services.title}>
          <SiteLink href={`/${locale}/services/citizen`}>
            {messages.footer.groups.services.citizen}
          </SiteLink>
          <SiteLink href={`/${locale}/services/business`}>
            {messages.footer.groups.services.business}
          </SiteLink>
          <SiteLink href={`/${locale}/services/foreigner`}>
            {messages.footer.groups.services.foreigner}
          </SiteLink>
          <SiteLink href={`/${locale}/services/emergency`}>
            {messages.footer.groups.services.emergency}
          </SiteLink>
        </SiteLinkGroup>
        
        <SiteLinkGroup groupTitle={messages.footer.groups.information.title}>
          <SiteLink href={`/${locale}/information/laws`}>
            {messages.footer.groups.information.laws}
          </SiteLink>
          <SiteLink href={`/${locale}/information/forms`}>
            {messages.footer.groups.information.forms}
          </SiteLink>
          <SiteLink href={`/${locale}/information/statistics`}>
            {messages.footer.groups.information.statistics}
          </SiteLink>
          <SiteLink href={`/${locale}/information/publications`}>
            {messages.footer.groups.information.publications}
          </SiteLink>
        </SiteLinkGroup>
        
        <SiteLinkGroup groupTitle={messages.footer.groups.support.title}>
          <SiteLink href={`/${locale}/support/help`}>
            {messages.footer.groups.support.help}
          </SiteLink>
          <SiteLink href={`/${locale}/support/feedback`}>
            {messages.footer.groups.support.feedback}
          </SiteLink>
          <SiteLink href={`/${locale}/support/contact`}>
            {messages.footer.groups.support.contactUs}
          </SiteLink>
          <SiteLink href={`/${locale}/support/faq`}>
            {messages.footer.groups.support.faq}
          </SiteLink>
        </SiteLinkGroup>
      </FooterSection>
      
      <FooterSection>
        <div className="text-center text-sm text-gray-500">
          <p>
            {messages.footer.legal.copyright}
          </p>
          <div className="mt-2 space-x-4">
            <Link href={`/${locale}/legal/disclaimer`}>
              {messages.footer.legal.disclaimer}
            </Link>
            <Link href={`/${locale}/legal/privacy`}>
              {messages.footer.legal.privacy}
            </Link>
          </div>
          <p className="mt-2">
            {messages.footer.legal.lastUpdated}
          </p>
        </div>
      </FooterSection>
    </Footer>
  );
}   