'use client';

import Hero from '@/components/layout/hero';
import { useRef } from 'react';
import { Button } from '@govtechmy/myds-react/button';
import { ChevronDownIcon, EmailIcon } from '@govtechmy/myds-react/icon';
import { Input, InputAddon, InputIcon } from '@govtechmy/myds-react/input';
import { Label } from '@govtechmy/myds-react/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@govtechmy/myds-react/select';
import { TextArea } from '@govtechmy/myds-react/textarea';
import { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/contactValidation';

interface ContactPageProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
}

export default function ContactPage({ messages }: ContactPageProps) {
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
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
        reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit your message. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
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

          <div className="flex gap-4">
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

          {/* <div className="border p-4 !shadow-sm rounded-md flex items-center">
            <div className="flex-grow flex flex-col">
              <div>{messages.contactpg.upload}</div>
              <div className="text-[#6B6B74]">
                <div>{messages.contactpg.filetype}</div>
                <div>{messages.contactpg.maxsize}: 25MB</div>
              </div>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                {...register("file")}
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? undefined;
                  setValue("file", file, { shouldValidate: true }); 
                }}
              />

              {errors.file && (
                <span className="text-red-600 text-sm">
                  {errors.file.message as string}
                </span>
              )}
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
          </div> */}

          <div className="border p-4 !shadow-sm rounded-md flex items-center">
            <div className="flex-grow flex flex-col">
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
        <SelectItem className="h-[40px]" value="AduanMyDigital">
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
