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

export default function ContactPage() {
  return (
    <div className="">
      <Hero title="Hubungi Kami"></Hero>
      <form className="mx-auto flex max-w-[876px] flex-col items-center justify-center gap-12 px-4 py-20 font-inter">
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-1.5">
            <Label className="font-inter text-base">Kategori</Label>
            <DropdownCategory />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label>Nama</Label>
            <Input
              size="medium"
              id="email"
              type="email"
              placeholder="Nama"
              className="!shadow-sm"
              required
            />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label>No Kad Pengenalan</Label>
            <Input
              size="medium"
              id="email"
              type="email"
              placeholder="000000-00-0000"
              className="!shadow-sm"
              required
            />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label>Alamat</Label>
            <Input
              size="medium"
              id="email"
              type="email"
              placeholder="Alamat"
              className="!shadow-sm"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex w-full flex-col gap-1.5">
              <Label>No. Telefon</Label>
              <Input
                prepend={
                  <InputAddon className="!p-0 !border-r-0">
                    <DropdownPhoneNo />
                  </InputAddon>
                }
                size="medium"
                id="email"
                type="number"
                placeholder="12 345 6789"
                className="!shadow-sm"
                required
              />
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <Label>Emel</Label>
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
            <Label>Cadangan/Maklum Balas</Label>
            <TextArea
              placeholder="Tuliskan cadangan/maklum balas anda"
              size={'medium'}
              className="!shadow-sm"
            />
          </div>
          <div className="border p-4 !shadow-sm rounded-md flex items-center">
            <div className="flex-grow flex flex-col ">
              <div>Muatnaik Fail</div>
              <div className="text-[#6B6B74]">
                <div>File types: JPG, PNG & PDF</div>
                <div>Max file size: 25MB</div>
              </div>
            </div>
            <div>
              <Button variant="default-outline" size="medium">
                <UploadIcon></UploadIcon>
                Muatnaik
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Button
            size="medium"
            className="w-full items-center justify-center !shadow-md"
          >
            Hantar
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
          className={` transform transition-transform duration-100 ease-out ${
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

function DropdownCategory() {
  return (
    <Select size="medium" variant="outline">
      <SelectTrigger className="w-full justify-between">
        <SelectValue placeholder="Pilih Kategori" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectItem className="h-[40px]" value="Cadangan">
          Cadangan/Maklum Balas
        </SelectItem>
        <SelectItem className="h-[40px]" value="AduanMyDigital">
          Aduan-MyDigitalID
        </SelectItem>
        <SelectItem className="h-[40px]" value="AduanMyGOV">
          Aduan-Aplikasi MyGOV Malaysia
        </SelectItem>
        <SelectItem className="h-[40px]" value="Pertanyaan">
          Pertanyaan
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
