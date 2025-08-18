'use client';

import Hero from '@/components/layout/hero';
import { Button } from '@govtechmy/myds-react/button';
import {
  ChevronDownIcon,
  EmailIcon,
  UploadIcon,
} from '@govtechmy/myds-react/icon';
import { Input, InputAddon, InputIcon } from '@govtechmy/myds-react/input';
import { Label } from '@govtechmy/myds-react/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@govtechmy/myds-react/select';
import { TextArea } from '@govtechmy/myds-react/textarea';
import { useState } from 'react';

interface ContactPageProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
}

export default function ContactPage({ messages }: ContactPageProps) {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    ic: '',
    address: '',
    phone: '',
    phoneCode: '+60',
    email: '',
    suggestion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const descriptionHtml = `
      <div>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phoneCode} ${formData.phone}</p>
        <p><strong>IC:</strong> ${formData.ic}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        <p><strong>Category:</strong> ${formData.category}</p>
        <p><strong>Suggestion:</strong> ${formData.suggestion}</p>
      </div>
      `;

      const minifiedDescriptionHtml = descriptionHtml
        .replace(/\s+/g, ' ')
        .trim();
      const freshdeskData = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.phoneCode}${formData.phone}`,
        subject: `${formData.category} - ${formData.name}`,
        source: 2, // PORTAL
        priority: 2, // Medium priority
        status: 2, // Open status
        description: minifiedDescriptionHtml,
      };

      const response = await fetch(process.env.FRESHDESK_API_URL ?? '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(process.env.FRESHDESK_API_KEY ?? ''),
        },
        body: JSON.stringify(freshdeskData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your message has been submitted successfully!',
        });

        // Reset form
        setFormData({
          category: '',
          name: '',
          ic: '',
          address: '',
          phone: '',
          phoneCode: '+60',
          email: '',
          suggestion: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message:
            result.error || 'Failed to submit your message. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Hero title={messages.contactpg.contactUs}></Hero>
      <form
        onSubmit={handleSubmit}
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
            <Label className="font-inter text-base">
              {messages.contactpg.category}
            </Label>
            <DropdownCategory
              messages={messages}
              value={formData.category}
              onChange={value => handleInputChange('category', value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.name}</Label>
            <Input
              size="medium"
              id="name"
              type="text"
              placeholder={messages.contactpg.name}
              className="!shadow-sm"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.ic}</Label>
            <Input
              size="medium"
              id="ic"
              type="text"
              placeholder="000000-00-0000"
              className="!shadow-sm"
              value={formData.ic}
              onChange={e => handleInputChange('ic', e.target.value)}
              required
            />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.address}</Label>
            <Input
              size="medium"
              id="address"
              type="text"
              placeholder={messages.contactpg.address}
              className="!shadow-sm"
              value={formData.address}
              onChange={e => handleInputChange('address', e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex w-full flex-col gap-1.5">
              <Label>{messages.contactpg.phone}</Label>
              <Input
                prepend={
                  <InputAddon className="!p-0 !border-r-0">
                    <DropdownPhoneNo
                      value={formData.phoneCode}
                      onChange={value => handleInputChange('phoneCode', value)}
                    />
                  </InputAddon>
                }
                size="medium"
                id="phone"
                type="tel"
                placeholder="12 345 6789"
                className="!shadow-sm"
                value={formData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <Label>{messages.contactpg.email}</Label>
              <Input
                size="medium"
                id="email"
                type="email"
                placeholder="hello@tech.gov.my"
                className="!shadow-sm"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                required
              >
                <InputIcon position="left">
                  <EmailIcon />
                </InputIcon>
              </Input>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.suggestion}</Label>
            <TextArea
              placeholder={messages.contactpg.suggestionPlaceholder}
              size="medium"
              className="!shadow-sm"
              value={formData.suggestion}
              onChange={e => handleInputChange('suggestion', e.target.value)}
            />
          </div>
          <div className="border p-4 !shadow-sm rounded-md flex items-center">
            <div className="flex-grow flex flex-col ">
              <div>{messages.contactpg.upload}</div>
              <div className="text-[#6B6B74]">
                <div>{messages.contactpg.filetype}</div>
                <div>{messages.contactpg.maxsize}: 25MB</div>
              </div>
            </div>
            <div>
              <Button variant="default-outline" size="medium">
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

function DropdownPhoneNo({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
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
    <Select
      size="small"
      variant="ghost"
      value={value}
      onValueChange={onChange}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger className=" flex items-center justify-between">
        <span>{value}</span>
        <ChevronDownIcon
          className={`transform transition-transform duration-100 ease-out ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
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
    <Select
      size="medium"
      variant="outline"
      value={value}
      onValueChange={onChange}
    >
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
