'use client';

import Hero from '@/components/layout/hero';
import { Button } from '@govtechmy/myds-react/button';
import { ChevronDownIcon, EmailIcon, UploadIcon } from '@govtechmy/myds-react/icon';
import { Input, InputAddon, InputIcon } from '@govtechmy/myds-react/input';
import { Label } from '@govtechmy/myds-react/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@govtechmy/myds-react/select';
import { TextArea } from '@govtechmy/myds-react/textarea';
import { useState } from 'react';

interface ContactPageProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
}

export default function ContactPage({ messages }: ContactPageProps) {
  return (
    <div>
      <Hero title={messages.contactpg.contactUs}></Hero>
      <form className="mx-auto flex max-w-[876px] flex-col items-center justify-center gap-12 px-4 py-20 font-inter">
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-1.5">
            <Label className="font-inter text-base">{messages.contactpg.category}</Label>
            <DropdownCategory messages={messages} />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.name}</Label>
            <Input
              size="medium"
              id="name"
              type="text"
              placeholder={messages.contactpg.name}
              className="!shadow-sm"
              required
            />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label>{messages.contactpg.ic}</Label>
            <Input
              size="medium"
              id="icNumber"
              type="text"
              placeholder="000000-00-0000"
              className="!shadow-sm"
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
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex w-full flex-col gap-1.5">
              <Label>{messages.contactpg.phone}</Label>
              <Input
                prepend={
                  <InputAddon className="!p-0 !border-r-0">
                    <DropdownPhoneNo />
                  </InputAddon>
                }
                size="medium"
                id="phoneNumber"
                type="number"
                placeholder="12 345 6789"
                className="!shadow-sm"
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
              name="suggestion"
              className="!shadow-sm"
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
          <Button size="medium" className="w-full items-center justify-center !shadow-md">
            {messages.contactpg.send}
          </Button>
        </div>
      </form>
    </div>
  );
}

function DropdownPhoneNo() {
  const [selectedCode, setSelectedCode] = useState('+60');
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
      value={selectedCode}
      onValueChange={setSelectedCode}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger className=" flex items-center justify-between">
        <span>{selectedCode}</span>
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

function DropdownCategory({ messages }: ContactPageProps) {
  return (
    <Select size="medium" variant="outline">
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
