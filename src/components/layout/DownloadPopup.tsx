'use client';

import { Dialog, DialogBody, DialogTitle } from '@govtechmy/myds-react/dialog';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';

interface DownloadPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function DownloadPopup({ open, onClose }: DownloadPopupProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(v: boolean) => {
        if (!v) onClose();
      }}
    >
      <DialogBody hideClose={true}>
        {/* Close Button are on fixed position.. causing missed place for laptop and larger devide settings.. not sure if I should create custom button for close */}

        <DialogTitle />
        <div className="relative rounded-2xl border bg-white border-[#E4E4E7] shadow-2xl shadow-black mx-auto pt-14 px-3  lg:pt-0  lg:p-3 lg:w-[585px] lg:h-[339.54px] lg:flex lg:items-center lg:gap-6 ">
          {/* Content */}
          <div className="grid grid-cols-1 lg:flex lg:pl items-center gap-6 lg:p-3 lg:w-[561px] lg:h-[283.54px]">
            <div className="  flex flex-col items-center lg:items-start text-center lg:text-left gap-8 lg:w-[252.21px] lg:h-[200px] ">
              <div className=" text-2xl font-semibold text-black lg:hidden">
                Muat turun aplikasi MyGov Malaysia melalui platform berikut
              </div>

              <div className="hidden text-2xl font-semibold text-black lg:flex">
                Muat turun <br /> aplikasi MyGov Malaysia melalui platform
                berikut
              </div>

              {/* Store buttons */}
              <div className="flex gap-[18px] w-[258px]">
                <StoreButtons />
              </div>
            </div>

            <div className=" flex justify-center">
              {/* phone */}
              <img
                src="/images/download_.png"
                alt="Aplikasi"
                className="w-[260.79px] h-[283.54px]"
              />
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

function StoreButtons() {
  return (
    <Fragment>
      <Link href="https://play.google.com/store/apps/details?id=my.gov.onegovappstore.jdn&hl=en">
        <div className="flex bg-black h-[44px] lg:w-[130px] px-3 items-center gap-2 rounded-md border border-[#A6A6A6] text-white shadow-md transition-shadow hover:shadow-lg">
          <Image
            src="/home/first_section/Playstore.png"
            alt="Google Play"
            width={21}
            height={24}
          />
          <div className="flex flex-col text-[10px] leading-tight">
            <span>Muat Turun di</span>
            <span className="text-[12px] font-semibold">Google Play</span>
          </div>
        </div>
      </Link>

      <Link href="https://apps.apple.com/my/app/mygov-malaysia/id6502623525">
        <div className="flex bg-black h-[44px] lg:w-[130px] px-3 items-center gap-2 rounded-md border border-[#A6A6A6] text-white shadow-md transition-shadow hover:shadow-lg">
          <Image
            src="/home/first_section/Apple.png"
            alt="App Store"
            width={21}
            height={24}
          />
          <div className="flex flex-col text-[10px] leading-tight">
            <span>Muat Turun di</span>
            <span className="text-[12px] font-semibold">App Store</span>
          </div>
        </div>
      </Link>
    </Fragment>
  );
}
