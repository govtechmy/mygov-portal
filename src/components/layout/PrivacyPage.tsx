'use client';

import Hero from '@/components/layout/hero';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Label } from '@govtechmy/myds-react/label';

interface PrivacyPageProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
}

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback: () => void;
  }
}

export default function PrivacyPage({ messages }: PrivacyPageProps) {
  return (
    <div>
      <Hero title={messages.privacypg.title}></Hero>
      <div className="mx-auto max-w-[1328px] px-[18px] sm:px-[18px] md:px-[24px] lg:px-[24px] xl:px-[24px] py-16">
        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.privacyTitle}</Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.privacy}</p>
        </div>

        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.personalInfoTitle}</Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.personalInfo}</p>
        </div>

        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.collectedInfoTitle}</Label>
          <ol
            className="list-[lower-alpha] list-outside space-y-4 pl-6 text-slate-700"
            style={{ listStyleType: 'lower-alpha', paddingInlineStart: '1.5rem' }}
          >
            <li className="leading-7 text-slate-600">{messages.privacypg.collectedInfo.intro}</li>
            <li className="leading-7 text-slate-600">
              <Label>{messages.privacypg.collectedInfo.itemsTitle}</Label>
              <ol
                className="list-[upper-roman] list-outside space-y-2 pl-6 text-slate-700"
                style={{ listStyleType: 'upper-roman', paddingInlineStart: '1.5rem' }}
              >
                {messages.privacypg.collectedInfo.items.map((item, index) => (
                  <li key={index} className="leading-7 text-slate-600">
                    {item}
                  </li>
                ))}
              </ol>
            </li>
            <li className="leading-7 text-slate-600">{messages.privacypg.collectedInfo.use}</li>
            <li className="leading-7 text-slate-600">{messages.privacypg.collectedInfo.disclosure}</li>
          </ol>
        </div>

        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">
            {messages.privacypg.effectsOfNotProvidingPersonalDataTitle}
          </Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.effectsOfNotProvidingPersonalData}</p>
        </div>
        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.confidentialityTitle}</Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.confidentiality}</p>
        </div>
        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.dataSecurityTitle}</Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.dataSecurity}</p>
        </div>
        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.changeToPrivacyPolicyTitle}</Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.changeToPrivacyPolicy}</p>
        </div>
      </div>
    </div>
  );
}
