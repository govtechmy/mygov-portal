'use client';

import Hero from '@/components/layout/hero';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRef, useEffect, useState } from 'react';
import { Button } from '@govtechmy/myds-react/button';
import { ChevronDownIcon, EmailIcon, UploadIcon } from '@govtechmy/myds-react/icon';
import { Input, InputAddon, InputIcon } from '@govtechmy/myds-react/input';
import { Label } from '@govtechmy/myds-react/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@govtechmy/myds-react/select';
import { TextArea } from '@govtechmy/myds-react/textarea';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/contactValidation';

interface ContactPageProps {
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

export default function ContactPage({ messages }: ContactPageProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [turnstileVerified, setTurnstileVerified] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFlutterWebView, setIsFlutterWebView] = useState<boolean>(false);

  // useEffect(() => {
  //   // Simple Flutter WebView detection
  //   const userAgent = navigator.userAgent.toLowerCase();
  //   const isWebView = userAgent.includes('flutter') || userAgent.includes('webview');
  //   setIsFlutterWebView(isWebView);

  //   if (isWebView) {
  //     setTurnstileToken('webview-bypass');
  //     setTurnstileVerified(true);
  //   }

  //   // Skip Turnstile if in Flutter WebView
  //   if (isFlutterWebView) return;

  //   const isTurnstileEnabled = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_ENABLED === 'true';
  //   if (!isTurnstileEnabled) {
  //     console.log('Turnstile is disabled');
  //     return;
  //   }

  //   const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
  //   const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development';

  //   // Skip Turnstile in development or if not properly configured
  //   if (isDevelopment || !turnstileSiteKey || turnstileSiteKey === '1x00000000000000000000AA') {
  //     console.log('Turnstile skipped:', isDevelopment ? 'development mode' : 'not configured');
  //     return;
  //   }

  //   // Prevent multiple initializations
  //   if (turnstileWidgetId) {
  //     return;
  //   }

  //   let scriptLoaded = false;
  //   let scriptElement: HTMLScriptElement | null = null;
  //   let retryCount = 0;
  //   const maxRetries = 3;

  //   const loadTurnstile = () => {
  //     if (!window.turnstile || turnstileWidgetId) {
  //       return;
  //     }

  //     try {
  //       // Clear any existing widget first
  //       const existingWidget = document.querySelector('#turnstile-widget');
  //       if (existingWidget) {
  //         existingWidget.innerHTML = '';
  //       }

  //       const widgetId = window.turnstile.render('#turnstile-widget', {
  //         sitekey: turnstileSiteKey,
  //         callback: (token: string) => {
  //           console.log('Turnstile success, token received');
  //           setTurnstileToken(token);
  //           setTurnstileVerified(true);
  //         },
  //         'expired-callback': () => {
  //           console.log('Turnstile token expired');
  //           setTurnstileToken('');
  //           setTurnstileVerified(false);
  //           // Reset the widget when token expires
  //           if (window.turnstile && turnstileWidgetId) {
  //             window.turnstile.reset(turnstileWidgetId);
  //           }
  //         },
  //         'error-callback': () => {
  //           console.log('Turnstile error occurred');
  //           setTurnstileToken('');
  //           setTurnstileVerified(false);
  //         },
  //         // Add theme and size options for better UX
  //         theme: 'light',
  //         size: 'normal',
  //       });

  //       setTurnstileWidgetId(widgetId);
  //       console.log('Turnstile widget rendered successfully');
  //     } catch (error) {
  //       console.error('Error rendering Turnstile widget:', error);
  //       // Retry if widget rendering fails
  //       if (retryCount < maxRetries) {
  //         retryCount++;
  //         setTimeout(loadTurnstile, 1000 * retryCount);
  //       }
  //     }
  //   };

  //   const initializeTurnstile = () => {
  //     if (window.turnstile) {
  //       loadTurnstile();
  //     } else if (!scriptLoaded) {
  //       // Check if script is already loaded
  //       const existingScript = document.querySelector('script[src*="turnstile"]');
  //       if (existingScript) {
  //         scriptLoaded = true;
  //         // Wait a bit for the script to initialize
  //         setTimeout(loadTurnstile, 100);
  //         return;
  //       }

  //       scriptElement = document.createElement('script');
  //       scriptElement.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  //       scriptElement.async = true;
  //       scriptElement.defer = true;
  //       scriptElement.onload = () => {
  //         scriptLoaded = true;
  //         // Add a small delay to ensure Turnstile is fully loaded
  //         setTimeout(loadTurnstile, 100);
  //       };
  //       scriptElement.onerror = () => {
  //         console.error('Failed to load Turnstile script');
  //       };
  //       document.head.appendChild(scriptElement);
  //     }
  //   };

  //   // Initialize with a longer delay to ensure DOM is ready and component is fully mounted
  //   const timer = setTimeout(initializeTurnstile, 300);

  //   return () => {
  //     clearTimeout(timer);
  //     if (turnstileWidgetId && window.turnstile) {
  //       try {
  //         window.turnstile.remove(turnstileWidgetId);
  //       } catch (error) {
  //         console.error('Error removing Turnstile widget:', error);
  //       }
  //     }
  //     if (scriptElement && scriptElement.parentNode) {
  //       scriptElement.parentNode.removeChild(scriptElement);
  //     }
  //   };
  // }, [turnstileWidgetId, isFlutterWebView]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      category: '',
      name: '',
      ic: '',
      address: '',
      phone: '',
      phoneCode: '+60',
      email: '',
      suggestion: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Skip Turnstile check for WebView
    // if (!isFlutterWebView && !turnstileToken) {
    //   setSubmitStatus({
    //     type: 'error',
    //     message: 'Please complete the security verification.',
    //   });
    //   return;
    // }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    setErrorMessage(null);

    try {
      // --- Captcha check ---
      // const isTurnstileEnabled = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_ENABLED === 'true';
      // const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
      // const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development';

      // if (isTurnstileEnabled) {
      //   if (!isDevelopment && turnstileSiteKey && turnstileSiteKey !== '1x00000000000000000000AA' && !turnstileToken) {
      //     setErrorMessage('Please complete the verification before submitting.');
      //     return; // stop here, no spinner
      //   }
      // }

      const descriptionHtml = `
        <div>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phoneCode} ${data.phone}</p>
          <p><strong>IC:</strong> ${data.ic}</p>
          <p><strong>Address:</strong> ${data.address}</p>
          <p><strong>Category:</strong> ${data.category}</p>
          <p><strong>Suggestion:</strong> ${data.suggestion}</p>
        </div>
      `
        .replace(/\s+/g, ' ')
        .trim();

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', `${data.phoneCode}${data.phone}`);
      formData.append('subject', `${data.category} - ${data.name}`);
      formData.append('source', '2');
      formData.append('priority', '1');
      formData.append('status', '2');
      formData.append('description', descriptionHtml);

      // if (isTurnstileEnabled) {
      //   formData.append('cf-turnstile-response', turnstileToken);
      // }

      if (data.file) {
        formData.append('attachments[]', data.file);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your message has been submitted successfully!',
        });
        setErrorMessage('');
        reset();
        setTurnstileToken(''); // Reset Turnstile token
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit your message. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Hero title={messages.contactpg.contactUs}></Hero>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-[876px] flex-col items-center justify-center gap-12 px-4 py-20 font-inter"
      >
        {submitStatus.type && (
          <div
            className={`w-full p-4 rounded-md ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {submitStatus.message}
          </div>
        )}
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.category}</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => <DropdownCategory messages={messages} {...field} />}
            />
            {errors.category && <span className="text-red-600 text-sm">{errors.category.message}</span>}
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.name}</Label>
            <Input
              size="medium"
              id="name"
              type="text"
              placeholder={messages.contactpg.name}
              className="!shadow-sm"
              {...register('name')}
            />
            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.ic}</Label>
            <Input
              size="medium"
              id="ic"
              type="text"
              placeholder="000000-00-0000"
              className="!shadow-sm"
              {...register('ic', {
                onChange: e => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 6) value = value.slice(0, 6) + '-' + value.slice(6);
                  if (value.length > 9) value = value.slice(0, 9) + '-' + value.slice(9);
                  e.target.value = value;
                },
              })}
            />
            {errors.ic && <span className="text-red-600 text-sm">{errors.ic.message}</span>}
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.address}</Label>
            <TextArea
              placeholder={messages.contactpg.address}
              size="medium"
              className="!shadow-sm"
              {...register('address')}
            />
            {errors.address && <span className="text-red-600 text-sm">{errors.address.message}</span>}
          </div>

          <div className="flex gap-4 max-sm:flex-col max-sm:gap-6">
            <div className="flex w-full flex-col gap-1.5">
              <Label>{messages.contactpg.phone}</Label>
              <Controller
                control={control}
                name="phoneCode"
                render={({ field }) => (
                  <Input
                    prepend={
                      <InputAddon className="!p-0 !border-r-0">
                        <DropdownPhoneNo {...field} />
                      </InputAddon>
                    }
                    size="medium"
                    id="phone"
                    type="tel"
                    placeholder="12 345 6789"
                    className="!shadow-sm"
                    {...register('phone')}
                  />
                )}
              />
              {errors.phone && <span className="text-red-600 text-sm">{errors.phone.message}</span>}
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <Label>{messages.contactpg.email}</Label>
              <Input
                size="medium"
                id="email"
                type="email"
                placeholder={messages.contactpg.emailPlaceholder}
                className="!shadow-sm"
                {...register('email')}
              >
                <InputIcon position="left">
                  <EmailIcon />
                </InputIcon>
              </Input>
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.suggestion}</Label>
            <TextArea
              placeholder={messages.contactpg.suggestionPlaceholder}
              size="medium"
              className="!shadow-sm"
              {...register('suggestion')}
            />
            {errors.suggestion && <span className="text-red-600 text-sm">{errors.suggestion.message}</span>}
          </div>

          <div className="border p-4 !shadow-sm rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div>{messages.contactpg.upload}</div>
              <div className="text-[#6B6B74]">
                <div>{messages.contactpg.filetype}</div>
                <div>{messages.contactpg.maxsize}: 25MB</div>
              </div>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                ref={fileInputRef}
                onChange={e => {
                  const file = e.target.files?.[0] ?? undefined;
                  setValue('file', file, { shouldValidate: true });
                }}
                className="w-[220px]"
              />

              {errors.file && <span className="text-red-600 text-sm">{errors.file.message as string}</span>}
            </div>

            <div>
              <Button
                variant="default-outline"
                size="medium"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon />
                {messages.contactpg.upload2}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Button
            type="submit"
            size="medium"
            className="w-full items-center justify-center !shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : messages.contactpg.send}
          </Button>
        </div>
      </form>
    </div>
  );
}

function DropdownPhoneNo({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const countries = [
    { code: '+60', name: 'Malaysia' },
    { code: '+65', name: 'Singapore' },
    { code: '+62', name: 'Indonesia' },
    { code: '+66', name: 'Thailand' },
    { code: '+63', name: 'Philippines' },
    { code: '+84', name: 'Vietnam' },
    { code: '+86', name: 'China' },
    { code: '+91', name: 'India' },
    { code: '+81', name: 'Japan' },
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+61', name: 'Australia' },
  ];

  return (
    <Select size="small" variant="ghost" value={value} onValueChange={onChange} open={open} onOpenChange={setOpen}>
      <SelectTrigger className="flex items-center justify-between">
        <span>{value}</span>
        <ChevronDownIcon
          className={`transform transition-transform duration-100 ease-out ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </SelectTrigger>
      <SelectContent className="p-0">
        {countries.map(c => (
          <SelectItem className="h-[40px]" key={c.code} value={c.code}>
            {`${c.name} (${c.code})`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DropdownCategory({
  messages,
  value,
  onChange,
}: ContactPageProps & {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select size="medium" variant="outline" value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full justify-between">
        <SelectValue placeholder={messages.contactpg.chooseCategory} />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectItem className="h-[40px]" value="Cadangan">
          {messages.contactpg.suggestionDropdown}
        </SelectItem>
        <SelectItem className="h-[40px]" value="Aduan-MyDigital ID">
          {messages.contactpg.reportDropdown}
        </SelectItem>
        <SelectItem className="h-[40px]" value="AduanMyGOV">
          {messages.contactpg.reportDropdownMyGov}
        </SelectItem>
        <SelectItem className="h-[40px]" value="Pertanyaan">
          {messages.contactpg.questionsDropdown}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
