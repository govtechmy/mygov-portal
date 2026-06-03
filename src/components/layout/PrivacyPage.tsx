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
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.collectedInfoTitle}</Label>
          <ol
            className="list-number list-outside space-y-4 pl-6 text-slate-700"
            style={{ listStyleType: 'number', paddingInlineStart: '1.5rem' }}
          >
            <li className="leading-7 text-slate-600">{messages.privacypg.collectedInfo.intro}</li>
            <li className="leading-7 text-slate-600">
              <Label>{messages.privacypg.collectedInfo.itemsTitle}</Label>
              <ul
                className="list-[disc] list-outside space-y-2 pl-6 text-slate-700"
                style={{ listStyleType: 'disc', paddingInlineStart: '1.5rem' }}
              >
                {messages.privacypg.collectedInfo.items.map((item, index) => (
                  <li key={index} className="leading-7 text-slate-600">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
            <li className="leading-7 text-slate-600">{messages.privacypg.collectedInfo.use}</li>
            <li className="leading-7 text-slate-600">{messages.privacypg.collectedInfo.disclosure}</li>
          </ol>
        </div>

        <div className="mb-8">
          <div>
            <Label className="text-lg font-semibold uppercase">{messages.privacypg.purposeOfDataCollectionTitle}</Label>
          </div>
          <Label>{messages.privacypg.purposeOfDataCollection}</Label>
          <ul
            className="list-[disc] list-outside space-y-2 pl-6 text-slate-700"
            style={{ listStyleType: 'disc', paddingInlineStart: '1.5rem' }}
          >
            {messages.privacypg.purposeOfDataCollectionItems.map((item, index) => (
              <li key={index} className="leading-7 text-slate-600">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.retentionOfPersonalDataTitle}</Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.retentionOfPersonalData}</p>
        </div>
        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.consentTitle}</Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.consent}</p>
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
          <div>
            <Label className="text-lg font-semibold uppercase">{messages.privacypg.yourRightsTitle}</Label>
          </div>
          <Label>{messages.privacypg.yourRights}</Label>
          <ul
            className="list-[disc] list-outside space-y-2 pl-6 text-slate-700"
            style={{ listStyleType: 'disc', paddingInlineStart: '1.5rem' }}
          >
            {messages.privacypg.yourRightsItems.map((item, index) => (
              <li key={index} className="leading-7 text-slate-600">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.changesToPrivacyPolicyTitle}</Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.changesToPrivacyPolicy}</p>
        </div>
        <div className="mb-8">
          <Label className="text-lg font-semibold uppercase">{messages.privacypg.eligibilityTitle}</Label>
          <p className="leading-7 text-slate-600">{messages.privacypg.eligibility}</p>
        </div>
      </div>
    </div>
  );
}
