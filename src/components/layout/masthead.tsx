'use client';

import {
  Masthead,
  MastheadHeader,
  MastheadContent,
  MastheadTitle,
  MastheadTrigger,
  MastheadSection,
} from "@govtechmy/myds-react/masthead";
import { PutrajayaIcon, Lock2Icon } from "@govtechmy/myds-react/icon";
import { getMessages, type Locale } from "@/lib/i18n";

interface MastheadComponentProps {
  locale: Locale;
}

export default function MastheadComponent({ locale }: MastheadComponentProps) {
  const messages = getMessages(locale);
  
  return (
    <Masthead>
      <MastheadHeader>
        <MastheadTitle>{messages.masthead.title}</MastheadTitle>
        <MastheadTrigger>{messages.masthead.trigger}</MastheadTrigger>
      </MastheadHeader>
      <MastheadContent>
        <MastheadSection
          icon={<PutrajayaIcon />}
          title={messages.masthead.sections.domain.title}
        >
          {messages.masthead.sections.domain.content}
        </MastheadSection>
        <MastheadSection
          icon={<Lock2Icon className="inline-block size-3.5" />}
          title={messages.masthead.sections.security.title}
        >
          {messages.masthead.sections.security.content}
        </MastheadSection>
      </MastheadContent>
    </Masthead>
  );
}